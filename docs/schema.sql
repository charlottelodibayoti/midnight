-- Bayanihan MVP schema sketch for Supabase/Postgres.
-- Apply migrations with a privileged deployment role; public clients receive SELECT-only access
-- to approved, currently active content. Private identity documents never belong in public tables.

create extension if not exists postgis;

create type public.verification_level as enum ('unverified', 'id_verified', 'organization_verified', 'government_verified');
create type public.hazard_status as enum ('active', 'resolved', 'archived');
create type public.risk_level as enum ('safe', 'at_risk', 'warning', 'evacuate');
create type public.request_status as enum ('draft', 'pending_review', 'published', 'fulfilled', 'rejected', 'suspended');
create type public.donation_status as enum ('initiated', 'paid', 'received', 'distributed', 'refunded', 'failed');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  organization_name text,
  credentials_public jsonb not null default '{}'::jsonb,
  verification public.verification_level not null default 'unverified',
  trust_score smallint not null default 0 check (trust_score between 0 and 100),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.private_verification_records (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id),
  encrypted_document_path text not null,
  private_notes text,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.hazards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  hazard_type text not null check (hazard_type in ('typhoon','flood','fire','earthquake','landslide','volcanic','other')),
  status public.hazard_status not null default 'active',
  severity public.risk_level not null,
  area_name text not null,
  geometry jsonb not null,
  starts_at timestamptz not null,
  expires_at timestamptz,
  resolved_at timestamptz,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stories (
  id uuid primary key default gen_random_uuid(),
  hazard_id uuid references public.hazards(id),
  headline text not null,
  body text not null,
  source_profile_id uuid not null references public.profiles(id),
  verification_note text,
  published_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id),
  is_published boolean not null default false
);

create table public.story_view_buckets (
  story_id uuid not null references public.stories(id),
  bucket_start timestamptz not null,
  views integer not null default 0 check (views >= 0),
  primary key (story_id, bucket_start)
);

create table public.help_requests (
  id uuid primary key default gen_random_uuid(),
  hazard_id uuid references public.hazards(id),
  beneficiary_profile_id uuid not null references public.profiles(id),
  title text not null,
  location_name text not null,
  location geometry(point, 4326),
  needs jsonb not null,
  urgency public.risk_level not null,
  people_affected integer not null check (people_affected >= 0),
  target_amount numeric(12,2),
  target_items jsonb not null default '{}'::jsonb,
  status public.request_status not null default 'pending_review',
  verified_by uuid references auth.users(id),
  verified_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.verified_channels (
  id uuid primary key default gen_random_uuid(),
  organization_profile_id uuid not null references public.profiles(id),
  hazard_id uuid references public.hazards(id),
  channel_type text not null check (channel_type in ('payment','dropoff','courier','contact')),
  public_details jsonb not null,
  encrypted_account_ref text,
  accepted_items text[] not null default '{}',
  schedule text,
  verified_by uuid not null references auth.users(id),
  verified_at timestamptz not null default now(),
  reverify_required boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  request_id uuid not null references public.help_requests(id),
  verified_channel_id uuid references public.verified_channels(id),
  amount numeric(12,2),
  item_code text,
  status public.donation_status not null default 'initiated',
  provider text,
  provider_payment_id text unique,
  donor_alias text,
  is_anonymous boolean not null default true,
  created_at timestamptz not null default now(),
  received_at timestamptz,
  distributed_at timestamptz
);

create table public.distribution_updates (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.help_requests(id),
  organization_profile_id uuid not null references public.profiles(id),
  summary text not null,
  items jsonb not null default '{}'::jsonb,
  families_reached integer not null default 0,
  proof_storage_path text,
  verified_by uuid references auth.users(id),
  published_at timestamptz not null default now()
);

create table public.followed_areas (
  id uuid primary key default gen_random_uuid(),
  subscription_hash text not null,
  area geometry(polygon, 4326) not null,
  push_endpoint_encrypted text,
  created_at timestamptz not null default now(),
  unique (subscription_hash, area)
);

create table public.suspicious_channel_reports (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references public.verified_channels(id),
  private_details text not null,
  status text not null default 'open',
  reviewed_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id),
  action text not null,
  subject_type text not null,
  subject_id uuid,
  before_state jsonb,
  after_state jsonb,
  created_at timestamptz not null default now()
);

-- Organization compliance metadata: permit identifiers may be public, while evidence files remain private.
create table public.organization_compliance (
  profile_id uuid primary key references public.profiles(id),
  sec_registration_number text,
  dswd_solicitation_permit_number text,
  permit_valid_from date,
  permit_valid_until date,
  public_compliance_notes text,
  evidence_storage_path text,
  verified_by uuid references auth.users(id),
  verified_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Trust score policy (0..100), recalculated by a privileged server job, never client supplied:
-- credentials/verification 0..40, accuracy/correction history 0..25,
-- distribution reporting and proof 0..25, account age/good standing 0..10.
-- Explain displayed badges and flags; do not expose private evidence or imply a guarantee of safety.

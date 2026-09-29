# Bayanihan

Bayanihan is a mobile-first, anonymous-by-default disaster and relief information PWA. It presents active hazard information, source-attributed narrative updates, verified aid requests, and a guided Send Help experience. There are no public posts, comments, likes, or donor profiles.

## Current MVP preview

This repository contains a responsive Next.js UI with local demonstration data:

- Active hazard overview/map visualization and alert list
- Timestamped, source-attributed story feed with view counts
- Verified aid request cards with progress and urgency
- Quick Send Help path (up to three taps by default) for money, goods, or item sponsorship
- Anonymous-by-default preference, reference receipt, and demo tracker hook
- Verified relief partner/help board preview and hotline shortcuts
- PWA manifest and a network-first service worker for latest app shell caching
- Bilingual English/Filipino help guide, trust profile, story details, and publisher dashboard preview

**Safety:** The map, source data, payment gateway, push delivery, help tracker, and admin/publisher features are prototypes or architecture targets, not connected production services. The illustrated map and all amounts/requests are mock data. The Send Help confirmation does not charge money. Do not use this preview to solicit donations.

## Screens

- `/` — hazard overview, stories, requests, and Send Help
- `/stories/marikina-flood` — timestamped narrative story
- `/help-board` — sample relief partner listings
- `/impact` — reference-number delivery tracker (sample reference: `BYN-260930-04821`)
- `/trust` — verification levels and weighted trust factors
- `/how-to-help` — English/Filipino guide and emergency hotlines
- `/admin` — demo publisher review queue and impact summary

## Run locally

Requirements: Node.js 20.9+ and npm.

1. Install dependencies: `npm install`
2. Start development: `npm run dev`
3. Open `http://localhost:3000`
4. Production check: `npm run build`, then `npm start`
5. Run source lint: `npm run lint`

Use HTTPS in deployed environments for service workers, location permission, and push notifications. Avoid collecting donor identity unless a payment provider legally requires it; display a provider-hosted payment flow and route funds directly to the verified beneficiary or registered organization.

## Architecture and stages

- **Client/PWA:** Next.js App Router + React; anonymous public views; service worker caches the app shell/latest successful page. Keep feature components presentation-first so they can be reused in a React Native client.
- **Data/API target:** Supabase Postgres + Realtime + private Storage; server routes/RPCs mediate all publisher/admin writes. SQL sketch and RLS boundaries: `docs/schema.sql`.
- **Map:** Replace the illustrated Marikina map with Leaflet/MapLibre and GeoJSON hazard polygons sourced from PAGASA, PHIVOLCS, NDRRMC/LGUs; expire resolved/expired hazards in a scheduled job.
- **Payments:** Server-created PayMongo/Xendit checkout or payment intent; provider webhooks are authoritative. Never accept card details in the app or hold platform funds. Verify recipient accounts and re-verify any account change before publishing.
- **Notifications:** User-selected followed areas and optional location permission; FCM/Web Push subscription with consent, proximity filtering, and quiet-hours controls. In-app alerts remain available without permission.
- **Publisher/admin:** Authenticated staff roles only; MFA, audit events, private encrypted ID storage, approval/revocation workflow, takedown process, rate limits and abuse monitoring.

### MVP rollout

1. Active map, hazards, and alerts (current demo UI; wire official feeds and moderation)
2. Narrative feed, source verification, and privacy-preserving view counts
3. Verified requests and payment/goods/sponsored-item checkout
4. Reference-number impact tracker, receipts/proof, and help board
5. Role-protected publisher/admin review, reconciliation, and analytics

## Localization and mobile app readiness

Keep visible strings in a locale dictionary (`en`/`fil`) before adding more screens; never translate official source names or alter source advisories. The current React/TypeScript screen is intentionally data-driven and uses platform-neutral interaction patterns. For a native companion, move the request/event types and validation into a shared package, then provide React Native map, notification, and provider SDK adapters. Do not share browser service-worker or DOM modules with native code.

## Production checklist

- Configure official public data sources, update timestamps, attribution, and stale-feed warnings.
- Confirm moderation and badge criteria with local authorities/NGOs; expose why each source is trusted or flagged.
- Complete Data Privacy Act of 2012 review, retention schedule, consent language, and breach process.
- Confirm solicitation permits/SEC or NGO credentials with counsel and surface applicable permit numbers.
- Complete payment-provider onboarding, beneficiary verification, webhook signature validation, idempotency, and refund/dispute procedures.
- Define delivery evidence SLA; suspend an organization's Active status when overdue and preserve its audit trail.
- Test keyboard/screen-reader use, color contrast, low-bandwidth behavior, offline hotlines, and PWA install on iOS/Android.

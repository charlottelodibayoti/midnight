import Link from "next/link";
import { ArrowLeft, Eye, ShieldCheck } from "lucide-react";
import { SubpageShell } from "@/components/subpage-shell";

const updates = [
  { time: "10:42 AM", label: "OFFICIAL UPDATE", title: "Water levels ease, low-lying areas remain on watch", body: "Water levels at the Marikina River monitoring station have eased slightly. Residents in low-lying areas of Tumana and Nangka should remain alert and follow instructions from barangay responders.", source: "Marikina City DRRMO" },
  { time: "9:18 AM", label: "FIELD REPORT", title: "Evacuation center opens at Nangka Elementary School", body: "The covered court is open for families who need temporary shelter. Basic registration and water are available at the entrance. Please follow the direction of on-site barangay staff.", source: "Verified field reporter · J. Reyes" },
  { time: "8:56 AM", label: "RESCUE UPDATE", title: "Rescue teams reach 24 families in Tumana riverside community", body: "BFP and local responders report reaching 24 families. Teams continue to check riverside streets. Do not enter moving floodwater; contact 911 if immediate rescue is needed.", source: "BFP Marikina" },
];

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SubpageShell eyebrow="LIVE STORY · MARIKINA" title="Flooding along the Marikina River" description="A timestamped narrative of verified updates. Follow the source and time on each report.">
    <div className="story-detail-meta"><span><span className="live-dot" /> LIVE EVENT</span><span><Eye size={14} /> 2,418 views</span><Link href="/trust"><ShieldCheck size={14} /> Why trust this source?</Link></div>
    <div className="event-status"><b>ACTIVE FLOOD ADVISORY</b><span>Marikina · Tumana, Nangka, Malanday</span><small>Last verified 10:42 AM PHT · Event ref: {id.toUpperCase()}</small></div>
    <div className="narrative-timeline">{updates.map((update) => <article className="narrative-update" key={update.time}><div className="narrative-time"><b>{update.time}</b><span>SEP 30</span></div><span className="narrative-marker" /><div className="narrative-body"><span className="source-tag">{update.label}</span><h2>{update.title}</h2><p>{update.body}</p><span className="story-source"><ShieldCheck size={13} /> {update.source} · verified</span></div></article>)}</div>
    <div className="story-safety-note"><ShieldCheck size={17} /><span>Public comments and replies are disabled. Updates are published by verified sources; contact the listed agency for instructions.</span></div>
    <Link className="story-back-link" href="/"><ArrowLeft size={14} /> Back to live updates</Link>
  </SubpageShell>;
}

"use client";

import { Check, Clock3, MapPin, Package, ShieldCheck, Truck } from "lucide-react";
import { SubpageShell } from "@/components/subpage-shell";

const partners = [
  { name: "Marikina City Disaster Risk Reduction and Management Office", badge: "Government/Agency-Verified", kind: "CITY RELIEF HUB", address: "Marikina City Hall, Shoe Avenue, Brgy. Sta. Elena, Marikina City", schedule: "Daily · 8:00 AM–6:00 PM", items: ["Bottled water", "Ready-to-eat food", "Hygiene kits", "Blankets"], accent: "green" },
  { name: "Philippine Red Cross — Rizal Chapter", badge: "Organization-Verified", kind: "RELIEF ORGANIZATION", address: "Rizal Chapter Service Center, Marcos Highway, Cainta, Rizal", schedule: "Daily · 9:00 AM–5:00 PM", items: ["First-aid kits", "Water", "Food packs", "New clothing"], accent: "red" },
  { name: "Kapit-Bisig Community Pantry", badge: "Organization-Verified", kind: "COMMUNITY PARTNER", address: "Nangka Elementary School covered court, Brgy. Nangka, Marikina City", schedule: "Today · 10:00 AM–4:00 PM", items: ["Rice", "Canned goods", "Baby supplies", "Clean clothes"], accent: "gold" },
];

export default function HelpBoardPage() {
  return <SubpageShell eyebrow="VERIFIED HELP BOARD" title="Give in a way that works for you." description="Trusted drop-off points and relief partners supporting active Metro Manila response efforts.">
    <div className="board-warning"><ShieldCheck size={17} /><span><b>Only verified channels appear here.</b> Always confirm the location and schedule on this page before travelling.</span></div>
    <div className="partner-list">{partners.map((partner) => <article className="sub-card partner-card" key={partner.name}><div className="partner-card-head"><span className={`partner-emblem ${partner.accent}`}><Package size={20} /></span><div><span className="subpage-eyebrow">{partner.kind}</span><h2>{partner.name}</h2><span className="verified-label"><ShieldCheck size={13} /> {partner.badge}</span></div></div><div className="partner-details"><div><MapPin size={16} /><span><b>Drop-off address</b><small>{partner.address}</small></span></div><div><Clock3 size={16} /><span><b>Schedule</b><small>{partner.schedule}</small></span></div><div><Truck size={16} /><span><b>Courier / delivery</b><small>Label packages with “Marikina relief”. Call the partner before sending.</small></span></div></div><div className="accepted-items"><b>Currently accepting</b><div>{partner.items.map((item) => <span key={item}><Check size={11} /> {item}</span>)}</div></div><div className="partner-demo-note">Demo listing — verify operating status with the organization before travelling.</div></article>)}</div>
    <section className="board-report"><div><b>See a suspicious donation channel?</b><small>Send a private report to the verification team. Your report is not public.</small></div><button onClick={() => window.alert("Demo only: in production, this opens a private report form.")}>Report a channel</button></section>
  </SubpageShell>;
}

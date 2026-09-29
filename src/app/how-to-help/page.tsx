"use client";

import { useState } from "react";
import { ArrowRight, HeartHandshake, MapPin, Phone, ShieldCheck, Wallet } from "lucide-react";
import { SubpageShell } from "@/components/subpage-shell";

const guide = {
  EN: {
    title: "Helping is simple.", intro: "A few careful steps make sure your help reaches the people who need it.",
    steps: [
      ["01", "Choose a verified request", "Check the location, urgency, and the recipient’s verification badge. Every public request is reviewed before publication."],
      ["02", "Choose how to help", "Send a small amount through a licensed provider, drop off useful goods at a verified point, or sponsor a specific item."],
      ["03", "Keep your reference", "Stay anonymous by default. Use your reference number later to see when help was received and distributed."],
    ],
    note: "Never send money to a personal account. If a donation channel seems suspicious, report it privately through the Help Board.",
  },
  FIL: {
    title: "Madali lang tumulong.", intro: "Sa ilang maingat na hakbang, makakarating ang tulong mo sa mga nangangailangan.",
    steps: [
      ["01", "Pumili ng beripikadong pangangailangan", "Tingnan ang lokasyon, pagkaapurahan, at badge ng beripikasyon ng benepisyaryo. Sinusuri muna ang bawat pampublikong kahilingan."],
      ["02", "Piliin kung paano tutulong", "Magpadala ng maliit na halaga sa lisensyadong provider, maghatid ng mga kailangang gamit sa beripikadong drop-off, o mag-sponsor ng isang item."],
      ["03", "Itago ang reference number", "Mananatiling anonymous ka bilang default. Gamitin ang reference number para makita kung natanggap at naipamahagi na ang tulong."],
    ],
    note: "Huwag magpadala ng pera sa personal na account. Kung kahina-hinala ang donation channel, i-report ito nang pribado sa Help Board.",
  },
};

const hotlines = [
  { name: "National Emergency Hotline", number: "911", note: "Police, fire, and medical emergency response" },
  { name: "NDRRMC Operations Center", number: "8911-1406", note: "National disaster risk reduction and response" },
  { name: "Philippine Red Cross", number: "143", note: "Emergency assistance and humanitarian response" },
  { name: "Marikina City Rescue", number: "161", note: "Local emergency and rescue coordination" },
];

export default function HowToHelpPage() {
  const [language, setLanguage] = useState<"EN" | "FIL">("EN");
  const copy = guide[language];
  return <SubpageShell eyebrow="HOW TO HELP · EMERGENCY INFO" title={copy.title} description={copy.intro}>
    <div className="guide-toolbar"><span><ShieldCheck size={15} /> Safe, verified, anonymous</span><div className="guide-language" aria-label="Guide language"><button className={language === "EN" ? "current" : ""} onClick={() => setLanguage("EN")}>English</button><button className={language === "FIL" ? "current" : ""} onClick={() => setLanguage("FIL")}>Filipino</button></div></div>
    <div className="guide-steps">{copy.steps.map(([number, title, text], index) => <article className="guide-step" key={number}><span className={`guide-art guide-art-${index + 1}`}>{index === 0 ? <ShieldCheck size={23} /> : index === 1 ? <Wallet size={23} /> : <HeartHandshake size={23} />}</span><div><span className="subpage-eyebrow">STEP {number}</span><h2>{title}</h2><p>{text}</p></div><span className="guide-step-number">{number}</span></article>)}</div>
    <div className="guide-safety"><ShieldCheck size={18} /><span>{copy.note}</span></div>
    <section className="hotlines-section"><div className="hotline-heading"><span className="hotline-head-icon"><Phone size={17} /></span><div><span className="subpage-eyebrow">QUICK ACCESS</span><h2>Emergency hotlines</h2></div></div><p>Call your local hotline directly in an emergency. If it is safe, share your exact location and follow the dispatcher’s instructions.</p><div className="hotline-list">{hotlines.map((item) => <a className="hotline-card" href={`tel:${item.number.replaceAll("-", "")}`} key={item.name}><span><b>{item.name}</b><small>{item.note}</small></span><strong>{item.number}</strong><ArrowRight size={15} /></a>)}</div><small className="hotline-disclaimer">Numbers shown for quick reference. Availability can vary by location and network; use 911 for immediate danger.</small></section>
    <div className="guide-tip"><MapPin size={16} /><span>Check official local advisories before travelling to an evacuation center or relief drop-off point.</span></div>
  </SubpageShell>;
}

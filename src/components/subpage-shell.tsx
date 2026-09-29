import Link from "next/link";
import { ArrowLeft, HeartHandshake, ShieldCheck } from "lucide-react";

export function SubpageShell({ children, eyebrow, title, description }: { children: React.ReactNode; eyebrow: string; title: string; description: string }) {
  return <main className="subpage"><header className="subpage-header"><Link className="subpage-brand" href="/"><span><HeartHandshake size={19} /></span> bayanihan</Link><Link className="subpage-home" href="/"><ArrowLeft size={15} /> Back to live updates</Link></header><div className="subpage-content"><div className="subpage-eyebrow"><ShieldCheck size={14} /> {eyebrow}</div><h1>{title}</h1><p className="subpage-description">{description}</p>{children}<footer className="subpage-footer"><span><ShieldCheck size={13} /> Anonymous by default · Verified at every step</span><span>Demo experience · Data shown is illustrative</span></footer></div></main>;
}

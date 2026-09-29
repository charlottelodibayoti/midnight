"use client";

import { useState } from "react";
import { ArrowRight, Check, Clock3, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { SubpageShell } from "@/components/subpage-shell";

export default function ImpactPage() {
  const [reference, setReference] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  function track() {
    if (!reference.trim()) { setError("Enter the reference number from your receipt."); setShowResult(false); return; }
    if (reference.trim().toUpperCase() !== "BYN-260930-04821") {
      setError("No demo record found for that reference. Check the number on your receipt.");
      setShowResult(false);
      return;
    }
    setError(""); setShowResult(true);
  }
  return <SubpageShell eyebrow="TRANSPARENCY TRACKER" title="Where did your help go?" description="Track a contribution with its reference number. No account or personal information required.">
    <section className="sub-card tracker-search"><label htmlFor="ref-number">REFERENCE NUMBER</label><div className="tracker-input-row"><input id="ref-number" value={reference} onChange={(event) => setReference(event.target.value)} onKeyDown={(event) => event.key === "Enter" && track()} placeholder="e.g. BYN-260930-04821" /><button onClick={track}>Track help <ArrowRight size={16} /></button></div>{error && <small className="form-error">{error}</small>}<p>Find your reference number on your Bayanihan receipt or payment confirmation.</p></section>
    {showResult && <section className="sub-card tracker-result"><div className="result-head"><span className="result-icon"><PackageCheck size={20} /></span><div><span className="subpage-eyebrow">YOUR HELP IS MAKING A DIFFERENCE</span><h2>Contribution received</h2></div><span className="result-ref">{reference.toUpperCase()}</span></div><p className="result-caption">Your contribution is assigned to a verified community request.</p><div className="tracking-steps"><div className="tracking-step complete"><span><Check size={15} /></span><div><b>Received by verified partner</b><small>Marikina City DRRMO · Sep 30, 2026, 11:14 AM</small></div></div><div className="tracking-step complete"><span><Check size={15} /></span><div><b>Prepared for distribution</b><small>Water and family hygiene packs · Sep 30, 2026, 1:40 PM</small></div></div><div className="tracking-step active"><span><Truck size={15} /></span><div><b>Distribution in progress</b><small>Field team update expected within 24 hours</small></div></div><div className="tracking-step pending"><span><Clock3 size={15} /></span><div><b>Proof of delivery</b><small>Photos and receipt will appear here after review</small></div></div></div><div className="proof-placeholder"><ShieldCheck size={19} /><span><b>Updates verified before publication</b><small>Evidence is checked by a Bayanihan reviewer. Donor identities are not shown.</small></span></div></section>}
    <section className="tracker-help"><ShieldCheck size={18} /><span><b>Every step is accountable.</b> Verified partners report received items and distributions against a public request.</span></section>
  </SubpageShell>;
}

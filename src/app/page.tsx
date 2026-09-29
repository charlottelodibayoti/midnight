"use client";

import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, ArrowUpRight, Bell,
  Check, ChevronDown, ChevronRight, CircleHelp, Droplets, ExternalLink,
  Eye, HeartHandshake, MapPin, Menu, Navigation, Package, Radio, Search,
  ShieldCheck, SlidersHorizontal, Sparkles, Users, Waves, X,
} from "lucide-react";

type AidRequest = {
  id: number; title: string; place: string; type: string; need: string;
  raised: number; goal: number; people: number; urgency: "Urgent" | "High";
  color: string; icon: typeof Droplets;
};

const requests: AidRequest[] = [
  { id: 1, title: "Clean water for Sitio Riverside", place: "Brgy. Tumana, Marikina", type: "WATER & SANITATION", need: "Water", raised: 68400, goal: 100000, people: 320, urgency: "Urgent", color: "blue", icon: Droplets },
  { id: 2, title: "Family food packs", place: "Brgy. San Isidro, Cainta", type: "FOOD & ESSENTIALS", need: "Food", raised: 18600, goal: 30000, people: 145, urgency: "High", color: "orange", icon: Package },
  { id: 3, title: "Emergency shelter kits", place: "Brgy. Malanday, Marikina", type: "SHELTER", need: "Shelter", raised: 42100, goal: 70000, people: 86, urgency: "High", color: "purple", icon: HeartHandshake },
];

const stories = [
  { time: "10:42 AM", title: "Water levels ease in Marikina, but low-lying areas remain on watch", source: "Marikina City DRRMO", tag: "OFFICIAL UPDATE", tone: "mint", views: "2.4k" },
  { time: "9:18 AM", title: "Evacuation center opens at Nangka Elementary School", source: "Verified field reporter · J. Reyes", tag: "FIELD REPORT", tone: "blue", views: "1.8k" },
  { time: "8:56 AM", title: "Rescue teams reach 24 families in Tumana riverside community", source: "BFP Marikina", tag: "RESCUE UPDATE", tone: "orange", views: "964" },
];

const menuItems = [
  { label: "Overview", icon: Activity }, { label: "Live map", icon: MapPin },
  { label: "Latest stories", icon: Radio }, { label: "Who needs help", icon: HeartHandshake },
  { label: "Help board", icon: Package },
];

function HazardMap() {
  return (
    <div className="map-canvas" aria-label="Illustrated live flood hazard map centered on Marikina">
      <svg className="map-art" viewBox="0 0 760 410" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="blocks" width="58" height="52" patternUnits="userSpaceOnUse">
            <path d="M5 6h19v14H5zM33 5h18v20H33zM9 31h21v16H9zM38 34h13v12H38z" fill="#e8eee8" stroke="#dfe7df" strokeWidth="1" />
          </pattern>
          <pattern id="risk" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="9" height="9" fill="#f8e8cf" fillOpacity=".7" /><path d="M0 0v9" stroke="#e6a24e" strokeWidth="2" strokeOpacity=".7" />
          </pattern>
        </defs>
        <rect width="760" height="410" fill="#eef2eb" />
        <rect width="760" height="410" fill="url(#blocks)" />
        <path d="M-24 250 C94 214 108 320 209 273 S352 190 431 250 572 343 790 260" fill="none" stroke="#c6dfdc" strokeWidth="54" />
        <path d="M-24 250 C94 214 108 320 209 273 S352 190 431 250 572 343 790 260" fill="none" stroke="#9fcac5" strokeWidth="2" strokeDasharray="5 7" />
        <path d="M68 -22 110 460M233 -20 204 440M382 -10 420 430M604 -10 566 430M-10 112 790 150M0 354 772 323" stroke="#fff" strokeWidth="13" />
        <path d="M68 -22 110 460M233 -20 204 440M382 -10 420 430M604 -10 566 430M-10 112 790 150M0 354 772 323" stroke="#d4ddd4" strokeWidth="1.5" />
        <path d="M63 236c18-44 70-60 111-40 31 15 40 48 27 76-19 41-67 56-111 34-32-16-42-43-27-70Z" fill="url(#risk)" stroke="#dc9847" strokeWidth="2" />
        <path d="M440 205c15-29 52-41 82-27 26 12 34 37 20 61-15 27-50 37-78 23-28-13-37-34-24-57Z" fill="#efb85e" fillOpacity=".22" stroke="#d89e47" strokeWidth="2" strokeDasharray="5 5" />
        <g fill="#63756c" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="600">
          <text x="87" y="183">TUMANA</text><text x="260" y="120">SAN ROQUE</text><text x="468" y="163">NANGKA</text><text x="581" y="284">MALANDAY</text><text x="270" y="348">MARIKINA RIVER</text><text x="119" y="382">CONCEPCION</text>
        </g>
        <g transform="translate(134 233)"><circle r="17" fill="#e46b42" fillOpacity=".15"/><circle r="8" fill="#e46b42" stroke="white" strokeWidth="3"/><circle r="2.5" fill="white"/></g>
        <g transform="translate(497 230)"><circle r="15" fill="#dda34e" fillOpacity=".2"/><circle r="7" fill="#dda34e" stroke="white" strokeWidth="3"/></g>
        <g transform="translate(328 180)"><circle r="11" fill="#559b77" fillOpacity=".18"/><circle r="5" fill="#559b77" stroke="white" strokeWidth="2"/></g>
        <g transform="translate(640 118)"><circle r="10" fill="#559b77" fillOpacity=".18"/><circle r="4" fill="#559b77" stroke="white" strokeWidth="2"/></g>
      </svg>
      <div className="map-topline"><span className="map-live"><span className="live-dot" /> LIVE HAZARD MAP</span><button className="map-control" aria-label="Filter map"><SlidersHorizontal size={15} /></button></div>
      <div className="map-legend"><span><i className="legend-dot evac" /> Evacuate</span><span><i className="legend-dot warning" /> Warning</span><span><i className="legend-dot safe" /> Safe</span></div>
      <div className="map-current"><span className="current-icon"><Waves size={16} /></span><span><b>Marikina River</b><small>Water level: 17.8 m · Alert level 2</small></span><ChevronRight size={16} /></div>
      <button className="map-locate" aria-label="Center map on location"><Navigation size={16} /></button>
    </div>
  );
}

function formatPeso(value: number) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(value);
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [helpTarget, setHelpTarget] = useState<AidRequest | null>(null);
  const [helpStep, setHelpStep] = useState(1);
  const [helpMethod, setHelpMethod] = useState("Money");
  const [amount, setAmount] = useState(50);
  const [anonymous, setAnonymous] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredRequests = useMemo(() => requests.filter((item) => `${item.title} ${item.place} ${item.need}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const filteredStories = useMemo(() => stories.filter((item) => `${item.title} ${item.source}`.toLowerCase().includes(query.toLowerCase())), [query]);

  function openHelp(target: AidRequest) {
    setHelpTarget(target); setHelpStep(2); setCompleted(false); setHelpMethod("Money"); setAmount(50);
  }
  function showToast(message: string) {
    setToast(message); window.setTimeout(() => setToast(""), 3000);
  }
  function navTo(label: string) {
    setActiveNav(label); setMobileMenu(false);
    if (label === "How to help") { window.location.assign("/how-to-help"); return; }
    if (label === "Help board") { window.location.assign("/help-board"); return; }
    if (label === "Track a donation") { window.location.assign("/impact"); return; }
    if (label === "Trust & safety") { window.location.assign("/trust"); return; }
    if (label === "Publisher dashboard") { window.location.assign("/admin"); return; }
    if (label === "Who needs help") document.getElementById("help-requests")?.scrollIntoView({ behavior: "smooth" });
    else if (label === "Latest stories") document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
    else if (label === "Live map" || label === "Overview") document.getElementById("live-map")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <a href="#top" className="brand"><span className="brand-mark"><HeartHandshake size={22} strokeWidth={2.3} /></span><span className="brand-copy">bayanihan<span>HELP, WHERE IT MATTERS.</span></span></a>
        <div className="side-section-label">YOUR COMMUNITY</div>
        <nav className="side-nav" aria-label="Main navigation">
          {menuItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => navTo(label)} className={`nav-link ${activeNav === label ? "selected" : ""}`}><Icon size={18} strokeWidth={1.9} /><span>{label}</span>{label === "Live map" && <i className="nav-live-dot" />}</button>)}
        </nav>
        <div className="side-section-label tools-label">MORE</div>
        <nav className="side-nav" aria-label="More resources">
          {[{ label: "Track a donation", icon: Activity }, { label: "How to help", icon: CircleHelp }, { label: "Trust & safety", icon: ShieldCheck }, { label: "Publisher dashboard", icon: Radio }].map(({ label, icon: Icon }) => <button key={label} onClick={() => navTo(label)} className="nav-link"><Icon size={17} strokeWidth={1.9} /><span>{label}</span></button>)}
        </nav>
        <div className="side-section-label followed-label">FOLLOWING <button onClick={() => showToast("Area following can be configured in alert settings.")} aria-label="Manage followed areas"><ChevronDown size={14} /></button></div>
        <div className="followed-area"><span className="area-avatar"><MapPin size={15} /></span><span>Metro Manila<small>3 active alerts</small></span><span className="area-alert-count">3</span></div>
        <div className="side-spacer" />
        <div className="sidebar-safety"><div className="safety-icon"><ShieldCheck size={18} /></div><div><b>Give with confidence</b><p>Every request is verified before it goes live.</p><button onClick={() => showToast("Our verification standards are available on every trust profile.")}>Our standards <ArrowRight size={13} /></button></div></div>
        <button className="hotline-link" onClick={() => showToast("Emergency hotlines: 911 · NDRRMC 8911-1406 · Red Cross 143")}><CircleHelp size={17} /> Emergency hotlines <ArrowUpRight size={14} /></button>
        <div className="side-footer"><button className="language-toggle" onClick={() => showToast("Filipino localization is available in How to help; feed translation will be added with the verified source pipeline.")}>EN <span>·</span> FIL</button><span>Privacy-first by design</span></div>
      </aside>

      <section className="main-area" id="top">
        <header className="topbar">
          <button className="mobile-menu-button icon-button" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={20} /> : <Menu size={20} />}</button>
          <div className="breadcrumb">Philippines <ChevronRight size={14} /> <b>Metro Manila</b></div>
          <div className="top-actions">
            {showSearch && <input className="search-input" autoFocus placeholder="Search stories, places..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Escape" && (setShowSearch(false), setQuery(""))} />}
            <button className={`icon-button ${showSearch ? "active-icon" : ""}`} aria-label="Search" onClick={() => { setShowSearch(!showSearch); if (showSearch) setQuery(""); }}><Search size={19} /></button>
            <button className="notification-button" aria-label="Notifications" onClick={() => showToast("You’re all caught up on Metro Manila alerts.")}><Bell size={18} /><i /></button>
            <span className="top-divider" />
            <button className="location-pill" onClick={() => showToast("Showing verified updates near Metro Manila.")}><MapPin size={15} /><span>Metro Manila</span><ChevronDown size={14} /></button>
          </div>
        </header>

        <div className="content-wrap">
          <div className="demo-data-banner"><span>DEMO DATA</span><b>Illustrative preview only</b><small>Not live alerts, verified real-world requests, or active donation channels.</small></div>
          <section className="alert-banner"><span className="alert-symbol"><AlertTriangle size={18} fill="currentColor" /></span><div><b>Flood advisory · Marikina River</b><span>Water levels rising in low-lying areas. Stay alert and follow local guidance.</span></div><span className="alert-time">Updated 4 min ago</span><button aria-label="View alert details" onClick={() => navTo("Live map")}><ArrowRight size={18} /></button></section>

          <div className="welcome-row"><div><div className="eyebrow"><span className="live-dot" /> TUESDAY, SEPTEMBER 30, 2026 <span className="eyebrow-divider">/</span> 11:06 AM PHT</div><h1>Good morning, <span>Metro Manila.</span></h1><p className="welcome-sub">Here’s what’s happening — and where a little help goes a long way.</p></div><button className="text-button" onClick={() => showToast("Stories and requests are published by verified sources only.")}><ShieldCheck size={16} /> How we verify <ArrowRight size={14} /></button></div>

          <div className="summary-grid">
            <article className="summary-card"><span className="summary-icon coral"><Waves size={18} /></span><div className="summary-label">ACTIVE HAZARDS</div><div className="summary-value">03 <span className="summary-note warm">+1 today</span></div><div className="summary-foot"><span className="tiny-pulse" /> 1 evacuation advisory</div></article>
            <article className="summary-card"><span className="summary-icon green"><HeartHandshake size={18} /></span><div className="summary-label">PEOPLE NEEDING HELP</div><div className="summary-value">551 <span className="summary-note">across 3 areas</span></div><div className="summary-foot">Verified by local field teams</div></article>
            <article className="summary-card"><span className="summary-icon blue"><Package size={18} /></span><div className="summary-label">HELP DELIVERED TODAY</div><div className="summary-value">1,284 <span className="summary-note">items</span></div><div className="summary-foot positive"><ArrowUpRight size={13} /> 18% more than yesterday</div></article>
            <article className="summary-card impact-card"><span className="impact-spark"><Sparkles size={16} /></span><div className="summary-label">COMMUNITY IMPACT</div><div className="summary-value">₱284,650</div><div className="summary-foot">raised by neighbors like you</div><div className="impact-decoration" aria-hidden="true">✳</div></article>
          </div>

          <div className="section-heading"><div><div className="section-kicker"><span className="live-dot" /> LIVE SITUATION</div><h2>Hazards near you</h2></div><button className="view-link" onClick={() => navTo("Live map")}>View full map <ArrowRight size={15} /></button></div>

          <div className="map-layout" id="live-map">
            <div className="map-card"><HazardMap /></div>
            <aside className="situation-panel">
              <div className="panel-heading"><div><span className="section-kicker">3 ACTIVE AREAS</span><h3>Situation report</h3></div><button className="tiny-icon-button" aria-label="More situation options" onClick={() => showToast("Showing active alerts only.")}><SlidersHorizontal size={16} /></button></div>
              <div className="hazard-list">
                <button className="hazard-item focused" onClick={() => showToast("Marikina River: Alert level 2, updated 4 minutes ago.")}><span className="hazard-indicator red"><Waves size={16} /></span><span className="hazard-content"><b>Marikina River flooding</b><span>Marikina · 3 barangays at risk</span><small><span className="status-dot red-dot" /> EVACUATE · updated 4m ago</small></span><ChevronRight size={17} /></button>
                <button className="hazard-item" onClick={() => showToast("Cainta: rainfall advisory, updated 22 minutes ago.")}><span className="hazard-indicator amber"><Droplets size={16} /></span><span className="hazard-content"><b>Heavy rainfall advisory</b><span>Cainta · 2 barangays at risk</span><small><span className="status-dot amber-dot" /> WARNING · updated 22m ago</small></span><ChevronRight size={17} /></button>
                <button className="hazard-item" onClick={() => showToast("San Mateo: landslide watch, updated 41 minutes ago.")}><span className="hazard-indicator yellow"><AlertTriangle size={16} /></span><span className="hazard-content"><b>Landslide watch</b><span>San Mateo · upland areas</span><small><span className="status-dot yellow-dot" /> AT RISK · updated 41m ago</small></span><ChevronRight size={17} /></button>
              </div>
              <button className="all-alerts" onClick={() => showToast("You’re viewing all current active alerts in Metro Manila.")}>See all active alerts <ArrowRight size={15} /></button>
            </aside>
          </div>

          <section className="news-section" id="stories">
            <div className="section-heading news-heading"><div><div className="section-kicker">VERIFIED, TIMESTAMPED UPDATES</div><h2>Latest from the ground</h2></div><button className="view-link" onClick={() => navTo("Latest stories")}>All stories <ArrowRight size={15} /></button></div>
            <div className="story-list">{filteredStories.map((story) => <article className="story-row" key={story.title}><span className="story-time">{story.time}</span><span className={`story-dot ${story.tone}`} /><div className="story-main"><span className={`source-tag ${story.tone}`}>{story.tag}</span><h3>{story.title}</h3><span className="story-source"><ShieldCheck size={13} /> {story.source}</span></div><div className="story-views"><Eye size={14} /> {story.views}<span>views</span></div><button className="story-arrow" aria-label={`Read: ${story.title}`} onClick={() => window.location.assign("/stories/marikina-flood")}><ArrowUpRight size={17} /></button></article>)}</div>
          </section>

          <section className="help-section" id="help-requests">
            <div className="section-heading help-heading"><div><div className="section-kicker">VERIFIED HELP REQUESTS <span className="verified-mini"><ShieldCheck size={12} /> ALL VERIFIED</span></div><h2>Help that gets there</h2><p>Small acts add up. Choose a verified request and see exactly where your help goes.</p></div><button className="view-link" onClick={() => showToast("Showing the latest verified help requests.")}>See all requests <ArrowRight size={15} /></button></div>
            <div className="request-grid">{filteredRequests.map((item) => {
              const Icon = item.icon; const progress = Math.round(item.raised / item.goal * 100);
              return <article className="request-card" key={item.id}><div className="request-card-top"><span className={`request-icon ${item.color}`}><Icon size={19} /></span><span className={`urgency-tag ${item.urgency.toLowerCase()}`}><i /> {item.urgency}</span></div><span className="request-type">{item.type}</span><h3>{item.title}</h3><div className="request-location"><MapPin size={14} /> {item.place}</div><div className="progress-meta"><b>{formatPeso(item.raised)} <span>raised</span></b><span>{progress}%</span></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="goal-meta"><span>of {formatPeso(item.goal)} goal</span><span>{item.people} people affected</span></div><div className="request-card-bottom"><span><ShieldCheck size={13} /> Verified · 18 min ago</span><button className="send-help-button" onClick={() => openHelp(item)}>Send help <ArrowRight size={15} /></button></div></article>;
            })}</div>
            {filteredRequests.length === 0 && <div className="empty-results">No verified requests match “{query}”. Try a place or item like “water”.</div>}
          </section>

          <section className="board-strip"><div className="board-icon"><MapPin size={20} /></div><div className="board-copy"><span className="section-kicker">VERIFIED RELIEF PARTNERS</span><h3>Want to give in person?</h3><p>Find trusted drop-off points, accepted goods, and relief teams near you.</p></div><div className="board-logos"><span className="partner-seal">MDRRMO</span><span className="partner-seal red-seal">PH RED CROSS</span><span className="partner-seal green-seal">KAPIT-BISIG</span></div><button className="board-button" onClick={() => showToast("Verified drop-off: Marikina City Hall, Shoe Ave · Daily 8 AM–6 PM · Accepting water, food & hygiene kits.")}>Explore help board <ArrowRight size={15} /></button></section>

          <footer className="page-footer"><span>© 2026 Bayanihan <span className="footer-dot">·</span> Help, where it matters.</span><span><ShieldCheck size={13} /> Anonymous by default <span className="footer-dot">·</span> Verified at every step</span><button onClick={() => showToast("Emergency: 911 · NDRRMC: 8911-1406 · Red Cross: 143")}>Get help now <ArrowUpRight size={13} /></button></footer>
        </div>
      </section>

      {mobileMenu && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)} />}
      {toast && <div className="toast"><Check size={17} /> {toast}<button onClick={() => setToast("")} aria-label="Dismiss"><X size={15} /></button></div>}

      {helpTarget && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setHelpTarget(null)}><section className="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-dialog-title"><div className="modal-header"><span className="modal-brand"><HeartHandshake size={18} /> BAYANIHAN</span><button className="tiny-icon-button" onClick={() => setHelpTarget(null)} aria-label="Close"><X size={19} /></button></div>{completed ? <div className="confirmation"><span className="confirm-mark"><Check size={29} /></span><span className="section-kicker">YOUR HELP IS ON ITS WAY</span><h2 id="help-dialog-title">Maraming salamat.</h2><p>Your demo contribution of {helpMethod === "Money" ? formatPeso(amount) : helpMethod === "Goods" ? "essential goods" : "1 sponsored food pack"} is linked to a verified request.</p><div className="reference-box"><span>REFERENCE NUMBER</span><b>BYN-260930-04821</b><button onClick={() => { navigator.clipboard?.writeText("BYN-260930-04821"); showToast("Reference number copied."); }}><ExternalLink size={14} /> Copy</button></div><p className="receipt-note">Keep this reference to track delivery updates — no account needed.</p><button className="modal-primary" onClick={() => setHelpTarget(null)}>Done <Check size={16} /></button></div> : <><div className="modal-target"><span className="request-icon blue"><Droplets size={18} /></span><div><span className="section-kicker">HELPING</span><b>{helpTarget.title}</b><small><ShieldCheck size={12} /> Verified recipient · {helpTarget.place}</small></div></div><div className="step-indicator"><span className={`step-line ${helpStep >= 1 ? "done" : ""}`} /><span className={`step-line ${helpStep >= 2 ? "done" : ""}`} /><span>STEP {helpStep} OF 2</span></div>{helpStep === 1 && <div className="modal-step"><h2 id="help-dialog-title">How would you like to help?</h2><p>Choose the way that works best for you.</p><div className="method-options">{[{ name: "Money", desc: "Contribute securely to this verified request", icon: HeartHandshake }, { name: "Goods", desc: "Send or drop off items they need", icon: Package }, { name: "Sponsor an item", desc: "Fund a specific essential item", icon: Sparkles }].map(({ name, desc, icon: Icon }) => <button key={name} className={`method-option ${helpMethod === name ? "chosen" : ""}`} onClick={() => setHelpMethod(name)}><span className="method-icon"><Icon size={18} /></span><span><b>{name}</b><small>{desc}</small></span><span className="radio-check">{helpMethod === name && <Check size={12} />}</span></button>)}</div><button className="modal-primary" onClick={() => setHelpStep(2)}>Continue <ArrowRight size={16} /></button></div>}{helpStep === 2 && <div className="modal-step"><h2 id="help-dialog-title">{helpMethod === "Money" ? "Choose an amount" : helpMethod === "Goods" ? "Send useful essentials" : "Sponsor an item"}</h2><p>{helpMethod === "Money" ? "Every contribution goes to the verified recipient." : helpMethod === "Goods" ? "Drop off at Marikina City Hall, Shoe Avenue. Open daily, 8 AM–6 PM." : "A food pack provides 3 days of essentials for one family."}</p>{helpMethod === "Money" ? <><div className="amount-grid">{[20, 50, 100, 200].map((value) => <button key={value} className={amount === value ? "amount-selected" : ""} onClick={() => setAmount(value)}>₱{value}</button>)}</div><label className="custom-amount">Custom amount <span>₱ <input aria-label="Custom amount" type="number" min="1" placeholder="Other amount" onChange={(e) => e.target.value && setAmount(Number(e.target.value))} /></span></label><div className="payment-methods"><span>PAY SECURELY WITH</span><div><b>GCash</b><b>Maya</b><b>QR Ph</b><b>Card</b></div><small><ShieldCheck size={12} /> Processed by a licensed payment provider</small></div></> : <div className="goods-info"><span className="goods-check"><Check size={17} /></span><div><b>{helpMethod === "Goods" ? "Water, food packs, hygiene kits" : "1 family food pack"}</b><small>{helpMethod === "Goods" ? "Drop-off or courier · exact instructions included" : "₱50 per pack · verified distribution partner"}</small></div><span className="goods-amount">{helpMethod === "Goods" ? "NEEDED" : "₱50"}</span></div>}
<button className={`anonymous-option ${anonymous ? "anon-on" : ""}`} onClick={() => setAnonymous(!anonymous)}><span className="anonymous-avatar">{anonymous ? <ShieldCheck size={19} /> : <Users size={18} />}</span><span><b>{anonymous ? "Stay anonymous" : "Add a first name or nickname"}</b><small>{anonymous ? "Your identity is never collected or shared." : "Optional · only shown on your receipt."}</small></span><span className={`toggle ${anonymous ? "toggle-on" : ""}`}><i /></span></button>{!anonymous && <input className="nickname-input" placeholder="First name or nickname" maxLength={24} />}
<div className="secure-direct"><ShieldCheck size={17} /><span><b>Sent directly to verified relief</b><small>Funds never pass through a personal account.</small></span></div>
<div className="modal-buttons"><button className="modal-back" onClick={() => setHelpStep(1)}>Change method</button><button className="modal-primary" onClick={() => setCompleted(true)}>Send {helpMethod === "Money" ? `₱${amount}` : "help"} <ArrowRight size={16} /></button></div><p className="demo-disclaimer">Demo flow — payments are not processed in this preview.</p></div>}
{helpStep === 3 && <div className="modal-step"><h2 id="help-dialog-title">One last thing.</h2><p>No account, no signup. Your reference number is all you need to follow your help.</p><button className={`anonymous-option ${anonymous ? "anon-on" : ""}`} onClick={() => setAnonymous(!anonymous)}><span className="anonymous-avatar">{anonymous ? <ShieldCheck size={19} /> : <Users size={18} />}</span><span><b>{anonymous ? "Stay anonymous" : "Add a first name or nickname"}</b><small>{anonymous ? "Your identity is never collected or shared." : "Optional · only shown on your receipt."}</small></span><span className={`toggle ${anonymous ? "toggle-on" : ""}`}><i /></span></button>{!anonymous && <input className="nickname-input" placeholder="First name or nickname" maxLength={24} />}
<div className="secure-direct"><ShieldCheck size={17} /><span><b>Sent directly to verified relief</b><small>Funds never pass through a personal account.</small></span></div>
<div className="modal-buttons"><button className="modal-back" onClick={() => setHelpStep(2)}>Back</button><button className="modal-primary" onClick={() => setCompleted(true)}>Confirm {helpMethod === "Money" ? `₱${amount}` : "help"} <ArrowRight size={16} /></button></div><p className="demo-disclaimer">Demo flow — payments are not processed in this preview.</p></div>}
</>}</section></div>}
    </main>
  );
}

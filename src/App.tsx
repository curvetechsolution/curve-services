import { useState, useEffect, useMemo } from "react";

const CALENDLY = "https://calendly.com/curvetechsolution/book-a-meeting";
const WA_NO = "923316310490";
const SITE = "https://curvetechsolution.online";
const waLink = (msg = "") => `https://wa.me/${WA_NO}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
const fmtPKR = n => `Rs. ${Number(n).toLocaleString()}`;

// ── Supabase Config ───────────────────────────────────────────────
const SUPABASE_URL = "https://dbyrmttpkeftcgcdneas.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieXJtdHRwa2VmdGNnY2RuZWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NTY1NzcsImV4cCI6MjA5NjMzMjU3N30.ipTjwyyRakLK8Ac9n7TXh-5bQp3tXlOsktcs6bE5mxI";

const SUPABASE_HEADERS = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
};

const B = { s:"#0ea5e9", m:"#0369a1", d:"#0c4a6e", x:"#0284c7", q:"#075985", l:"#e0f2fe", p:"#f0f9ff", mid:"#bae6fd" };
const svcColor = id => ({ chatbot:B.s, webdev:B.m, smm:B.s, seo:B.d, googleads:B.x, growth:B.m, calling:B.q, leadgen:B.x, video:B.s }[id] || B.s);

// ── Global Styles ─────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Inter, system-ui, sans-serif; background: #f8fafc; }
    img { max-width: 100%; display: block; }
    button { font-family: inherit; }
    a { font-family: inherit; }

    .topbar { background: linear-gradient(90deg,${B.d},${B.s}); text-align:center; padding:8px 16px; font-size:13px; font-weight:500; color:#fff; }
    .topbar a { color:#fff; font-weight:700; text-decoration:underline; }

    .navbar { background:#fff; border-bottom:1px solid #e8edf2; padding:8px 20px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 2px 10px rgba(0,0,0,.04); position:sticky; top:0; z-index:200; }
    .navbar-logo { height:56px; object-fit:contain; }
    .navbar-actions { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
    .btn-meeting { background:${B.p}; color:${B.m}; border:1.5px solid ${B.mid}; border-radius:10px; padding:8px 14px; font-weight:700; font-size:13px; text-decoration:none; white-space:nowrap; }
    .btn-wa { background:#25d366; color:#fff; border-radius:10px; padding:9px 16px; font-weight:700; font-size:13px; text-decoration:none; white-space:nowrap; box-shadow:0 4px 14px rgba(37,211,102,.3); }

    .hero { text-align:center; padding:clamp(36px,8vw,68px) 20px clamp(24px,5vw,48px); background:linear-gradient(180deg,${B.l} 0%,#f8fafc 100%); }
    .hero h1 { font-size:clamp(22px,5vw,40px); font-weight:900; color:#0f172a; margin-bottom:14px; line-height:1.18; }
    .hero p { color:#64748b; font-size:clamp(14px,2.5vw,16px); max-width:500px; margin:0 auto; line-height:1.8; }
    .badge-pill { display:inline-block; background:linear-gradient(90deg,${B.d},${B.s}); color:#fff; font-size:12px; font-weight:700; padding:5px 20px; border-radius:99px; margin-bottom:20px; letter-spacing:.08em; text-transform:uppercase; box-shadow:0 4px 14px ${B.s}50; }

    .svc-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(min(170px,100%), 1fr)); gap:12px; }
    .svc-card { background:#fff; border:1.5px solid #e8edf2; border-radius:16px; padding:20px 12px; cursor:pointer; text-align:center; display:flex; flex-direction:column; align-items:center; gap:8px; box-shadow:0 2px 8px rgba(0,0,0,.04); transition:all .25s cubic-bezier(.4,0,.2,1); }
    .svc-card:hover { border-color:${B.s}; transform:translateY(-5px); box-shadow:0 10px 28px ${B.s}22; }
    .svc-icon { width:48px; height:48px; border-radius:14px; background:${B.l}; display:flex; align-items:center; justify-content:center; font-size:22px; margin:0 auto; }
    .svc-label { font-weight:800; font-size:13px; color:#0f172a; line-height:1.3; }
    .svc-tagline { font-size:11px; color:#64748b; line-height:1.5; }
    .svc-cta { background:${B.l}; color:${B.m}; font-size:11px; font-weight:700; padding:4px 14px; border-radius:99px; }

    .pkg-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(270px,100%), 1fr)); gap:20px; margin-bottom:40px; }
    .pkg-card { background:#fff; border-radius:20px; padding:1.5rem; display:flex; flex-direction:column; position:relative; transition:transform .25s,box-shadow .25s; }
    .pkg-card:hover { transform:translateY(-5px); }

    .trust-bar { display:flex; flex-wrap:wrap; justify-content:center; gap:10px 18px; color:#94a3b8; font-size:12px; margin-bottom:24px; }

    .cta-block { padding:22px 20px; background:#fff; border:1.5px solid #e8edf2; border-radius:18px; text-align:center; }
    .cta-block p { color:#64748b; font-size:14px; margin-bottom:14px; }
    .cta-btns { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
    .cta-btn-wa { display:inline-block; background:#25d366; color:#fff; border-radius:12px; padding:11px 22px; font-weight:700; font-size:14px; text-decoration:none; box-shadow:0 6px 18px rgba(37,211,102,.3); }
    .cta-btn-cal { display:inline-block; background:linear-gradient(90deg,${B.s},${B.m}); color:#fff; border-radius:12px; padding:11px 22px; font-weight:700; font-size:14px; text-decoration:none; box-shadow:0 6px 18px ${B.s}40; }

    .detail-nav { background:#fff; border-bottom:1px solid #e8edf2; padding:10px 16px; display:flex; align-items:center; gap:8px; position:sticky; top:0; z-index:100; box-shadow:0 2px 10px rgba(0,0,0,.05); flex-wrap:wrap; }
    .detail-nav-title { font-weight:800; font-size:15px; color:#0f172a; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

    .footer { background:#0c4a6e; color:#fff; padding:28px 20px; text-align:center; }
    .footer-links { display:flex; flex-wrap:wrap; justify-content:center; gap:12px 16px; font-size:12px; color:#7dd3fc; }
    .footer-links a { color:#7dd3fc; text-decoration:none; }

    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.65); z-index:2000; display:flex; align-items:center; justify-content:center; padding:16px; }
    .modal-box { background:#fff; border-radius:22px; padding:32px 24px; max-width:400px; width:100%; box-shadow:0 24px 70px rgba(0,0,0,.22); position:relative; }
    .modal-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

    .custom-builder { display:grid; grid-template-columns:1fr min(300px,100%); gap:20px; align-items:start; }
    .summary-sticky { position:sticky; top:80px; }

    .video-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(280px,100%), 1fr)); gap:20px; margin-bottom:24px; }

    @media (max-width: 640px) {
      .navbar { padding:8px 12px; }
      .navbar-logo { height:44px; }
      .btn-meeting { display:none; }
      .btn-wa { padding:8px 12px; font-size:12px; }
      .svc-grid { grid-template-columns:repeat(2, 1fr); gap:10px; }
      .svc-card { padding:16px 8px; gap:6px; }
      .svc-icon { width:40px; height:40px; font-size:20px; }
      .svc-label { font-size:12px; }
      .svc-tagline { display:none; }
      .pkg-grid { grid-template-columns:1fr; }
      .web-cards-grid { grid-template-columns:1fr !important; }
      .modal-grid { grid-template-columns:1fr; }
      .custom-builder { grid-template-columns:1fr; }
      .summary-sticky { position:static; }
      .cta-btn-wa, .cta-btn-cal { font-size:13px; padding:10px 16px; width:100%; text-align:center; }
      .detail-nav { gap:6px; }
      .detail-nav-title { font-size:13px; }
      .trust-bar { gap:8px 14px; font-size:11px; }
    }

    @media (max-width: 400px) {
      .svc-grid { grid-template-columns:repeat(2, 1fr); }
      .topbar { font-size:11px; padding:7px 10px; }
    }

    @media (min-width: 641px) and (max-width: 900px) {
      .svc-grid { grid-template-columns:repeat(3, 1fr); }
      .pkg-grid { grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); }
      .custom-builder { grid-template-columns:1fr; }
      .summary-sticky { position:static; }
    }

    .fade-in { opacity:0; transform:translateY(20px); transition:all .6s ease; }
    .fade-in.visible { opacity:1; transform:translateY(0); }
    .fade-delay-1 { transition-delay:.08s; }
    .fade-delay-2 { transition-delay:.16s; }

    .wa-float { position:fixed; bottom:24px; right:20px; z-index:9999; width:60px; height:60px; border-radius:50%; background:#25d366; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 24px rgba(37,211,102,.5); cursor:pointer; text-decoration:none; transition:transform .2s,box-shadow .2s; animation:waPulse 2.5s infinite; }
    .wa-float:hover { transform:scale(1.12); box-shadow:0 10px 32px rgba(37,211,102,.6); }
    .wa-float svg { width:34px; height:34px; fill:#fff; }
    @keyframes waPulse { 0%,100%{box-shadow:0 6px 24px rgba(37,211,102,.5),0 0 0 0 rgba(37,211,102,.4)} 60%{box-shadow:0 6px 24px rgba(37,211,102,.5),0 0 0 14px rgba(37,211,102,0)} }

    .builder-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:14px; margin-bottom:20px; }
    .builder-grid-2 { display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; margin-bottom:20px; }
    .web-feat-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; }
    @media (max-width: 1100px) {
      .builder-grid { grid-template-columns:repeat(2, 1fr); }
      .web-feat-grid { grid-template-columns:repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .builder-grid { grid-template-columns:1fr; }
      .builder-grid-2 { grid-template-columns:1fr; }
      .web-feat-grid { grid-template-columns:1fr; }
    }
  `}</style>
);

// ── GetStarted Modal ──────────────────────────────────────────────
function GSModal({ open, onClose, name, price }) {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;
  const msg = name ? `Hi! I'm interested in the *${name}* package${price ? ` (${price})` : ""}. Please share more details.` : "";

  const handleInvoiceRequest = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/invoice_requests`, {
        method: "POST",
        headers: { ...SUPABASE_HEADERS, "Prefer": "return=minimal" },
        body: JSON.stringify({
          id: Date.now().toString(),
          client_name: form.name,
          client_email: form.email,
          service_name: name,
          price: price,
          status: "pending",
        })
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (e) {
      setError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:16, background:"#f1f5f9", border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", fontSize:15, color:"#64748b", fontWeight:700 }}>✕</button>

        {submitted ? (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
            <h3 style={{ fontSize:18, fontWeight:800, color:"#0f172a" }}>Request Sent!</h3>
            <p style={{ fontSize:13, color:"#64748b", marginTop:8 }}>We'll review and send your invoice shortly.</p>
          </div>
        ) : showInvoiceForm ? (
          <div>
            <h3 style={{ fontSize:17, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Invoice Request</h3>
            <p style={{ fontSize:12, color:B.s, fontWeight:600, marginBottom:16 }}>{name}{price ? ` — ${price}` : ""}</p>
            <input
              placeholder="Your Name *"
              value={form.name}
              onChange={e=>setForm({...form, name:e.target.value})}
              style={{ width:"100%", padding:"10px 12px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, marginBottom:10, fontFamily:"inherit" }}
            />
            <input
              placeholder="Email Address *"
              type="email"
              value={form.email}
              onChange={e=>setForm({...form, email:e.target.value})}
              style={{ width:"100%", padding:"10px 12px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, marginBottom:14, fontFamily:"inherit" }}
            />
            {error && <p style={{ fontSize:12, color:"#ef4444", marginBottom:10 }}>{error}</p>}
            <button
              onClick={handleInvoiceRequest}
              disabled={loading}
              style={{ width:"100%", padding:"11px", background:loading?"#94a3b8":`linear-gradient(90deg,${B.d},${B.s})`, color:"#fff", border:"none", borderRadius:10, fontWeight:700, fontSize:14, cursor:loading?"not-allowed":"pointer" }}
            >
              {loading ? "Submitting..." : "Submit Request →"}
            </button>
            <button
              onClick={()=>setShowInvoiceForm(false)}
              style={{ width:"100%", marginTop:8, padding:"8px", background:"transparent", color:"#64748b", border:"1px solid #e2e8f0", borderRadius:10, fontSize:13, cursor:"pointer" }}
            >
              ← Back
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <div style={{ fontSize:36, marginBottom:8 }}>🚀</div>
              <h3 style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:6 }}>Let's Get Started</h3>
              {name && <p style={{ fontSize:13, color:B.s, fontWeight:600, margin:0 }}>{name}{price ? ` — ${price}` : ""}</p>}
            </div>
            <div className="modal-grid">
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"16px 10px", background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:16, textDecoration:"none" }}>
                <span style={{ fontSize:26 }}>💬</span>
                <span style={{ fontSize:14, fontWeight:700, color:"#166534" }}>WhatsApp Us</span>
                <span style={{ fontSize:11, color:"#64748b", textAlign:"center" }}>Instant reply</span>
              </a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"16px 10px", background:B.p, border:`1.5px solid ${B.mid}`, borderRadius:16, textDecoration:"none" }}>
                <span style={{ fontSize:26 }}>📅</span>
                <span style={{ fontSize:14, fontWeight:700, color:B.d }}>Book Meeting</span>
                <span style={{ fontSize:11, color:"#64748b", textAlign:"center" }}>30-min strategy call</span>
              </a>
            </div>
            <button
              onClick={()=>setShowInvoiceForm(true)}
              style={{ marginTop:12, width:"100%", padding:"11px", background:B.d, color:"#fff", border:"none", borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
            >
              🧾 Request Invoice
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Counter ──────────────────────────────────────────────────────
function Ctr({ v, set, min=0, color=B.s, size=36 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", borderRadius:10, overflow:"hidden", border:`1.5px solid ${color}44`, background:"#fff" }}>
      <button onClick={()=>set(Math.max(min,v-1))} style={{ width:size, height:size, border:"none", background:"#f8fafc", cursor:"pointer", fontSize:18, color:"#64748b", fontWeight:700 }}>−</button>
      <span style={{ minWidth:36, textAlign:"center", fontWeight:800, fontSize:16, color:"#0f172a" }}>{v}</span>
      <button onClick={()=>set(v+1)} style={{ width:size, height:size, border:"none", background:color, cursor:"pointer", fontSize:18, color:"#fff", fontWeight:700 }}>+</button>
    </div>
  );
}

// ── Setup Badge ──────────────────────────────────────────────────
function SetupBadge({ setup, note, color }) {
  if (!setup) return null;
  return (
    <div style={{ background:`${color}10`, border:`1.5px solid ${color}35`, borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ width:34, height:34, borderRadius:9, background:`${color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>🔑</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:10, fontWeight:700, color:`${color}bb`, textTransform:"uppercase", letterSpacing:".06em" }}>{note}</div>
        <div style={{ fontSize:16, fontWeight:900, color }}>{setup}</div>
      </div>
      <div style={{ background:color, color:"#fff", fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:6, flexShrink:0, whiteSpace:"nowrap" }}>1× Only</div>
    </div>
  );
}

// ── GSButton ─────────────────────────────────────────────────────
function GSBtn({ color, featured, name, price }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GSModal open={open} onClose={()=>setOpen(false)} name={name} price={price} />
      <button onClick={()=>setOpen(true)}
        style={{ display:"block", width:"100%", marginTop:18, textAlign:"center", padding:"12px 20px", background:featured?`linear-gradient(90deg,${color},${color}cc)`:"transparent", color:featured?"#fff":color, border:`2px solid ${color}`, borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", transition:"all .2s", boxShadow:featured?`0 4px 16px ${color}40`:"none" }}
        onMouseEnter={e=>{if(!featured){e.currentTarget.style.background=color;e.currentTarget.style.color="#fff";}}}
        onMouseLeave={e=>{if(!featured){e.currentTarget.style.background="transparent";e.currentTarget.style.color=color;}}}>
        Get Started →
      </button>
    </>
  );
}

// ── Package Card ─────────────────────────────────────────────────
function PkgCard({ pkg, color }) {
  return (
    <div className="pkg-card" style={{ border:pkg.featured?`2px solid ${color}`:"1.5px solid #e8edf2", boxShadow:pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)" }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 14px 36px ${color}22`;}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow=pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)";}}>
      {pkg.featured && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${color},${color}bb)`, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 18px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 4px 12px ${color}50` }}>⭐ Most Popular</div>}
      <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:5 }}>{pkg.tier}</div>
      <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:4 }}>{pkg.name}</div>
      {pkg.note && <div style={{ fontSize:12, background:B.p, color:B.d, fontWeight:600, padding:"3px 10px", borderRadius:8, display:"inline-block", marginBottom:8 }}>{pkg.note}</div>}
      <div style={{ fontSize:pkg.customPrice?"22px":"26px", fontWeight:900, color, marginBottom:2 }}>{pkg.price}<span style={{ fontSize:13, fontWeight:400, color:"#94a3b8" }}>{pkg.per}</span></div>
      <div style={{ fontSize:12, color:"#94a3b8", marginBottom:pkg.setup?12:18 }}>{pkg.year}</div>
      <SetupBadge setup={pkg.setup} note={pkg.setupNote} color={color} />
      <div style={{ flex:1, borderTop:"1px solid #f1f5f9", paddingTop:12 }}>
        {(pkg.features||[]).map((f,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:8, fontSize:13, color:"#374151" }}>
            <span style={{ color, fontWeight:700, flexShrink:0 }}>✓</span>{f}
          </div>
        ))}
        {(pkg.warning||[]).map((w,i)=>(
          <div key={i} style={{ display:"flex", gap:7, marginTop:10, marginBottom:5, fontSize:12, color:"#d97706", fontWeight:600 }}>
            <span>⚠</span>{w}
          </div>
        ))}
      </div>
      <GSBtn color={color} featured={pkg.featured} name={pkg.name} price={pkg.price+"/mo"} />
    </div>
  );
}

// ── Web Features ──────────────────────────────────────────────────
const WEB_FEATURES = {
  service: [
    { key:"pages",      icon:"📄", label:"Number of Pages",        type:"counter", min:1, max:20, default:4, basePrice:800,  unit:"page",  desc:"Each additional page" },
    { key:"whatsapp",   icon:"💬", label:"WhatsApp Button",         type:"toggle",  price:0,     included:true, desc:"CTA button linking to WhatsApp" },
    { key:"chatbot",    icon:"🤖", label:"WhatsApp Chatbot",         type:"toggle",  price:2500,  desc:"Automated WhatsApp reply bot" },
    { key:"queryform",  icon:"📋", label:"Query / Contact Form",     type:"toggle",  price:800,   desc:"Lead capture form on your site" },
    { key:"googlemap",  icon:"📍", label:"Google Map Embed",         type:"toggle",  price:500,   desc:"Show your location on the site" },
    { key:"reviews",    icon:"⭐", label:"Google Reviews Section",   type:"toggle",  price:700,   desc:"Display your Google reviews" },
    { key:"booking",    icon:"📅", label:"Appointment Booking",      type:"toggle",  price:4000,  desc:"Online booking / scheduling system" },
    { key:"calendar",   icon:"🗓️", label:"Booking + Calendar Sync",  type:"toggle",  price:2000,  desc:"Sync bookings with Google Calendar" },
    { key:"crm",        icon:"📊", label:"Google Sheets CRM",        type:"toggle",  price:3000,  desc:"Auto-log leads into Google Sheets" },
    { key:"metapixel",  icon:"🎯", label:"Meta Pixel Setup",         type:"toggle",  price:1500,  desc:"Facebook/Instagram ad tracking" },
    { key:"googleindex",icon:"🔍", label:"Google Indexing",          type:"toggle",  price:1000,  desc:"Submit site to Google Search" },
    { key:"aichatbot",  icon:"🧠", label:"AI Chatbot",               type:"toggle",  price:5000,  desc:"Smart AI-powered website chatbot" },
    { key:"mobile",     icon:"📱", label:"Mobile Responsive",        type:"toggle",  price:0,     included:true, desc:"Works on all screen sizes" },
  ],
  ecom: [
    { key:"pages",      icon:"📄", label:"Number of Pages",          type:"counter", min:1, max:20, default:4, basePrice:800,  unit:"page",  desc:"Each page beyond 1st" },
    { key:"products",   icon:"🛍️", label:"Product Listings",          type:"counter", min:5, max:100, default:10, basePrice:150, unit:"product", desc:"Per product listing" },
    { key:"categories", icon:"🗂️", label:"Product Categories",        type:"counter", min:1, max:20, default:3, basePrice:400,  unit:"cat",   desc:"Per product category" },
    { key:"whatsapp",   icon:"💬", label:"WhatsApp Button",           type:"toggle",  price:0,     included:true, desc:"CTA button linking to WhatsApp" },
    { key:"cart",       icon:"🛒", label:"Add to Cart + COD",         type:"toggle",  price:3000,  desc:"Cart system with cash on delivery" },
    { key:"payment",    icon:"💳", label:"Payment Gateway",           type:"toggle",  price:5000,  desc:"Online payments (card/bank)" },
    { key:"checkout",   icon:"✅", label:"Checkout System",           type:"toggle",  price:2000,  desc:"Full checkout + order management" },
    { key:"inventory",  icon:"📦", label:"Inventory Management",      type:"toggle",  price:3000,  desc:"Track stock levels automatically" },
    { key:"accounts",   icon:"👤", label:"Customer Accounts",         type:"toggle",  price:2500,  desc:"Login, orders, profile for customers" },
    { key:"googlemap",  icon:"📍", label:"Google Map Embed",          type:"toggle",  price:500,   desc:"Show your store location" },
    { key:"metapixel",  icon:"🎯", label:"Meta Pixel Setup",          type:"toggle",  price:1500,  desc:"Facebook/Instagram ad tracking" },
    { key:"mobile",     icon:"📱", label:"Mobile Responsive",         type:"toggle",  price:0,     included:true, desc:"Works on all screen sizes" },
  ]
};

const BASE_PRICE = { service: 5000, ecom: 7000 };

function WebPlanChooser({ color }) {
  const [tab, setTab] = useState("service");
  const features = WEB_FEATURES[tab];
  const initState = (t) => {
    const s: Record<string,any> = {};
    WEB_FEATURES[t].forEach(f => {
      if (f.type === "toggle") s[f.key] = !!f.included;
      if (f.type === "counter") s[f.key] = f.default;
    });
    return s;
  };
  const [sel, setSel] = useState<Record<string,any>>(() => initState("service"));
  const switchTab = (t) => { setTab(t); setSel(initState(t)); };
  const toggle = (key) => setSel(s => ({ ...s, [key]: !s[key] }));
  const counter = (key, delta, min, max) => setSel(s => ({ ...s, [key]: Math.min(max, Math.max(min, (s[key]||0)+delta)) }));
  const total = useMemo(() => {
    let p = BASE_PRICE[tab];
    features.forEach(f => {
      if (f.type === "toggle" && sel[f.key] && !f.included) p += f.price;
      if (f.type === "counter") p += (sel[f.key] - f.min) * f.basePrice;
    });
    return p;
  }, [sel, tab]);
  const fmtPrice = (n) => "Rs. " + n.toLocaleString("en-PK");
  const picked = features.filter(f => {
    if (f.type === "toggle") return sel[f.key];
    if (f.type === "counter") return sel[f.key] > 0;
    return false;
  });

  return (
    <div style={{ marginBottom:40, background:"#fff", borderRadius:24, padding:"20px 18px", boxShadow:"0 4px 32px rgba(0,0,0,.07)", border:"1px solid #f0f4f8" }}>
      <div style={{ textAlign:"center", marginBottom:16 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${color}12`, borderRadius:99, padding:"6px 18px", marginBottom:10 }}>
          <span>✨</span>
          <span style={{ fontSize:12, fontWeight:700, color, letterSpacing:".06em", textTransform:"uppercase" }}>Build Your Own Plan</span>
        </div>
        <h2 style={{ fontSize:18, fontWeight:900, color:"#0f172a", margin:"0 0 4px" }}>Choose only what you need</h2>
        <p style={{ color:"#94a3b8", fontSize:13, margin:0 }}>Select features below — price updates live · Domain & Hosting not included</p>
      </div>
      <div style={{ display:"flex", background:"#f1f5f9", borderRadius:12, padding:4, marginBottom:14, gap:4 }}>
        {["service","ecom"].map(t=>(
          <button key={t} onClick={()=>switchTab(t)} style={{ flex:1, padding:"10px 0", borderRadius:10, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, background:tab===t?color:"transparent", color:tab===t?"#fff":"#64748b", transition:"all .2s" }}>
            {t==="service"?"🏢 Service Website":"🛒 E-Commerce"}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>Select Features</div>
          <div className="web-feat-grid">
            {features.map(f => (
              <div key={f.key} style={{ background: (f.type==="toggle"?sel[f.key]:true) ? `${color}08` : "#f8fafc", border:`1.5px solid ${(f.type==="toggle"?sel[f.key]:true)?color+"30":"#e8edf2"}`, borderRadius:10, padding:"8px 10px", transition:"all .2s", height:"100%", boxSizing:"border-box" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, height:"100%" }}>
                  <span style={{ fontSize:16, flexShrink:0 }}>{f.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{f.label}</div>
                    <div style={{ fontSize:11, color:"#94a3b8" }}>{f.desc}</div>
                  </div>
                  {f.type === "toggle" && (
                    f.included
                      ? <span style={{ fontSize:11, fontWeight:700, color:"#10b981", background:"#d1fae5", borderRadius:99, padding:"2px 10px" }}>Included</span>
                      : <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontSize:12, fontWeight:700, color }}>{fmtPrice(f.price)}</span>
                          <button onClick={()=>toggle(f.key)} style={{ width:40, height:22, borderRadius:11, border:"none", cursor:"pointer", background:sel[f.key]?color:"#cbd5e1", transition:"all .2s", position:"relative", flexShrink:0 }}>
                            <span style={{ position:"absolute", top:2, left:sel[f.key]?20:2, width:18, height:18, borderRadius:9, background:"#fff", transition:"all .2s", boxShadow:"0 1px 4px rgba(0,0,0,.2)" }} />
                          </button>
                        </div>
                  )}
                  {f.type === "counter" && (
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:11, color:"#64748b", marginRight:4 }}>{fmtPrice(f.basePrice)}/{f.unit}</span>
                      <button onClick={()=>counter(f.key,-1,f.min,f.max)} style={{ width:26, height:26, borderRadius:8, border:`1.5px solid ${color}`, background:"#fff", color, fontWeight:900, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                      <span style={{ fontSize:14, fontWeight:800, color:"#0f172a", minWidth:24, textAlign:"center" }}>{sel[f.key]}</span>
                      <button onClick={()=>counter(f.key,1,f.min,f.max)} style={{ width:26, height:26, borderRadius:8, border:`1.5px solid ${color}`, background:color, color:"#fff", fontWeight:900, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:`linear-gradient(135deg,${color}10,${color}04)`, border:`2px solid ${color}30`, borderRadius:18, padding:"24px 28px" }}>
          <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>Your Custom Plan</div>
          <div style={{ fontSize:11, color:"#ef4444", fontWeight:600, marginBottom:16 }}>❌ Domain & Hosting NOT included</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"6px 20px", marginBottom:18, minHeight:36 }}>
            {picked.length === 0 && <div style={{ color:"#94a3b8", fontSize:13 }}>No features selected yet</div>}
            {picked.map(f => (
              <div key={f.key} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12, color:"#374151", gap:8 }}>
                <span style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <span style={{ color, fontWeight:800 }}>✓</span>
                  <span>{f.icon} {f.label}{f.type==="counter" ? ` × ${sel[f.key]}` : ""}</span>
                </span>
                <span style={{ fontWeight:700, color, flexShrink:0, fontSize:11 }}>
                  {f.included ? "Free" : f.type==="counter" ? fmtPrice((sel[f.key]-f.min)*f.basePrice) : fmtPrice(f.price)}
                </span>
              </div>
            ))}
          </div>
          <div style={{ borderTop:`1.5px dashed ${color}40`, paddingTop:14, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
              <div>
                <div style={{ fontSize:12, color:"#64748b", fontWeight:600, marginBottom:2 }}>Base Price</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{fmtPrice(BASE_PRICE[tab])}</div>
              </div>
              <div>
                <div style={{ fontSize:12, color:"#64748b", fontWeight:600, marginBottom:2 }}>Add-ons</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{fmtPrice(total - BASE_PRICE[tab])}</div>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:12, color:"#64748b", marginBottom:2 }}>Total (one-time)</div>
              <div style={{ fontSize:32, fontWeight:900, color, lineHeight:1 }}>{fmtPrice(total)}</div>
            </div>
          </div>
          <GSBtn color={color} featured={true} name={"Custom Website"} price={fmtPrice(total)} />
        </div>
      </div>
    </div>
  );
}

function WebSection({ packages, color }) {
  const [mode, setMode] = useState("packages");
  return (
    <div>
      <div style={{ display:"flex", background:"#f1f5f9", borderRadius:12, padding:4, marginBottom:28, gap:4, maxWidth:360, margin:"0 auto 28px" }}>
        {[{k:"packages",l:"📦 Packages"},{k:"custom",l:"🛠 Build Your Own Plan"}].map(t=>(
          <button key={t.k} onClick={()=>setMode(t.k)} style={{ flex:1, padding:"9px 0", borderRadius:9, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, background:mode===t.k?color:"transparent", color:mode===t.k?"#fff":"#64748b", transition:"all .2s" }}>{t.l}</button>
        ))}
      </div>
      {mode==="packages" && (
        <div className="web-cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:40 }}>
          {packages.map((pkg,i) => <WebCard key={i} pkg={pkg} color={color} />)}
        </div>
      )}
      {mode==="custom" && <WebPlanChooser color={color} />}
    </div>
  );
}

function WebCard({ pkg, color }) {
  const [tab, setTab] = useState("service");
  return (
    <div className="pkg-card" style={{ border:pkg.featured?`2px solid ${color}`:"1.5px solid #e8edf2", boxShadow:pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)" }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 14px 36px ${color}22`;}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow=pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)";}}>
      {pkg.featured && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${color},${color}bb)`, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 18px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 4px 12px ${color}50` }}>⭐ Most Popular</div>}
      <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:5 }}>{pkg.tier}</div>
      <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:6 }}>{pkg.name}</div>
      <div style={{ fontSize:26, fontWeight:900, color, marginBottom:2 }}>{pkg.price}<span style={{ fontSize:13, fontWeight:400, color:"#94a3b8" }}>{pkg.per}</span></div>
      <div style={{ fontSize:12, color:"#ef4444", fontWeight:600, marginBottom:16 }}>{pkg.year}</div>
      <div style={{ display:"flex", background:"#f1f5f9", borderRadius:10, padding:4, marginBottom:14, gap:4 }}>
        {["service","ecom"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, background:tab===t?color:"transparent", color:tab===t?"#fff":"#64748b", transition:"all .2s" }}>
            {t==="service"?"🏢 Service":"🛒 E-Commerce"}
          </button>
        ))}
      </div>
      <div style={{ flex:1, borderTop:"1px solid #f1f5f9", paddingTop:12 }}>
        {(tab==="service"?pkg.service:pkg.ecom).map((f,i)=>(
          <div key={i} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"#374151" }}>
            <span style={{ color, fontWeight:700, flexShrink:0 }}>✓</span>{f}
          </div>
        ))}
      </div>
      <GSBtn color={color} featured={pkg.featured} name={`${pkg.name} Website`} price={pkg.price} />
    </div>
  );
}

// ── Video Service ─────────────────────────────────────────────────
function DurationBtn({ secs, baseSecs, basePrice, color, selected, onClick }) {
  const multiplier = Math.pow(1.5, (secs - baseSecs) / 30);
  const price = Math.round(basePrice * multiplier / 100) * 100;
  return (
    <button onClick={onClick} style={{ padding:"6px 12px", borderRadius:10, border:`1.5px solid ${selected?color:"#e2e8f0"}`, background:selected?`${color}15`:"#f8fafc", color:selected?color:"#64748b", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s", whiteSpace:"nowrap" }}>
      {secs}s — {fmtPKR(price)}
    </button>
  );
}

function VideoService({ color }) {
  const BASE_SECS = 30;
  const VIDEO_TYPES = [
    { key:"ai",   label:"AI Commercial Video",     icon:"🎨", badge:"No Copyright Claim",   basePrice:6000,
      feats:["AI-generated 30s commercial","Background music included","Smooth animations & transitions","Royalty-free characters","Text overlays & visual effects","HD quality — ready to post"] },
    { key:"reel", label:"Reel / Short Editing",     icon:"✂️", badge:"Reels & Shorts",        basePrice:3500,
      feats:["Professionally edited short","Your footage or sourced clips","Reels / Shorts format","Precision cuts & transitions","Captions & text overlays","Music sync included"] },
    { key:"yt",   label:"YouTube Video",            icon:"▶️", badge:"YouTube Ready",         basePrice:5000,
      feats:["Full YouTube-format video","Intro & outro included","Chapter markers added","Thumbnail design included","Color grading & audio mix","SEO-optimized title/description"] },
    { key:"aiyt", label:"AI YouTube Video",         icon:"🤖", badge:"AI + YouTube",          basePrice:8000,
      feats:["AI-generated YouTube video","Script & voiceover AI","Animated visuals & scenes","Background music licensed","Thumbnail auto-generated","HD — channel-ready"] },
  ];
  const [counts, setCounts] = useState<Record<string,number>>({ ai:0, reel:0, yt:0, aiyt:0 });
  const [durations, setDurations] = useState<Record<string,number>>({ ai:30, reel:30, yt:30, aiyt:30 });
  const [gsOpen, setGsOpen] = useState(false);
  const getPrice = (basePrice, secs) => Math.round(basePrice * Math.pow(1.5, (secs - BASE_SECS) / 30) / 100) * 100;
  const totalForType = (key) => { const vt = VIDEO_TYPES.find(v=>v.key===key); return counts[key] * getPrice(vt.basePrice, durations[key]); };
  const total = VIDEO_TYPES.reduce((s,vt) => s + totalForType(vt.key), 0);
  const totalVideos = Object.values(counts).reduce((a,b)=>a+b,0);
  const DURATION_OPTIONS = [30, 60, 90, 120];
  return (
    <div>
      <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name={`Video Package (${totalVideos} videos)`} price={total?fmtPKR(total)+"/mo":""} />
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a", marginBottom:6 }}>Build Your Video Package</h2>
        <p style={{ color:"#64748b", fontSize:14 }}>Choose video type, pick duration — price updates instantly. +50% per extra 30 seconds.</p>
      </div>
      <div className="video-grid">
        {VIDEO_TYPES.map(vt => {
          const cnt = counts[vt.key]; const dur = durations[vt.key]; const unitPrice = getPrice(vt.basePrice, dur);
          return (
            <div key={vt.key} style={{ background:"#fff", border:`1.5px solid ${cnt>0?color:"#e8edf2"}`, borderRadius:20, padding:"1.5rem", boxShadow:cnt>0?`0 6px 24px ${color}20`:"0 2px 10px rgba(0,0,0,.05)", transition:"all .25s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:44, height:44, borderRadius:14, background:B.l, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{vt.icon}</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:"#0f172a" }}>{vt.label}</div>
                  <span style={{ display:"inline-block", background:`${color}15`, color, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:99, marginTop:3 }}>{vt.badge}</span>
                </div>
              </div>
              <div style={{ marginBottom:10 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>Select Duration</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {DURATION_OPTIONS.map(s => (
                    <DurationBtn key={s} secs={s} baseSecs={BASE_SECS} basePrice={vt.basePrice} color={color} selected={dur===s} onClick={()=>setDurations(d=>({...d,[vt.key]:s}))} />
                  ))}
                </div>
              </div>
              <div style={{ fontSize:24, fontWeight:900, color, marginBottom:10 }}>{fmtPKR(unitPrice)}<span style={{ fontSize:12, fontWeight:400, color:"#94a3b8" }}> / video ({dur}s)</span></div>
              {vt.feats.map((f,i)=>(
                <div key={i} style={{ display:"flex", gap:8, marginBottom:6, fontSize:13, color:"#374151" }}>
                  <span style={{ color, fontWeight:700, flexShrink:0 }}>✓</span>{f}
                </div>
              ))}
              <div style={{ marginTop:14, display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, flexWrap:"wrap" }}>
                <div style={{ fontSize:13, color:"#64748b", fontWeight:500 }}>Videos this month:</div>
                <Ctr v={cnt} set={v=>setCounts(c=>({...c,[vt.key]:Math.max(0,v)}))} color={color} />
              </div>
              {cnt>0 && (
                <div style={{ marginTop:10, padding:"8px 12px", background:`${color}10`, borderRadius:10, display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:"#64748b" }}>{cnt} video{cnt>1?"s":""} × {dur}s</span>
                  <span style={{ fontWeight:700, color }}>{fmtPKR(cnt*unitPrice)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {totalVideos>0 ? (
        <div style={{ background:`linear-gradient(135deg,${B.p},#fff)`, border:`2px solid ${color}44`, borderRadius:20, padding:24, marginBottom:20 }}>
          <div style={{ fontWeight:700, fontSize:15, color:"#0f172a", marginBottom:12 }}>📋 Your Monthly Video Package</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
            {VIDEO_TYPES.map(vt => counts[vt.key]>0 && (
              <div key={vt.key} style={{ display:"flex", justifyContent:"space-between", fontSize:14 }}>
                <span style={{ color:"#64748b" }}>{vt.icon} {vt.label} ({counts[vt.key]} × {durations[vt.key]}s)</span>
                <span style={{ fontWeight:700, color }}>{fmtPKR(totalForType(vt.key))}</span>
              </div>
            ))}
            <div style={{ borderTop:"1.5px solid #e8edf2", paddingTop:10, display:"flex", justifyContent:"space-between", fontSize:18, fontWeight:900 }}>
              <span style={{ color:"#0f172a" }}>Total / Month</span>
              <span style={{ color }}>{fmtPKR(total)}</span>
            </div>
          </div>
          <button onClick={()=>setGsOpen(true)} style={{ width:"100%", background:`linear-gradient(90deg,${color},${color}cc)`, color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontSize:15, fontWeight:700, cursor:"pointer", boxShadow:`0 6px 18px ${color}40` }}>
            Get Started →
          </button>
        </div>
      ) : (
        <div style={{ background:"#f8fafc", border:"1.5px dashed #e2e8f0", borderRadius:16, padding:28, textAlign:"center" }}>
          <div style={{ fontSize:28, marginBottom:8 }}>👆</div>
          <div style={{ fontSize:14, color:"#94a3b8" }}>Select a duration and add videos using + buttons above to see your package total</div>
        </div>
      )}
    </div>
  );
}

// ── SMM Service ───────────────────────────────────────────────────
const PLATS_DEF = [
  { id:"fb", label:"Facebook", icon:"📘" },
  { id:"ig", label:"Instagram", icon:"📸" },
  { id:"tt", label:"TikTok", icon:"🎵" },
  { id:"li", label:"LinkedIn", icon:"💼" },
  { id:"yt", label:"YouTube", icon:"▶️" },
];

function SMMService({ color }) {
  const [mode, setMode] = useState("packages");
  const [plats, setPlats] = useState(["fb","ig"]);
  const [posts, setPosts] = useState(8);
  const [aiReels, setAiReels] = useState(0);
  const [edReels, setEdReels] = useState(0);
  const [fbAds, setFbAds] = useState(0);
  const [ttAds, setTtAds] = useState(0);
  const [liAds, setLiAds] = useState(0);
  const [ytAds, setYtAds] = useState(0);
  const [fbBudget, setFbBudget] = useState(5000);
  const [ttBudget, setTtBudget] = useState(5000);
  const [liBudget, setLiBudget] = useState(5000);
  const [ytBudget, setYtBudget] = useState(5000);
  const [gsOpen, setGsOpen] = useState(false);
  const [gsPkg, setGsPkg] = useState(null);

  const PLAT_P=1500, POST_P=700, AIR_P=4000, EDR_P=2500, FB_AD=2000, TT_AD=2500, LI_AD=3000, YT_AD=5000;
  const customTotal = plats.length*PLAT_P + posts*POST_P + aiReels*AIR_P + edReels*EDR_P + fbAds*FB_AD + ttAds*TT_AD + liAds*LI_AD + ytAds*YT_AD;

  const fixedPkgs = [
    { name:"Starter Presence", tier:"Starter", price:"Rs 9,999", per:"/month", featured:false,
      features:["Platforms: Facebook + Instagram","6 Posts per month","1 Reel (20–30 sec)","3 Campaign optimizations","Basic page management","Captions & hashtags"],
      warning:["Sponsored ads budget NOT included","Recommended Ads Budget: PKR 10,000 (Client Paid)"] },
    { name:"Digital Growth", tier:"Standard", price:"Rs 19,999", per:"/month", featured:true,
      features:["Platforms: Facebook + Instagram","One Optional: LinkedIn or TikTok","12 Posts per month","2 Reels (30–45 sec)","Copywriting & caption hooks","Page management","3 Paid Campaigns (Awareness + Engagement + Retargeting)","Monthly growth report"],
      warning:["Boosting Budget: PKR 15,000–20,000 (Client Paid)"] },
    { name:"Brand Authority", tier:"Pro", price:"Rs 34,999", per:"/month", featured:false,
      features:["Platforms: Facebook, Instagram, LinkedIn, YouTube","25 Custom Posts per month","4 Reels (30–60 sec with overlays)","Content calendar","Competitor analysis","Bi-weekly growth consultation","4 Campaigns (Includes Conversion + Retargeting)"],
      warning:["Boosting Budget: PKR 30,000–50,000 (Client Paid)"] },
  ];

  const togPlat = id => setPlats(p => p.includes(id) ? p.length>1 ? p.filter(x=>x!==id) : p : [...p,id]);

  return (
    <div>
      <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name={gsPkg?.name} price={gsPkg?.price} />
      <div style={{ display:"flex", background:"#f1f5f9", borderRadius:12, padding:4, marginBottom:28, gap:4, maxWidth:360, margin:"0 auto 28px" }}>
        {[{k:"packages",l:"📦 Packages"},{k:"custom",l:"🛠 Make Custom"}].map(t=>(
          <button key={t.k} onClick={()=>setMode(t.k)} style={{ flex:1, padding:"9px 0", borderRadius:9, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, background:mode===t.k?color:"transparent", color:mode===t.k?"#fff":"#64748b", transition:"all .2s" }}>{t.l}</button>
        ))}
      </div>
      {mode==="packages" && (
        <div className="pkg-grid">
          {fixedPkgs.map((pkg,i)=>(
            <div key={i} style={{ background:"#fff", border:pkg.featured?`2px solid ${color}`:"1.5px solid #e8edf2", borderRadius:20, padding:"1.5rem", display:"flex", flexDirection:"column", position:"relative", boxShadow:pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)", transition:"transform .25s,box-shadow .25s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 14px 36px ${color}22`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)";}}>
              {pkg.featured && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${color},${color}bb)`, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 18px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 4px 12px ${color}50` }}>⭐ Most Popular</div>}
              <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>{pkg.tier}</div>
              <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", marginBottom:6 }}>{pkg.name}</div>
              <div style={{ fontSize:26, fontWeight:900, color, marginBottom:16 }}>{pkg.price}<span style={{ fontSize:13, fontWeight:400, color:"#94a3b8" }}>{pkg.per}</span></div>
              <div style={{ flex:1, borderTop:"1px solid #f1f5f9", paddingTop:12 }}>
                {pkg.features.map((f,j)=><div key={j} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"#374151" }}><span style={{ color, fontWeight:700, flexShrink:0 }}>✓</span>{f}</div>)}
                {pkg.warning.map((w,j)=><div key={j} style={{ display:"flex", gap:7, marginTop:10, marginBottom:5, fontSize:12, color:"#d97706", fontWeight:600 }}><span>⚠</span>{w}</div>)}
              </div>
              <button onClick={()=>{ setGsPkg(pkg); setGsOpen(true); }} style={{ display:"block", width:"100%", marginTop:18, textAlign:"center", padding:"12px 0", background:pkg.featured?`linear-gradient(90deg,${color},${color}cc)`:"transparent", color:pkg.featured?"#fff":color, border:`2px solid ${color}`, borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", transition:"all .2s" }}
                onMouseEnter={e=>{if(!pkg.featured){e.currentTarget.style.background=color;e.currentTarget.style.color="#fff";}}}
                onMouseLeave={e=>{if(!pkg.featured){e.currentTarget.style.background="transparent";e.currentTarget.style.color=color;}}}>
                Get Started →
              </button>
            </div>
          ))}
        </div>
      )}
      {mode==="custom" && (
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div className="builder-grid-2">
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem" }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:4 }}>📱 Platforms <span style={{ fontSize:12, color:"#94a3b8", fontWeight:400 }}>— {fmtPKR(PLAT_P)}/platform/mo</span></div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:10 }}>
                {PLATS_DEF.map(p=>{
                  const sel=plats.includes(p.id);
                  return <button key={p.id} onClick={()=>togPlat(p.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:10, border:`1.5px solid ${sel?color:"#e2e8f0"}`, background:sel?`${color}12`:"#fff", cursor:"pointer", fontSize:13, fontWeight:600, color:sel?color:"#64748b", transition:"all .2s" }}>
                    {p.icon} {p.label} {sel&&<span style={{ background:color, color:"#fff", borderRadius:"50%", width:15, height:15, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>✓</span>}
                  </button>;
                })}
              </div>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem" }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:4 }}>📝 Graphic Posts <span style={{ fontSize:12, color:"#94a3b8", fontWeight:400 }}>— {fmtPKR(POST_P)}/post</span></div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, marginTop:10, flexWrap:"wrap" }}>
                <span style={{ fontSize:13, color:"#475569" }}>Posts per month: <strong style={{ color:"#0f172a" }}>{posts}</strong></span>
                <Ctr v={posts} set={setPosts} min={0} color={color} />
              </div>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem" }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:12 }}>🎬 Reels / Short Videos</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div style={{ background:aiReels>0?`${color}08`:"#f8fafc", border:`1.5px solid ${aiReels>0?color:"#e2e8f0"}`, borderRadius:12, padding:"12px", transition:"all .2s" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#0f172a", marginBottom:2 }}>🎨 AI Reel</div>
                  <div style={{ fontSize:16, fontWeight:800, color, marginBottom:8 }}>{fmtPKR(AIR_P)}</div>
                  <Ctr v={aiReels} set={setAiReels} color={color} size={32} />
                </div>
                <div style={{ background:edReels>0?`${color}08`:"#f8fafc", border:`1.5px solid ${edReels>0?color:"#e2e8f0"}`, borderRadius:12, padding:"12px", transition:"all .2s" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#0f172a", marginBottom:2 }}>✂️ Editing Reel</div>
                  <div style={{ fontSize:16, fontWeight:800, color, marginBottom:8 }}>{fmtPKR(EDR_P)}</div>
                  <Ctr v={edReels} set={setEdReels} color={color} size={32} />
                </div>
              </div>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem" }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:12 }}>📢 Paid Ad Campaigns</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[{label:"📘 Facebook Ads", v:fbAds, set:setFbAds, p:FB_AD},{label:"🎵 TikTok Ads", v:ttAds, set:setTtAds, p:TT_AD},{label:"💼 LinkedIn Ads", v:liAds, set:setLiAds, p:LI_AD},{label:"▶️ YouTube Ads", v:ytAds, set:setYtAds, p:YT_AD}].map(a=>(
                  <div key={a.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, padding:"8px 12px", background:a.v>0?`${color}08`:"#f8fafc", borderRadius:10, border:`1px solid ${a.v>0?color+"44":"#e8edf2"}`, transition:"all .2s", flexWrap:"wrap" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{a.label}</div>
                      <div style={{ fontSize:11, color:"#94a3b8" }}>{fmtPKR(a.p)}/campaign</div>
                    </div>
                    <Ctr v={a.v} set={a.set} color={color} size={30} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem" }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:4 }}>💰 Advertisement Budget <span style={{ fontSize:11, color:"#94a3b8", fontWeight:400 }}>— per platform (client paid)</span></div>
              <p style={{ fontSize:12, color:"#94a3b8", marginBottom:12 }}>Set how much budget your ads will run on. Min: Rs. 2,000 · Max: Rs. 5,00,000</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  {label:"📘 Facebook Ads", v:fbBudget, set:setFbBudget},
                  {label:"🎵 TikTok Ads", v:ttBudget, set:setTtBudget},
                  {label:"💼 LinkedIn Ads", v:liBudget, set:setLiBudget},
                  {label:"▶️ YouTube Ads", v:ytBudget, set:setYtBudget},
                ].map(b=>(
                  <div key={b.label} style={{ padding:"10px 12px", background:"#f8fafc", borderRadius:10, border:"1px solid #e8edf2" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                      <span style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{b.label}</span>
                      <span style={{ fontSize:14, fontWeight:800, color }}>{fmtPKR(b.v)}</span>
                    </div>
                    <input type="range" min={2000} max={500000} step={1000} value={b.v} onChange={e=>b.set(Number(e.target.value))}
                      style={{ width:"100%", accentColor:color, height:6, borderRadius:3, cursor:"pointer" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#94a3b8", marginTop:4 }}>
                      <span>Rs. 2,000</span><span>Rs. 5,00,000</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background:`linear-gradient(135deg,${color}10,${color}04)`, border:`2px solid ${color}30`, borderRadius:18, padding:"24px 28px" }}>
            <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:14 }}>💰 Package Summary</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"6px 20px", marginBottom:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>📱 Platforms ({plats.length})</span><span style={{ fontWeight:700 }}>{fmtPKR(plats.length*PLAT_P)}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>📝 Posts ({posts})</span><span style={{ fontWeight:700 }}>{fmtPKR(posts*POST_P)}</span></div>
              {aiReels>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>🎨 AI Reels ({aiReels})</span><span style={{ fontWeight:700 }}>{fmtPKR(aiReels*AIR_P)}</span></div>}
              {edReels>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>✂️ Edit Reels ({edReels})</span><span style={{ fontWeight:700 }}>{fmtPKR(edReels*EDR_P)}</span></div>}
              {fbAds>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>📘 FB Ads ({fbAds})</span><span style={{ fontWeight:700 }}>{fmtPKR(fbAds*FB_AD)}</span></div>}
              {ttAds>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>🎵 TikTok Ads ({ttAds})</span><span style={{ fontWeight:700 }}>{fmtPKR(ttAds*TT_AD)}</span></div>}
              {liAds>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>💼 LinkedIn Ads ({liAds})</span><span style={{ fontWeight:700 }}>{fmtPKR(liAds*LI_AD)}</span></div>}
              {ytAds>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>▶️ YouTube Ads ({ytAds})</span><span style={{ fontWeight:700 }}>{fmtPKR(ytAds*YT_AD)}</span></div>}
            </div>
            <div style={{ borderTop:`1.5px dashed ${color}40`, paddingTop:14, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <div>
                <div style={{ fontSize:12, color:"#64748b", fontWeight:600, marginBottom:2 }}>Selected Platforms</div>
                <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{plats.map(id=>PLATS_DEF.find(p=>p.id===id)?.label).join(", ")}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12, color:"#64748b", marginBottom:2 }}>Monthly Total</div>
                <div style={{ fontSize:32, fontWeight:900, color, lineHeight:1 }}>{fmtPKR(customTotal)}</div>
              </div>
            </div>
            <button onClick={()=>setGsOpen(true)} style={{ width:"100%", background:`linear-gradient(90deg,${color},${color}cc)`, color:"#fff", border:"none", borderRadius:12, padding:"13px 0", fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 16px ${color}40` }}>
              Get Started →
            </button>
            <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name="Custom Social Media Package" price={fmtPKR(customTotal)+"/mo"} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Lead Gen Service ──────────────────────────────────────────────
function LeadGenService({ color }) {
  const [mode, setMode] = useState("packages");
  const [gsOpen, setGsOpen] = useState(false);
  const [gsPkg, setGsPkg] = useState(null);
  const [leads, setLeads] = useState(100);
  const [emailSeq, setEmailSeq] = useState(false);
  const [waOutreach, setWaOutreach] = useState(false);
  const [linkedinCamp, setLinkedinCamp] = useState(false);
  const [leadScore, setLeadScore] = useState(false);
  const [nurturing, setNurturing] = useState(false);
  const [dedicatedStrat, setDedicatedStrat] = useState(false);

  const LEAD_P=180, EMAIL_P=5000, WA_P=6000, LI_P=7000, SCORE_P=3000, NURTURE_P=5000, STRAT_P=8000;
  const customTotal = leads*LEAD_P + (emailSeq?EMAIL_P:0) + (waOutreach?WA_P:0) + (linkedinCamp?LI_P:0) + (leadScore?SCORE_P:0) + (nurturing?NURTURE_P:0) + (dedicatedStrat?STRAT_P:0);

  const fixedPkgs = [
    { name:"Starter Leads", tier:"Basic", price:"Rs. 20,000", per:"/mo", year:"~Rs. 240,000/year", featured:false, features:["100 verified leads/month","Target by industry & location","Name, email, phone included","Google Sheet delivery","Basic email outreach (50/month)","Monthly lead report"], warning:[] },
    { name:"Growth Leads", tier:"Standard", price:"Rs. 35,000", per:"/mo", year:"~Rs. 420,000/year", featured:true, features:["300 verified leads/month","Cold email sequence (3-step)","WhatsApp outreach automation","LinkedIn connection campaign","Lead scoring & prioritization","Monthly conversion report"], warning:[] },
    { name:"Enterprise Leads", tier:"Pro", price:"Rs. 60,000", per:"/mo", year:"~Rs. 720,000/year", featured:false, features:["700+ verified leads/month","Multi-channel outreach","WhatsApp + LinkedIn + Cold call","Lead nurturing automation","A/B tested messaging","Dedicated lead strategist"], warning:[] },
  ];

  const addons = [
    { label:"📧 Cold Email Sequence (3-step)", v:emailSeq, set:setEmailSeq, price:EMAIL_P },
    { label:"💬 WhatsApp Outreach Automation", v:waOutreach, set:setWaOutreach, price:WA_P },
    { label:"💼 LinkedIn Connection Campaign", v:linkedinCamp, set:setLinkedinCamp, price:LI_P },
    { label:"🏆 Lead Scoring & Prioritization", v:leadScore, set:setLeadScore, price:SCORE_P },
    { label:"🔁 Lead Nurturing Automation", v:nurturing, set:setNurturing, price:NURTURE_P },
    { label:"🧑‍💼 Dedicated Lead Strategist", v:dedicatedStrat, set:setDedicatedStrat, price:STRAT_P },
  ];

  return (
    <div>
      <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name={gsPkg?.name || "Custom Lead Gen Plan"} price={gsPkg?.price || fmtPKR(customTotal)+"/mo"} />
      <div style={{ display:"flex", background:"#f1f5f9", borderRadius:12, padding:4, marginBottom:28, gap:4, maxWidth:360, margin:"0 auto 28px" }}>
        {[{k:"packages",l:"📦 Packages"},{k:"custom",l:"🛠 Make Custom"}].map(t=>(
          <button key={t.k} onClick={()=>setMode(t.k)} style={{ flex:1, padding:"9px 0", borderRadius:9, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, background:mode===t.k?color:"transparent", color:mode===t.k?"#fff":"#64748b", transition:"all .2s" }}>{t.l}</button>
        ))}
      </div>
      {mode==="packages" && (
        <div className="pkg-grid">
          {fixedPkgs.map((pkg,i) => (
            <div key={i} style={{ background:"#fff", border:pkg.featured?`2px solid ${color}`:"1.5px solid #e8edf2", borderRadius:20, padding:"1.5rem", display:"flex", flexDirection:"column", position:"relative", boxShadow:pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)", transition:"transform .25s,box-shadow .25s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 14px 36px ${color}22`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)";}}>
              {pkg.featured && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${color},${color}bb)`, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 18px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 4px 12px ${color}50` }}>⭐ Most Popular</div>}
              <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>{pkg.tier}</div>
              <div style={{ fontSize:17, fontWeight:800, color:"#0f172a", marginBottom:6 }}>{pkg.name}</div>
              <div style={{ fontSize:26, fontWeight:900, color, marginBottom:4 }}>{pkg.price}<span style={{ fontSize:13, fontWeight:400, color:"#94a3b8" }}>{pkg.per}</span></div>
              <div style={{ fontSize:12, color:"#94a3b8", marginBottom:16 }}>{pkg.year}</div>
              <div style={{ flex:1, borderTop:"1px solid #f1f5f9", paddingTop:12 }}>
                {pkg.features.map((f,j)=><div key={j} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"#374151" }}><span style={{ color, fontWeight:700, flexShrink:0 }}>✓</span>{f}</div>)}
              </div>
              <button onClick={()=>{ setGsPkg(pkg); setGsOpen(true); }} style={{ display:"block", width:"100%", marginTop:18, textAlign:"center", padding:"12px 0", background:pkg.featured?`linear-gradient(90deg,${color},${color}cc)`:"transparent", color:pkg.featured?"#fff":color, border:`2px solid ${color}`, borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", transition:"all .2s" }}
                onMouseEnter={e=>{if(!pkg.featured){e.currentTarget.style.background=color;e.currentTarget.style.color="#fff";}}}
                onMouseLeave={e=>{if(!pkg.featured){e.currentTarget.style.background="transparent";e.currentTarget.style.color=color;}}}>
                Get Started →
              </button>
            </div>
          ))}
        </div>
      )}
      {mode==="custom" && (
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div className="builder-grid-2">
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem" }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:4 }}>🎯 Number of Leads <span style={{ fontSize:12, color:"#94a3b8", fontWeight:400 }}>— {fmtPKR(LEAD_P)}/lead</span></div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, marginTop:8 }}>
                <span style={{ fontSize:20, fontWeight:900, color }}>{leads} leads</span>
                <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{fmtPKR(leads*LEAD_P)}/mo</span>
              </div>
              <input type="range" min={50} max={1000} step={50} value={leads} onChange={e=>setLeads(Number(e.target.value))}
                style={{ width:"100%", accentColor:color, height:6, borderRadius:3, cursor:"pointer" }} />
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#94a3b8", marginTop:4 }}>
                <span>50 leads</span><span>1,000 leads</span>
              </div>
              <div style={{ display:"flex", gap:8, marginTop:10, flexWrap:"wrap" }}>
                {[100,300,700].map(n=>(
                  <button key={n} onClick={()=>setLeads(n)} style={{ padding:"5px 12px", borderRadius:8, border:`1.5px solid ${leads===n?color:"#e2e8f0"}`, background:leads===n?`${color}15`:"#f8fafc", color:leads===n?color:"#64748b", fontSize:12, fontWeight:700, cursor:"pointer" }}>{n}</button>
                ))}
              </div>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem" }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:12 }}>⚙️ Outreach Add-ons</div>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {addons.map(a=>(
                  <div key={a.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, padding:"8px 10px", background:a.v?`${color}08`:"#f8fafc", borderRadius:10, border:`1px solid ${a.v?color+"44":"#e8edf2"}`, transition:"all .2s" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{a.label}</div>
                      <div style={{ fontSize:11, color:"#94a3b8" }}>{fmtPKR(a.price)}/mo</div>
                    </div>
                    <button onClick={()=>a.set(!a.v)} style={{ width:40, height:22, borderRadius:11, border:"none", cursor:"pointer", background:a.v?color:"#cbd5e1", transition:"all .2s", position:"relative", flexShrink:0 }}>
                      <span style={{ position:"absolute", top:2, left:a.v?20:2, width:18, height:18, borderRadius:9, background:"#fff", transition:"all .2s", boxShadow:"0 1px 4px rgba(0,0,0,.2)" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background:`linear-gradient(135deg,${color}10,${color}04)`, border:`2px solid ${color}30`, borderRadius:18, padding:"24px 28px" }}>
            <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:14 }}>💰 Custom Plan Summary</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"6px 20px", marginBottom:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>🎯 Leads ({leads})</span><span style={{ fontWeight:700 }}>{fmtPKR(leads*LEAD_P)}</span></div>
              {addons.filter(a=>a.v).map(a=>(
                <div key={a.label} style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}><span style={{ color:"#64748b" }}>{a.label.split(" ").slice(0,3).join(" ")}</span><span style={{ fontWeight:700 }}>{fmtPKR(a.price)}</span></div>
              ))}
            </div>
            <div style={{ borderTop:`1.5px dashed ${color}40`, paddingTop:14, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <div style={{ fontSize:12, color:"#64748b" }}>Monthly Total</div>
              <div style={{ fontSize:32, fontWeight:900, color, lineHeight:1 }}>{fmtPKR(customTotal)}</div>
            </div>
            <button onClick={()=>{ setGsPkg(null); setGsOpen(true); }} style={{ width:"100%", background:`linear-gradient(90deg,${color},${color}cc)`, color:"#fff", border:"none", borderRadius:12, padding:"13px 0", fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 16px ${color}40` }}>
              Get Started →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Services Data ─────────────────────────────────────────────────
const SERVICES = [
  { id:"chatbot", icon:"🤖", label:"Chatbot Automation", tagline:"AI-powered WhatsApp bot that qualifies leads 24/7",
    desc:"Turn every WhatsApp message into a qualified lead automatically. Built on n8n + GPT-4o. Handles qualification, hiring, follow-ups, and CRM logging.",
    type:"packages",
    packages:[
      { name:"Lead Magnet", tier:"Basic", price:"Rs. 12,000", per:"/mo", setup:"Rs. 22,000", setupNote:"One-Time Setup Fee", year:"~Rs. 144,000/year", features:["WhatsApp lead qualification bot","Pakistan vs international detection","Meta developer account setup","VPS server included","2 auto follow-ups (4h + 22h)","Google Sheets lead logging","Gmail notification per lead","1,000 conversations / month","Fallback + escalation logic"] },
      { name:"Smart Assistant", tier:"Standard", featured:true, price:"Rs. 22,000", per:"/mo", setup:"Rs. 36,000", setupNote:"One-Time Setup Fee", year:"~Rs. 264,000/year", features:["Everything in Basic","Hiring flow (6 role-specific forms)","Voice note transcription (Whisper AI)","2-hour hiring follow-up automation","5,000 conversations / month","VPS server included","Google Sheets + Gmail integration","Multi-language support","Smart fallback & escalation rules"] },
      { name:"Growth Suite", tier:"Pro", price:"Rs. 35,000", per:"/mo", setup:"Rs. 54,000", setupNote:"One-Time Setup Fee", year:"~Rs. 420,000/year", features:["Everything in Standard","Instagram DM automation","Facebook Messenger integration","Unified multi-platform inbox log","1,000 conv/platform (3,000 total)","AI-powered CV analyzer","Best-match candidate filter","Monthly performance report","Priority support"] },
    ]},
  { id:"webdev", icon:"🌐", label:"Website Development", tagline:"Custom websites that convert visitors into clients",
    desc:"Fast, mobile-responsive, SEO-optimized websites. From landing pages to full e-commerce stores.", type:"web",
    packages:[
      { name:"Starter", tier:"Basic", price:"Rs. 10,000", per:"/project", year:"❌ Domain & Hosting NOT included", service:["4–6 page service-based website","CTA: WhatsApp button only","WhatsApp chatbot included","Query form + Google Map + Reviews"], ecom:["4 pages","10 product listings","WhatsApp button CTA"] },
      { name:"Standard", tier:"Standard", featured:true, price:"Rs. 28,000", per:"/project", year:"❌ Domain & Hosting NOT included", service:["4–10 page website","Appointment booking system","WhatsApp chatbot included","Google Map & Reviews integration","Mobile responsive"], ecom:["4–10 pages, 20 products, 5 categories","Add-to-cart + Cash on Delivery","Payment Gateway: Optional (+Rs. 5,000)"] },
      { name:"Premium / Pro", tier:"Pro", price:"Rs. 52,000", per:"/project", year:"❌ Domain & Hosting NOT included", service:["6–15 page fully custom website","Appointment booking + calendar","AI chatbot + Google Sheets CRM","Meta Pixel + Google indexing","Core Web Vitals optimization"], ecom:["6–15 pages, 50 products","Full payment: Stripe, PayPal, QR, Bank","Checkout + inventory + customer accounts"] },
    ]},
  { id:"smm", icon:"📱", label:"Social Media Marketing", tagline:"Fixed packages or build your own custom plan", desc:"Choose a ready-made package or customize your own — select platforms, posts, reels, and ad campaigns. Price updates live.", type:"smm" },
  { id:"seo", icon:"🔍", label:"SEO", tagline:"Rank higher on Google and get organic leads daily", desc:"Data-driven SEO — on-page, technical, keywords, backlinks, and monthly reporting.", type:"packages",
    packages:[
      { name:"Local SEO", tier:"Basic", price:"Rs. 15,000", per:"/mo", year:"~Rs. 180,000/year", features:["10 target keywords","On-page SEO optimization","Google Business Profile setup","Local citation building","Monthly ranking report","Competitor keyword analysis"] },
      { name:"Growth SEO", tier:"Standard", featured:true, price:"Rs. 28,000", per:"/mo", year:"~Rs. 336,000/year", features:["25 target keywords","Full on-page + technical SEO","Backlink building (10/month)","Blog content (2 articles/month)","Core Web Vitals optimization","Monthly SEO audit report"] },
      { name:"Authority SEO", tier:"Pro", price:"Rs. 50,000", per:"/mo", year:"~Rs. 600,000/year", features:["50+ target keywords","Advanced technical SEO","Backlink building (25/month)","Blog content (4 articles/month)","Weekly ranking updates","Dedicated SEO strategist"] },
    ]},
  { id:"googleads", icon:"📢", label:"Google Ads", tagline:"Paid ads that bring paying customers, not just clicks", desc:"High-converting Google Ads — Search, Display, Remarketing — optimized for maximum ROI.", type:"packages",
    packages:[
      { name:"Launch Ads", tier:"Basic", price:"Rs. 15,000", per:"/mo", year:"+ your ad budget", features:["Google Search Ads setup","Up to 2 ad campaigns","Keyword research & bidding","Ad copywriting","Conversion tracking setup","Monthly performance report"] },
      { name:"Scale Ads", tier:"Standard", featured:true, price:"Rs. 25,000", per:"/mo", year:"+ your ad budget", features:["Search + Display campaigns","Up to 5 ad campaigns","A/B ad copy testing","Remarketing / retargeting","Bi-weekly optimization","Monthly ROI report"] },
      { name:"Full Funnel Ads", tier:"Pro", price:"Rs. 40,000", per:"/mo", year:"+ your ad budget", features:["Search + Display + Shopping","Unlimited campaigns","YouTube video ads","Smart bidding strategies","Custom reporting dashboard","Dedicated ads manager"] },
    ]},
  { id:"growth", icon:"🚀", label:"Growth Combo", tagline:"Everything in one complete digital growth bundle", desc:"Website + SEO + Social Media + Google Ads + AI Chatbot — one growth engine, one invoice.", type:"packages",
    packages:[
      { name:"Starter Combo", tier:"Basic", price:"Rs. 45,000", per:"/mo", note:"Save 20% vs individual", year:"~Rs. 540,000/year", features:["5-page website","Social media (1 platform, 12 posts)","Basic SEO (10 keywords)","WhatsApp chatbot (Basic plan)","Monthly report"] },
      { name:"Business Combo", tier:"Standard", featured:true, price:"Rs. 80,000", per:"/mo", note:"Save 25% vs individual", year:"~Rs. 960,000/year", features:["10-page custom website","Social media (2 platforms, 20 posts)","Growth SEO (25 keywords)","Google Ads management","WhatsApp chatbot (Standard plan)","Bi-weekly strategy call"] },
      { name:"Ultimate Combo", tier:"Pro", price:"Rs. 130,000", per:"/mo", note:"Save 30% vs individual", year:"~Rs. 1,560,000/year", features:["Full custom website","Social media (3 platforms, 30 posts)","Authority SEO (50+ keywords)","Full funnel Google Ads","WhatsApp + Instagram + Facebook bot","Dedicated account manager"] },
    ]},
  { id:"calling", icon:"📞", label:"Calling Agent", tagline:"AI voice calling agent for lead follow-up & outreach", desc:"AI-powered calling — follow-ups, qualifying, confirming appointments — all automated.", type:"packages",
    packages:[
      { name:"Basic Caller", tier:"Basic", price:"Rs. 18,000", per:"/mo", setup:"Rs. 20,000", setupNote:"One-Time Setup Fee", year:"~Rs. 216,000/year", features:["AI outbound calling setup","500 calls per month","Lead follow-up automation","Call outcome logging","Gmail summary per call","n8n workflow included"] },
      { name:"Smart Caller", tier:"Standard", featured:true, price:"Rs. 30,000", per:"/mo", setup:"Rs. 35,000", setupNote:"One-Time Setup Fee", year:"~Rs. 360,000/year", features:["Everything in Basic","1,500 calls per month","Inbound + outbound calling","Appointment booking via call","CRM / Sheets integration","Call transcript logging"] },
      { name:"Enterprise Caller", tier:"Pro", price:"Rs. 50,000", per:"/mo", setup:"Rs. 55,000", setupNote:"One-Time Setup Fee", year:"~Rs. 600,000/year", features:["Everything in Standard","Unlimited calls","Multi-language support","WhatsApp + Call combined flow","A/B script testing","Monthly performance report"] },
    ]},
  { id:"leadgen", icon:"🎯", label:"Lead Generation", tagline:"Targeted lead lists and B2B outreach", desc:"Verified leads via data scraping, LinkedIn outreach, cold email, and WhatsApp campaigns.", type:"leadgen",
    packages:[
      { name:"Starter Leads", tier:"Basic", price:"Rs. 20,000", per:"/mo", year:"~Rs. 240,000/year", features:["100 verified leads/month","Target by industry & location","Name, email, phone included","Google Sheet delivery","Basic email outreach (50/month)","Monthly lead report"] },
      { name:"Growth Leads", tier:"Standard", featured:true, price:"Rs. 35,000", per:"/mo", year:"~Rs. 420,000/year", features:["300 verified leads/month","Cold email sequence (3-step)","WhatsApp outreach automation","LinkedIn connection campaign","Lead scoring & prioritization","Monthly conversion report"] },
      { name:"Enterprise Leads", tier:"Pro", price:"Rs. 60,000", per:"/mo", year:"~Rs. 720,000/year", features:["700+ verified leads/month","Multi-channel outreach","WhatsApp + LinkedIn + Cold call","Lead nurturing automation","A/B tested messaging","Dedicated lead strategist"] },
    ]},
  { id:"video", icon:"🎬", label:"AI Video Creation", tagline:"AI-generated or edited videos — build your package", desc:"Choose AI commercial videos or reel editing. Mix both and see your monthly price live.", type:"video" },
];

// ── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <div className="footer">
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ fontSize:15, fontWeight:800, marginBottom:6 }}>Curve Tech Solution</div>
        <div style={{ fontSize:13, color:"#93c5fd", marginBottom:16 }}>AI-Powered Digital Services for Modern Businesses</div>
        <a href={SITE} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, background:`linear-gradient(90deg,${B.s},${B.m})`, color:"#fff", borderRadius:12, padding:"10px 24px", fontWeight:700, fontSize:14, textDecoration:"none", marginBottom:16, boxShadow:"0 4px 14px rgba(14,165,233,.4)" }}>
          🌐 Visit curvetechsolution.online →
        </a>
        <div className="footer-links">
          <a href={waLink()} target="_blank" rel="noopener noreferrer">💬 WhatsApp: 03316310490</a>
          <span>·</span>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer">📅 Book a Meeting</a>
          <span>·</span>
          <a href={SITE} target="_blank" rel="noopener noreferrer">curvetechsolution.online</a>
        </div>
      </div>
    </div>
  );
}

// ── Service Detail Page ──────────────────────────────────────────
function ServiceDetail({ svc, onBack, onOther }) {
  const [vis, setVis] = useState(false);
  const [showOthers, setShowOthers] = useState(false);
  const color = svcColor(svc.id);
  const others = SERVICES.filter(s => s.id !== svc.id);
  useEffect(() => { setTimeout(() => setVis(true), 40); }, []);
  useEffect(() => { window.location.hash = svc.id; return () => { window.location.hash = ""; }; }, [svc.id]);

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", display:"flex", flexDirection:"column" }}>
      <div className="detail-nav">
        <button onClick={onBack} style={{ background:"#f1f5f9", border:"1.5px solid #e2e8f0", color:"#0f172a", borderRadius:8, padding:"7px 14px", cursor:"pointer", fontSize:13, fontWeight:600, flexShrink:0 }}>← All</button>
        <span style={{ fontSize:20 }}>{svc.icon}</span>
        <span className="detail-nav-title">{svc.label}</span>
        <button onClick={()=>setShowOthers(!showOthers)} style={{ background:showOthers?color:"#f1f5f9", color:showOthers?"#fff":"#475569", border:"none", borderRadius:8, padding:"7px 12px", cursor:"pointer", fontSize:12, fontWeight:600, flexShrink:0, transition:"all .2s" }}>🔍 Other</button>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ background:"#25d366", color:"#fff", borderRadius:10, padding:"8px 14px", fontWeight:700, fontSize:13, textDecoration:"none", flexShrink:0 }}>💬 WhatsApp</a>
      </div>
      {showOthers && (
        <div style={{ background:"#fff", borderBottom:"1px solid #e8edf2", padding:"12px 16px", boxShadow:"0 4px 16px rgba(0,0,0,.06)" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:8 }}>
            {others.map(s => (
              <button key={s.id} onClick={()=>{ onOther(s.id); setShowOthers(false); }} style={{ display:"flex", alignItems:"center", gap:7, background:B.p, border:`1.5px solid ${B.mid}`, borderRadius:10, padding:"7px 12px", cursor:"pointer", fontSize:13, fontWeight:600, color:B.m, transition:"all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=B.s;e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor=B.s;}}
                onMouseLeave={e=>{e.currentTarget.style.background=B.p;e.currentTarget.style.color=B.m;e.currentTarget.style.borderColor=B.mid;}}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"clamp(24px,5vw,40px) 24px", flex:1, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:36, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:"all .5s ease" }}>
          <div style={{ width:60, height:60, borderRadius:18, background:B.l, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 14px" }}>{svc.icon}</div>
          <div style={{ display:"inline-block", background:B.l, color:B.m, fontSize:11, fontWeight:700, padding:"5px 18px", borderRadius:99, marginBottom:14, textTransform:"uppercase", letterSpacing:".08em" }}>Service Overview</div>
          <h1 style={{ fontSize:"clamp(20px,4vw,32px)", fontWeight:900, color:"#0f172a", marginBottom:10, lineHeight:1.2 }}>{svc.label}</h1>
          <p style={{ fontSize:15, color, fontWeight:600, marginBottom:10 }}>{svc.tagline}</p>
          <p style={{ fontSize:14, color:"#64748b", maxWidth:540, margin:"0 auto", lineHeight:1.8 }}>{svc.desc}</p>
        </div>
        <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(16px)", transition:"all .5s ease .15s" }}>
          {svc.type === "smm" && <SMMService color={color} />}
          {svc.type === "video" && <VideoService color={color} />}
          {svc.type === "leadgen" && <LeadGenService color={color} />}
          {svc.type === "web" && <WebSection packages={svc.packages} color={color} />}
          {svc.type === "packages" && (
            <>
              <div style={{ textAlign:"center", marginBottom:26 }}>
                <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a", marginBottom:6 }}>Choose Your Plan</h2>
                <p style={{ color:"#94a3b8", fontSize:13 }}>Transparent pricing · No hidden fees · Cancel anytime after 3 months</p>
              </div>
              <div className="pkg-grid">
                {svc.packages.map((pkg,i) => <PkgCard key={i} pkg={pkg} color={color} />)}
              </div>
            </>
          )}
        </div>
        <div style={{ background:`linear-gradient(135deg,${B.p},#fff)`, border:`1.5px solid ${B.mid}`, borderRadius:20, padding:"28px 20px", textAlign:"center", marginTop:24 }}>
          <h3 style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:8 }}>Have a question or want something custom?</h3>
          <p style={{ color:"#64748b", fontSize:14, maxWidth:420, margin:"0 auto 20px" }}>Message us on WhatsApp or book a free strategy call.</p>
          <div className="cta-btns">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="cta-btn-wa">💬 WhatsApp</a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="cta-btn-cal">📅 Book Free Meeting</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    setTimeout(() => setVis(true), 60);
    const hash = window.location.hash.replace("#","");
    if (hash && SERVICES.find(s => s.id===hash)) setActive(hash);
  }, []);

  if (active) {
    const svc = SERVICES.find(s => s.id===active);
    if (!svc) { setActive(null); return null; }
    return (
      <>
        <GlobalStyles />
        <ServiceDetail svc={svc} onBack={()=>{ setActive(null); window.location.hash=""; }} onOther={id=>setActive(id)} />
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="wa-float" title="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight:"100vh", background:"#f8fafc", display:"flex", flexDirection:"column" }}>
        <div className="topbar">
          🚀 AI-Powered Digital Services &nbsp;·&nbsp;
          <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp for custom quote →</a>
        </div>
        <nav className="navbar">
          <img src="/logo.png" alt="Curve Tech Solution" className="navbar-logo" />
          <div className="navbar-actions">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-meeting">📅 Book Meeting</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-wa">💬 WhatsApp</a>
          </div>
        </nav>
        <div className={`hero ${vis?"visible":""}`} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:"all .6s ease" }}>
          <div className="badge-pill">All Services</div>
          <h1>
            Smart Digital Solutions<br />
            <span style={{ background:`linear-gradient(90deg,${B.d},${B.s})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>for Modern Businesses</span>
          </h1>
          <p>Choose a service to view packages and pricing. All customized to your needs.</p>
        </div>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px 14px 32px", flex:1, width:"100%" }}>
          <div className="svc-grid">
            {SERVICES.map((svc,idx) => (
              <button key={svc.id} onClick={()=>setActive(svc.id)} className="svc-card"
                style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transitionDelay:`${idx*.04}s` }}>
                <div className="svc-icon">{svc.icon}</div>
                <div className="svc-label">{svc.label}</div>
                <div className="svc-tagline">{svc.tagline}</div>
                <div className="svc-cta">View Packages →</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop:36 }}>
            <div className="trust-bar">
              {["🔒 Secure & Confidential","⚡ Fast Delivery","📋 Contract Provided","💬 24/7 Support","🌍 Serving Worldwide"].map((t,i)=><span key={i}>{t}</span>)}
            </div>
            <div className="cta-block">
              <p>Want a custom package? Talk to us — we respond fast.</p>
              <div className="cta-btns">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="cta-btn-wa">💬 WhatsApp: 03316310490 </a>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="cta-btn-cal">📅 Book Free Meeting</a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className="wa-float" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  );
}

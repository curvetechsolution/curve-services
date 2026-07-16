import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

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
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
    body { font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif; background: #f8fafc; overflow-x: hidden; width: 100%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; letter-spacing: -0.011em; }
    html, body, #root { overflow-x: hidden; max-width: 100vw; }
    img { max-width: 100%; display: block; }
    button { font-family: inherit; }
    a { font-family: inherit; }
    input, select, textarea { font-size: 16px; font-family: inherit; }

    h1, h2, h3, .navbar-logo-text { font-family: 'Sora', 'Plus Jakarta Sans', system-ui, sans-serif; letter-spacing: -0.02em; }

    .topbar { background: linear-gradient(90deg,${B.d},${B.s}); text-align:center; padding:6px 16px; font-size:12px; font-weight:500; color:#fff; }
    .topbar a { color:#fff; font-weight:700; text-decoration:underline; }

    .navbar { background:#fff; border-bottom:1px solid #e8edf2; padding:6px 20px; display:flex; align-items:center; justify-content:space-between; box-shadow:0 2px 10px rgba(0,0,0,.04); position:sticky; top:0; z-index:200; gap:8px; }
    .navbar-logo { height:44px; object-fit:contain; max-width:40vw; }
    .navbar-actions { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
    .btn-meeting { background:${B.p}; color:${B.m}; border:1.5px solid ${B.mid}; border-radius:10px; padding:8px 14px; font-weight:700; font-size:13px; text-decoration:none; white-space:nowrap; }
    .btn-wa { background:#25d366; color:#fff; border-radius:10px; padding:9px 16px; font-weight:700; font-size:13px; text-decoration:none; white-space:nowrap; box-shadow:0 4px 14px rgba(37,211,102,.3); }

    .hero { text-align:center; padding:14px 16px 12px; background:linear-gradient(180deg,${B.l} 0%,#f8fafc 100%); }
    .hero h1 { font-size:clamp(18px,5.5vw,24px); font-weight:900; color:#0f172a; margin-bottom:6px; line-height:1.3; overflow-wrap:break-word; }
    .hero p { color:#64748b; font-size:clamp(12px,3.2vw,14px); max-width:500px; margin:0 auto; line-height:1.5; overflow-wrap:break-word; }
    .badge-pill { display:inline-block; background:linear-gradient(90deg,${B.d},${B.s}); color:#fff; font-size:10px; font-weight:700; padding:3px 12px; border-radius:99px; margin-bottom:8px; letter-spacing:.08em; text-transform:uppercase; box-shadow:0 3px 10px ${B.s}40; }

    .svc-grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; }
    .svc-card { background:#fff; border:1.5px solid #e8edf2; border-radius:14px; padding:16px 14px 14px; cursor:pointer; text-align:center; display:flex; flex-direction:column; align-items:center; gap:6px; box-shadow:0 2px 6px rgba(0,0,0,.04); transition:all .25s cubic-bezier(.4,0,.2,1); height:100%; min-width:0; }
    .svc-card:hover { border-color:${B.s}; transform:translateY(-3px); box-shadow:0 8px 22px ${B.s}22; }
    .svc-icon { width:44px; height:44px; border-radius:12px; background:${B.l}; display:flex; align-items:center; justify-content:center; font-size:22px; margin:0 auto; }
    .svc-label { font-family:'Sora','Plus Jakarta Sans',system-ui,sans-serif; font-weight:800; font-size:13px; color:#0f172a; line-height:1.3; overflow-wrap:break-word; }
    .svc-tagline { font-size:11px; color:#64748b; line-height:1.4; flex:1; }
    .svc-cta { background:${B.l}; color:${B.m}; font-size:10px; font-weight:700; padding:4px 12px; border-radius:99px; margin-top:auto; }

    .pkg-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
    .pkg-card { background:#fff; border-radius:16px; padding:1.1rem 1rem; display:flex; flex-direction:column; position:relative; transition:transform .25s,box-shadow .25s; min-width:0; }
    .pkg-card:hover { transform:translateY(-3px); }

    .trust-bar { display:flex; flex-wrap:wrap; justify-content:center; gap:6px 14px; color:#94a3b8; font-size:11px; margin-bottom:10px; }

    .cta-block { padding:14px 20px; background:#fff; border:1.5px solid #e8edf2; border-radius:14px; text-align:center; }
    .cta-block p { color:#64748b; font-size:13px; margin-bottom:10px; }
    .cta-btns { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
    .cta-btn-wa { display:inline-block; background:#25d366; color:#fff; border-radius:12px; padding:11px 22px; font-weight:700; font-size:14px; text-decoration:none; box-shadow:0 6px 18px rgba(37,211,102,.3); }
    .cta-btn-cal { display:inline-block; background:linear-gradient(90deg,${B.s},${B.m}); color:#fff; border-radius:12px; padding:11px 22px; font-weight:700; font-size:14px; text-decoration:none; box-shadow:0 6px 18px ${B.s}40; }

    .detail-nav { background:#fff; border-bottom:1px solid #e8edf2; padding:10px 12px; display:flex; align-items:center; gap:8px; position:sticky; top:0; z-index:100; box-shadow:0 2px 10px rgba(0,0,0,.05); flex-wrap:wrap; }
    .detail-nav-title { font-family:'Sora','Plus Jakarta Sans',system-ui,sans-serif; font-weight:800; font-size:15px; color:#0f172a; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

    .footer { background:#0c4a6e; color:#fff; padding:28px 20px; text-align:center; }
    .footer-links { display:flex; flex-wrap:wrap; justify-content:center; gap:12px 16px; font-size:12px; color:#7dd3fc; }
    .footer-links a { color:#7dd3fc; text-decoration:none; }

    .modal-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

    .custom-builder { display:grid; grid-template-columns:1fr min(300px,100%); gap:20px; align-items:start; }
    .summary-sticky { position:sticky; top:80px; }

    .video-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(min(280px,100%), 1fr)); gap:20px; margin-bottom:24px; }

    @media (max-width: 640px) {
      .navbar { padding:8px 10px; }
      .navbar-logo { height:38px; }
      .btn-meeting { display:none; }
      .btn-wa { padding:8px 12px; font-size:12px; }
      .svc-grid { grid-template-columns:repeat(2, 1fr); gap:10px; }
      .svc-card { padding:14px 6px; gap:6px; }
      .svc-icon { width:38px; height:38px; font-size:19px; }
      .svc-label { font-size:12px; }
      .svc-tagline { display:none; }
      .pkg-grid { grid-template-columns:1fr; gap:10px; }
      .web-cards-grid { grid-template-columns:1fr !important; }
      .custom-builder { grid-template-columns:1fr; }
      .summary-sticky { position:static; }
      .cta-btn-wa, .cta-btn-cal { font-size:13px; padding:10px 16px; width:100%; text-align:center; }
      .detail-nav { gap:6px; padding:8px 10px; }
      .detail-nav-title { font-size:13px; }
      .trust-bar { gap:8px 14px; font-size:11px; }
      .hero { padding:12px 12px 10px; }
    }

    @media (max-width: 400px) {
      .svc-grid { grid-template-columns:repeat(2, 1fr); }
      .topbar { font-size:10px; padding:6px 8px; }
      .navbar { padding:6px 8px; }
      .navbar-logo { height:32px; }
      .btn-wa { padding:7px 10px; font-size:11px; }
      .detail-nav { padding:7px 8px; gap:5px; }
      .detail-nav-title { font-size:12px; }
    }

    @media (min-width: 641px) and (max-width: 900px) {
      .svc-grid { grid-template-columns:repeat(3, 1fr); gap:8px; }
      .pkg-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
      .web-cards-grid { grid-template-columns:repeat(2,1fr) !important; }
      .custom-builder { grid-template-columns:1fr; }
      .summary-sticky { position:static; }
    }
    @media (min-width: 901px) {
      .pkg-grid { grid-template-columns:repeat(3,1fr); }
      .web-cards-grid { grid-template-columns:repeat(3,1fr) !important; }
    }

    .fade-in { opacity:0; transform:translateY(20px); transition:all .6s ease; }
    .fade-in.visible { opacity:1; transform:translateY(0); }
    .fade-delay-1 { transition-delay:.08s; }
    .fade-delay-2 { transition-delay:.16s; }

    .wa-float { position:fixed; bottom:24px; right:20px; z-index:9999; width:60px; height:60px; border-radius:50%; background:#25d366; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 24px rgba(37,211,102,.5); cursor:pointer; text-decoration:none; transition:transform .2s,box-shadow .2s; animation:waPulse 2.5s infinite; }
    .wa-float:hover { transform:scale(1.12); box-shadow:0 10px 32px rgba(37,211,102,.6); }
    .wa-float svg { width:34px; height:34px; fill:#fff; }
    @keyframes waPulse { 0%,100%{box-shadow:0 6px 24px rgba(37,211,102,.5),0 0 0 0 rgba(37,211,102,.4)} 60%{box-shadow:0 6px 24px rgba(37,211,102,.5),0 0 0 14px rgba(37,211,102,0)} }

    @media (max-width: 640px) {
      .wa-float { width:52px; height:52px; bottom:16px; right:14px; }
      .wa-float svg { width:28px; height:28px; }
    }

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

    .sticky-bar-inner { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 16px; }
    @media (max-width: 480px) {
      .sticky-bar-inner { padding:10px 12px; gap:8px; }
      .sticky-bar-inner .sb-price { font-size:18px !important; }
      .sticky-bar-inner .sb-btn { padding:11px 16px !important; font-size:13px !important; }
    }
  `}</style>
);

// ── Delivery Duration Options per service type ────────────────────
const DURATION_OPTS: Record<string, { label: string; value: string }[]> = {
  chatbot:   [{ label:"3 Days",  value:"3 days"  }, { label:"5 Days",  value:"5 days"  }, { label:"7 Days",  value:"7 days"  }, { label:"Custom", value:"custom" }],
  webdev:    [{ label:"5 Days",  value:"5 days"  }, { label:"10 Days", value:"10 days" }, { label:"15 Days", value:"15 days" }, { label:"30 Days", value:"30 days" }, { label:"Custom", value:"custom" }],
  calling:   [{ label:"3 Days",  value:"3 days"  }, { label:"7 Days",  value:"7 days"  }, { label:"1 Month", value:"1 month" }, { label:"Custom", value:"custom" }],
  video:     [{ label:"2 Days",  value:"2 days"  }, { label:"3 Days",  value:"3 days"  }, { label:"5 Days",  value:"5 days"  }, { label:"7 Days",  value:"7 days"  }, { label:"Custom", value:"custom" }],
  default:   [{ label:"3 Days",  value:"3 days"  }, { label:"7 Days",  value:"7 days"  }, { label:"14 Days", value:"14 days" }, { label:"30 Days", value:"30 days" }, { label:"Custom", value:"custom" }],
};

// Services jinki duration fixed hoti hai (monthly billing) — skip duration step
const SKIP_DURATION_SERVICES = ["smm", "seo", "googleads", "leadgen", "growth"];

// ── GetStarted Modal ──────────────────────────────────────────────
function GSModal({ open, onClose, name, price, serviceId = "", skipDuration = false, description = "" }) {
  const shouldSkip = skipDuration || SKIP_DURATION_SERVICES.includes(serviceId);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [duration, setDuration] = useState("");
  const [customDur, setCustomDur] = useState("");
  const [durStep, setDurStep] = useState(!shouldSkip);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (open) {
      setDurStep(!shouldSkip);
      setDuration("");
      setCustomDur("");
      setShowInvoiceForm(false);
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "" });
      setError("");
    }
  }, [open, shouldSkip]);

  const durOpts = DURATION_OPTS[serviceId] || DURATION_OPTS.default;

  if (!open) return null;

  const selectedDur = duration === "custom" ? (customDur || "Custom") : duration;
  const durReady = duration !== "" && (duration !== "custom" || customDur.trim() !== "");
  const msg = name ? `Hi! I'm interested in the *${name}* package${price ? ` (${price})` : ""}${selectedDur ? ` — Delivery: *${selectedDur}*` : ""}. Please share more details.` : "";

  const handleInvoiceRequest = async () => {
    if (!form.name || !form.phone) return;
    setLoading(true);
    setError("");
    try {
      // Generate unique ID (timestamp-based like existing rows)
      const uniqueId = String(Date.now());

      const payload = {
        id:           uniqueId,
        client_name:  form.name,
        client_email: form.email,
        client_phone: form.phone,
        service_name: selectedDur ? (name || "Unknown Service") + " · " + selectedDur : (name || "Unknown Service"),
        price:        String(price || ""),
        message:      description || "",
        status:       "pending",
        created_at:   new Date().toISOString(),
      };

      const res = await fetch(
        "https://dbyrmttpkeftcgcdneas.supabase.co/rest/v1/invoice_requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieXJtdHRwa2VmdGNnY2RuZWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NTY1NzcsImV4cCI6MjA5NjMzMjU3N30.ipTjwyyRakLK8Ac9n7TXh-5bQp3tXlOsktcs6bE5mxI",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieXJtdHRwa2VmdGNnY2RuZWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NTY1NzcsImV4cCI6MjA5NjMzMjU3N30.ipTjwyyRakLK8Ac9n7TXh-5bQp3tXlOsktcs6bE5mxI",
            "Prefer": "return=minimal",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const errText = await res.text();
        throw new Error("Status " + res.status + ": " + errText);
      }

      // Bhi email notification curvetechsolution@gmail.com pe (FormSubmit — no backend needed)
      try {
        await fetch("https://formsubmit.co/ajax/curvetechsolution@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            _subject: "New Invoice Request — " + (name || "Unknown Service"),
            Client_Name: form.name,
            Client_Email: form.email,
            Client_Phone: form.phone,
            Service: selectedDur ? (name || "Unknown Service") + " · " + selectedDur : (name || "Unknown Service"),
            Price: String(price || ""),
            Message: description || "",
          }),
        });
      } catch (mailErr) {
        // Email fail hone par bhi request supabase me save ho chuki hai, isliye yahan sirf log karo
        console.error("Email notification failed:", mailErr);
      }

      setSubmitted(true);
    } catch (e: any) {
      console.error("Invoice request failed:", e?.message || e);
      setError("Error: " + (e?.message || "Unknown. Check console."));
    } finally {
      setLoading(false);
    }
  };

  const overlayStyle: React.CSSProperties = {
    position:"fixed", top:0, left:0, width:"100vw", height:"100vh",
    background:"rgba(15,23,42,0.45)", zIndex:9999,
    display:"flex", alignItems:"center", justifyContent:"center",
    padding:"16px", backdropFilter:"blur(2px)",
  };
  const boxStyle: React.CSSProperties = {
    background:"#ffffff", borderRadius:20, width:"100%", maxWidth:420,
    maxHeight:"90vh", overflowY:"auto", position:"relative",
    boxShadow:"0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
  };
  const headerStyle: React.CSSProperties = {
    background:`linear-gradient(135deg,${B.d} 0%,${B.s} 100%)`,
    borderRadius:"20px 20px 0 0", padding:"20px 20px 18px",
    position:"relative",
  };
  const bodyStyle: React.CSSProperties = { padding:"20px" };

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"11px 14px",
    border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:16,
    fontFamily:"inherit", boxSizing:"border-box" as const,
    outline:"none", transition:"border .2s",
    marginBottom:10,
  };

  const primaryBtn: React.CSSProperties = {
    width:"100%", padding:"13px",
    background:`linear-gradient(90deg,${B.d},${B.s})`,
    color:"#fff", border:"none", borderRadius:12,
    fontWeight:700, fontSize:14, cursor:"pointer",
    letterSpacing:".02em", transition:"opacity .2s",
  };

  const closeBtn: React.CSSProperties = {
    position:"absolute", top:14, right:14,
    background:"rgba(255,255,255,0.18)", border:"none",
    borderRadius:8, width:30, height:30,
    cursor:"pointer", fontSize:16, color:"#fff",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontWeight:700, lineHeight:1,
  };

  return createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={boxStyle} onClick={e=>e.stopPropagation()}>

        {/* ── Header ── */}
        <div style={headerStyle}>
          <button onClick={onClose} style={closeBtn}>✕</button>
          {submitted ? (
            <div style={{ textAlign:"center", paddingBottom:2 }}>
              <div style={{ fontSize:36, marginBottom:6 }}>✅</div>
              <div style={{ fontSize:17, fontWeight:800, color:"#fff" }}>Request Sent!</div>
            </div>
          ) : durStep ? (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.65)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:4 }}>Step 1 of 2</div>
              <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:2 }}>When do you need it?</div>
              {name && <div style={{ fontSize:12, color:"rgba(255,255,255,.75)", fontWeight:500 }}>{name}{price ? ` · ${price}` : ""}</div>}
            </div>
          ) : showInvoiceForm ? (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.65)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:4 }}>Invoice Request</div>
              <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:2 }}>{name || "Your Package"}</div>
              {price && <div style={{ fontSize:12, color:"rgba(255,255,255,.75)" }}>{price}{selectedDur ? ` · ${selectedDur}` : ""}</div>}
            </div>
          ) : (
            <div>
              {!shouldSkip && <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.65)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:4 }}>Step 2 of 2</div>}
              <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:2 }}>Let's Get Started 🚀</div>
              {name && <div style={{ fontSize:12, color:"rgba(255,255,255,.75)" }}>{name}{price ? ` · ${price}` : ""}</div>}
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div style={bodyStyle}>
          {submitted ? (
            <div style={{ textAlign:"center", padding:"8px 0 4px" }}>
              <p style={{ fontSize:14, color:"#64748b", lineHeight:1.7 }}>We'll review your request and send the invoice to your email shortly.</p>
            </div>

          ) : durStep ? (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                {durOpts.map(opt => (
                  <button key={opt.value} onClick={()=>setDuration(opt.value)}
                    style={{
                      padding:"11px 8px", borderRadius:10,
                      border:`2px solid ${duration===opt.value ? B.s : "#e8edf2"}`,
                      background:duration===opt.value ? `${B.s}12` : "#f8fafc",
                      color:duration===opt.value ? B.m : "#475569",
                      fontWeight:700, fontSize:13, cursor:"pointer",
                      transition:"all .18s", textAlign:"center",
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
              {duration === "custom" && (
                <input
                  placeholder="e.g. 2 weeks, ASAP, 45 days..."
                  value={customDur}
                  onChange={e=>setCustomDur(e.target.value)}
                  style={{ ...inputStyle, marginBottom:14 }}
                  autoFocus
                />
              )}
              <button onClick={()=>setDurStep(false)} disabled={!durReady}
                style={{ ...primaryBtn, opacity:durReady?1:0.45, cursor:durReady?"pointer":"not-allowed" }}>
                Continue →
              </button>
            </div>

          ) : showInvoiceForm ? (
            <div>
              {!shouldSkip && selectedDur && (
                <div style={{ background:`${B.l}`, border:`1px solid ${B.mid}`, borderRadius:10, padding:"10px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:14 }}>⏱️</span>
                  <span style={{ fontSize:13, color:B.m, fontWeight:600 }}>Delivery: {selectedDur}</span>
                </div>
              )}
              <input
                placeholder="Your Full Name *"
                value={form.name}
                onChange={e=>setForm({...form, name:e.target.value})}
                style={inputStyle}
              />
              <input
                placeholder="Email Address (Optional)"
                type="email"
                value={form.email}
                onChange={e=>setForm({...form, email:e.target.value})}
                style={inputStyle}
              />
              <input
                placeholder="Phone Number *"
                type="tel"
                value={form.phone}
                onChange={e=>setForm({...form, phone:e.target.value})}
                style={{ ...inputStyle, marginBottom:14 }}
              />
              {error && (
                <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"8px 12px", marginBottom:12, fontSize:13, color:"#dc2626" }}>
                  ⚠ {error}
                </div>
              )}
              <button onClick={handleInvoiceRequest} disabled={loading}
                style={{ ...primaryBtn, opacity:loading?0.65:1, cursor:loading?"not-allowed":"pointer", marginBottom:8 }}>
                {loading ? "Submitting..." : "Submit Request →"}
              </button>
              <button onClick={()=>setShowInvoiceForm(false)}
                style={{ width:"100%", padding:"10px", background:"transparent", color:"#64748b", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:13, cursor:"pointer", fontWeight:600 }}>
                ← Back
              </button>
            </div>

          ) : (
            <div>
              {/* Show delivery badge only if duration was selected (non-skipped services) */}
              {!shouldSkip && selectedDur && (
                <div style={{ background:`${B.l}`, border:`1px solid ${B.mid}`, borderRadius:10, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:14 }}>⏱️</span>
                    <span style={{ fontSize:13, color:B.m, fontWeight:600 }}>Delivery: {selectedDur}</span>
                  </div>
                  <button onClick={()=>setDurStep(true)} style={{ fontSize:12, color:B.s, background:"none", border:"none", cursor:"pointer", fontWeight:700, padding:0 }}>
                    Change
                  </button>
                </div>
              )}

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <a href={waLink(msg)} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, padding:"18px 12px", background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:14, textDecoration:"none", transition:"transform .15s" }}
                  onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-2px)")}
                  onMouseLeave={e=>(e.currentTarget.style.transform="translateY(0)")}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>💬</div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"#166534", marginBottom:2 }}>WhatsApp</div>
                    <div style={{ fontSize:11, color:"#4ade80", fontWeight:600 }}>● Online now</div>
                  </div>
                </a>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, padding:"18px 12px", background:B.p, border:`1.5px solid ${B.mid}`, borderRadius:14, textDecoration:"none", transition:"transform .15s" }}
                  onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-2px)")}
                  onMouseLeave={e=>(e.currentTarget.style.transform="translateY(0)")}>
                  <div style={{ width:44, height:44, borderRadius:12, background:`${B.l}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📅</div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:B.d, marginBottom:2 }}>Book Meeting</div>
                    <div style={{ fontSize:11, color:B.s, fontWeight:600 }}>Free 30-min call</div>
                  </div>
                </a>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ flex:1, height:"1px", background:"#e8edf2" }} />
                <span style={{ fontSize:11, color:"#94a3b8", fontWeight:600 }}>OR</span>
                <div style={{ flex:1, height:"1px", background:"#e8edf2" }} />
              </div>

              <button onClick={()=>setShowInvoiceForm(true)}
                style={{ width:"100%", padding:"12px", background:"transparent", color:B.d, border:`2px solid ${B.d}`, borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all .2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=B.d; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=B.d; }}>
                🧾 Request Invoice
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
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
    <div style={{ background:`${color}10`, border:`1px solid ${color}30`, borderRadius:9, padding:"7px 10px", marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ width:26, height:26, borderRadius:7, background:`${color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, flexShrink:0 }}>🔑</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:9, fontWeight:700, color:`${color}bb`, textTransform:"uppercase", letterSpacing:".06em" }}>{note}</div>
        <div style={{ fontSize:13, fontWeight:900, color }}>{setup}</div>
      </div>
      <div style={{ background:color, color:"#fff", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:5, flexShrink:0, whiteSpace:"nowrap" }}>1× Only</div>
    </div>
  );
}

// ── Sticky Get Started Bar ────────────────────────────────────────
function StickyBar({ price, label = "Get Started →", onClick, color, visible = true }) {
  if (!visible) return null;
  return createPortal(
    <div style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:8000,
      background:"#fff", borderTop:`2px solid ${color}30`,
      boxShadow:"0 -4px 24px rgba(0,0,0,0.10)",
    }}>
      <div className="sticky-bar-inner">
        <div style={{ minWidth:0 }}>
          <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600 }}>Your Package Total</div>
          <div className="sb-price" style={{ fontSize:22, fontWeight:900, color, lineHeight:1, overflowWrap:"break-word" }}>{price}</div>
        </div>
        <button className="sb-btn" onClick={onClick} style={{
          background:`linear-gradient(90deg,${color},${color}cc)`,
          color:"#fff", border:"none", borderRadius:12,
          padding:"13px 28px", fontSize:15, fontWeight:700,
          cursor:"pointer", boxShadow:`0 4px 16px ${color}40`,
          whiteSpace:"nowrap", flexShrink:0,
        }}>
          {label}
        </button>
      </div>
    </div>,
    document.body
  );
}

// ── GSButton ─────────────────────────────────────────────────────
function GSBtn({ color, featured, name, price, serviceId = "", description = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GSModal open={open} onClose={()=>setOpen(false)} name={name} price={price} serviceId={serviceId} description={description} />
      <button onClick={()=>setOpen(true)}
        style={{ display:"block", width:"100%", marginTop:10, textAlign:"center", padding:"9px 14px", background:featured?`linear-gradient(90deg,${color},${color}cc)`:"transparent", color:featured?"#fff":color, border:`2px solid ${color}`, borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer", transition:"all .2s", boxShadow:featured?`0 3px 12px ${color}40`:"none" }}
        onMouseEnter={e=>{if(!featured){e.currentTarget.style.background=color;e.currentTarget.style.color="#fff";}}}
        onMouseLeave={e=>{if(!featured){e.currentTarget.style.background="transparent";e.currentTarget.style.color=color;}}}>
        Get Started →
      </button>
    </>
  );
}


// ── Collapsible Feature List ──────────────────────────────────────
// Shared desktop sync context
const FeatureOpenCtx = React.createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(null);

function FeatureList({ features = [], warnings = [], color, defaultOpen = false }) {
  const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 641px)").matches;
  const ctx = React.useContext(FeatureOpenCtx);
  const [localOpen, setLocalOpen] = useState(defaultOpen);

  // Desktop: use shared ctx; Mobile: use local state
  const open = isDesktop && ctx ? ctx.open : localOpen;
  const setOpen = isDesktop && ctx ? ctx.setOpen : setLocalOpen;

  if (!features.length && !warnings.length) return null;
  return (
    <div style={{ flex:1, borderTop:"1px solid #f1f5f9", paddingTop:8 }}>
      <button
        onClick={()=>setOpen(!open)}
        style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", background:"none", border:"none", cursor:"pointer", padding:"4px 0 6px", marginBottom:open?6:0 }}>
        <span style={{ fontSize:12, fontWeight:700, color, display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ width:18, height:18, borderRadius:6, background:`${color}15`, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, transition:"transform .25s", transform:open?"rotate(90deg)":"rotate(0deg)" }}>▶</span>
          {open ? "Hide Details" : `Show ${features.length} Features`}
        </span>
        <span style={{ fontSize:10, color:"#94a3b8", fontWeight:600 }}>{open?"▲":"▼"}</span>
      </button>
      <div style={{ overflow:"hidden", maxHeight:open?"600px":"0", transition:"max-height .35s ease", opacity:open?1:0, transitionProperty:"max-height, opacity" }}>
        {features.map((f,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:6, marginBottom:5, fontSize:12, color:"#374151", lineHeight:1.4 }}>
            <span style={{ color, fontWeight:700, flexShrink:0, fontSize:11 }}>✓</span>{f}
          </div>
        ))}
        {warnings.map((w,i)=>(
          <div key={i} style={{ display:"flex", gap:6, marginTop:6, marginBottom:3, fontSize:11, color:"#d97706", fontWeight:600 }}>
            <span>⚠</span>{w}
          </div>
        ))}
      </div>
    </div>
  );
}

// Wrapper: desktop mein shared state provide karta hai, mobile mein sirf children render
function SyncedFeatureGroup({ children, color }) {
  const [open, setOpen] = useState(false);
  const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 641px)").matches;
  if (!isDesktop) return <>{children}</>;
  return (
    <FeatureOpenCtx.Provider value={{ open, setOpen }}>
      {children}
    </FeatureOpenCtx.Provider>
  );
}

// ── Package Card ─────────────────────────────────────────────────
function PkgCard({ pkg, color, serviceId = "" }) {
  return (
    <div className="pkg-card" style={{ border:pkg.featured?`2px solid ${color}`:"1.5px solid #e8edf2", boxShadow:pkg.featured?`0 6px 24px ${color}20`:"0 2px 8px rgba(0,0,0,.05)" }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 10px 28px ${color}22`;}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow=pkg.featured?`0 6px 24px ${color}20`:"0 2px 8px rgba(0,0,0,.05)";}}>
      {pkg.featured && <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${color},${color}bb)`, color:"#fff", fontSize:10, fontWeight:700, padding:"3px 14px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 3px 10px ${color}50` }}>⭐ Most Popular</div>}
      <div style={{ fontSize:10, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:3 }}>{pkg.tier}</div>
      <div style={{ fontSize:15, fontWeight:800, color:"#0f172a", marginBottom:3 }}>{pkg.name}</div>
      {pkg.note && <div style={{ fontSize:11, background:B.p, color:B.d, fontWeight:600, padding:"2px 8px", borderRadius:6, display:"inline-block", marginBottom:6 }}>{pkg.note}</div>}
      <div style={{ fontSize:pkg.customPrice?"18px":"22px", fontWeight:900, color, marginBottom:1 }}>{pkg.price}<span style={{ fontSize:11, fontWeight:400, color:"#94a3b8" }}>{pkg.per}</span></div>
      <div style={{ fontSize:11, color:"#94a3b8", marginBottom:pkg.setup?8:12 }}>{pkg.year}</div>
      <SetupBadge setup={pkg.setup} note={pkg.setupNote} color={color} />
      <FeatureList features={pkg.features||[]} warnings={pkg.warning||[]} color={color} />
      <GSBtn color={color} featured={pkg.featured} name={pkg.name} price={pkg.price+"/mo"} serviceId={serviceId} description={(pkg.features||[]).join("\n")} />
    </div>
  );
}

// ── Web Features ──────────────────────────────────────────────────
const WEB_FEATURES = {
  service: [
    { key:"pages",      icon:"📄", label:"Number of Pages",        type:"counter", min:0, max:20, default:0, basePrice:800,  unit:"page",  desc:"Each page (incl. 1st)" },
    { key:"whatsapp",   icon:"💬", label:"WhatsApp Button",         type:"toggle",  price:0,     desc:"CTA button linking to WhatsApp" },
    { key:"domainhosting", icon:"🌐", label:"Domain & Hosting (1 Year)", type:"toggle", price:10000, desc:"Custom domain + hosting setup, 1 year" },
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
    { key:"productdisplay", icon:"🖼️", label:"Product Display",      type:"toggle",  price:200,   desc:"Showcase products on your website" },
    { key:"mobile",     icon:"📱", label:"Mobile Responsive",        type:"toggle",  price:0,     desc:"Works on all screen sizes" },
  ],
  ecom: [
    { key:"pages",      icon:"📄", label:"Number of Pages",          type:"counter", min:0, max:20, default:0, basePrice:800,  unit:"page",  desc:"Each page (incl. 1st)" },
    { key:"products",   icon:"🛍️", label:"Product Listings",          type:"counter", min:0, max:100, default:0, basePrice:150, unit:"product", desc:"Per product listing" },
    { key:"categories", icon:"🗂️", label:"Product Categories",        type:"counter", min:0, max:20, default:0, basePrice:400,  unit:"cat",   desc:"Per product category" },
    { key:"whatsapp",   icon:"💬", label:"WhatsApp Button",           type:"toggle",  price:0,     desc:"CTA button linking to WhatsApp" },
    { key:"domainhosting", icon:"🌐", label:"Domain & Hosting (1 Year)", type:"toggle", price:10000, desc:"Custom domain + hosting setup, 1 year" },
    { key:"cart",       icon:"🛒", label:"Add to Cart + COD",         type:"toggle",  price:3000,  desc:"Cart system with cash on delivery" },
    { key:"payment",    icon:"💳", label:"Payment Gateway",           type:"toggle",  price:5000,  desc:"Online payments (card/bank)" },
    { key:"checkout",   icon:"✅", label:"Checkout System",           type:"toggle",  price:2000,  desc:"Full checkout + order management" },
    { key:"inventory",  icon:"📦", label:"Inventory Management",      type:"toggle",  price:3000,  desc:"Track stock levels automatically" },
    { key:"accounts",   icon:"👤", label:"Customer Accounts",         type:"toggle",  price:2500,  desc:"Login, orders, profile for customers" },
    { key:"googlemap",  icon:"📍", label:"Google Map Embed",          type:"toggle",  price:500,   desc:"Show your store location" },
    { key:"metapixel",  icon:"🎯", label:"Meta Pixel Setup",          type:"toggle",  price:1500,  desc:"Facebook/Instagram ad tracking" },
    { key:"mobile",     icon:"📱", label:"Mobile Responsive",         type:"toggle",  price:0,     desc:"Works on all screen sizes" },
  ]
};

const BASE_PRICE = { service: 0, ecom: 0 };

function WebPlanChooser({ color }) {
  const [gsOpen, setGsOpen] = useState(false);
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
    <div style={{ marginBottom:40, background:"#fff", borderRadius:24, padding:"20px 18px 100px", boxShadow:"0 4px 32px rgba(0,0,0,.07)", border:"1px solid #f0f4f8" }}>
      <div style={{ textAlign:"center", marginBottom:16 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${color}12`, borderRadius:99, padding:"6px 18px", marginBottom:10 }}>
          <span>✨</span>
          <span style={{ fontSize:12, fontWeight:700, color, letterSpacing:".06em", textTransform:"uppercase" }}>Build Your Own Plan</span>
        </div>
        <h2 style={{ fontSize:18, fontWeight:900, color:"#0f172a", margin:"0 0 4px" }}>Choose only what you need</h2>
        <p style={{ color:"#94a3b8", fontSize:13, margin:0 }}>Select features below — price updates live · Everything is optional, starts at Rs. 0</p>
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
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      {f.price > 0 && <span style={{ fontSize:12, fontWeight:700, color }}>{fmtPrice(f.price)}</span>}
                      {f.price === 0 && <span style={{ fontSize:11, fontWeight:700, color:"#94a3b8" }}>Free</span>}
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
          <div style={{ fontSize:11, color:"#ef4444", fontWeight:600, marginBottom:16 }}>❌ Nothing is included by default — toggle each feature you need above</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"6px 20px", marginBottom:18, minHeight:36 }}>
            {picked.length === 0 && <div style={{ color:"#94a3b8", fontSize:13 }}>No features selected yet</div>}
            {picked.map(f => (
              <div key={f.key} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12, color:"#374151", gap:8 }}>
                <span style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <span style={{ color, fontWeight:800 }}>✓</span>
                  <span>{f.icon} {f.label}{f.type==="counter" ? ` × ${sel[f.key]}` : ""}</span>
                </span>
                <span style={{ fontWeight:700, color, flexShrink:0, fontSize:11 }}>
                  {f.type==="counter" ? fmtPrice((sel[f.key]-f.min)*f.basePrice) : (f.price>0 ? fmtPrice(f.price) : "Free")}
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
          <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name={"Custom Website"} price={fmtPrice(total)} serviceId="webdev" description={picked.map(f => f.type==="counter" ? `${f.label} × ${sel[f.key]}` : f.label).join("\n")} />
          <StickyBar price={fmtPrice(total)} onClick={()=>setGsOpen(true)} color={color} visible={true} />
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
        <SyncedFeatureGroup color={color}>
          <div className="web-cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:40 }}>
            {packages.map((pkg,i) => <WebCard key={i} pkg={pkg} color={color} />)}
          </div>
        </SyncedFeatureGroup>
      )}
      {mode==="custom" && <WebPlanChooser color={color} />}
    </div>
  );
}

function WebCard({ pkg, color }) {
  const [tab, setTab] = useState("service");
  const [domainAddon, setDomainAddon] = useState(false);
  const basePrice = parseInt(pkg.price.replace(/[^0-9]/g, ""), 10) || 0;
  const displayPrice = "Rs. " + (basePrice + (domainAddon ? 10000 : 0)).toLocaleString();
  return (
    <div className="pkg-card" style={{ border:pkg.featured?`2px solid ${color}`:"1.5px solid #e8edf2", boxShadow:pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)" }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 14px 36px ${color}22`;}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow=pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)";}}>
      {pkg.featured && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${color},${color}bb)`, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 18px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 4px 12px ${color}50` }}>⭐ Most Popular</div>}
      <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:5 }}>{pkg.tier}</div>
      <div style={{ fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:6 }}>{pkg.name}</div>
      <div style={{ fontSize:26, fontWeight:900, color, marginBottom:2 }}>{displayPrice}<span style={{ fontSize:13, fontWeight:400, color:"#94a3b8" }}>{pkg.per}</span></div>
      <div style={{ fontSize:12, color:"#ef4444", fontWeight:600, marginBottom:10 }}>{pkg.year}</div>

      {/* Domain & Hosting Add-on toggle */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, background:domainAddon?`${color}10`:"#f8fafc", border:`1.5px solid ${domainAddon?color:"#e8edf2"}`, borderRadius:10, padding:"8px 10px", marginBottom:14, transition:"all .2s" }}>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:"#0f172a" }}>🌐 Domain & Hosting (1 Yr)</div>
          <div style={{ fontSize:11, color:"#94a3b8" }}>Optional add-on: +Rs. 10,000</div>
        </div>
        <button onClick={()=>setDomainAddon(d=>!d)} style={{ width:40, height:22, borderRadius:11, border:"none", cursor:"pointer", background:domainAddon?color:"#cbd5e1", transition:"all .2s", position:"relative", flexShrink:0 }}>
          <span style={{ position:"absolute", top:2, left:domainAddon?20:2, width:18, height:18, borderRadius:9, background:"#fff", transition:"all .2s", boxShadow:"0 1px 4px rgba(0,0,0,.2)" }} />
        </button>
      </div>

      <div style={{ display:"flex", background:"#f1f5f9", borderRadius:10, padding:4, marginBottom:14, gap:4 }}>
        {["service","ecom"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, background:tab===t?color:"transparent", color:tab===t?"#fff":"#64748b", transition:"all .2s" }}>
            {t==="service"?"🏢 Service":"🛒 E-Commerce"}
          </button>
        ))}
      </div>
      <div style={{ flex:1, borderTop:"1px solid #f1f5f9", paddingTop:12 }}>
        <FeatureList
          features={[...(tab==="service"?pkg.service:pkg.ecom), ...(domainAddon?["🌐 Domain & Hosting (1 Year) included"]:[])]}
          color={color}
        />
      </div>
      <GSBtn color={color} featured={pkg.featured} name={`${pkg.name} Website${domainAddon ? " + Domain & Hosting" : ""}`} price={displayPrice} serviceId="webdev" description={[...(tab==="service"?pkg.service:pkg.ecom), ...(domainAddon ? ["Domain & Hosting (1 Year) included"] : [])].join("\n")} />
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
  ];
  const [counts, setCounts] = useState<Record<string,number>>({ ai:0, reel:0, yt:0 });
  const [durations, setDurations] = useState<Record<string,number>>({ ai:30, reel:30, yt:30 });
  const [gsOpen, setGsOpen] = useState(false);
  const getPrice = (basePrice, secs) => Math.round(basePrice * Math.pow(1.5, (secs - BASE_SECS) / 30) / 100) * 100;
  const totalForType = (key) => { const vt = VIDEO_TYPES.find(v=>v.key===key); return counts[key] * getPrice(vt.basePrice, durations[key]); };
  const total = VIDEO_TYPES.reduce((s,vt) => s + totalForType(vt.key), 0);
  const totalVideos = Object.values(counts).reduce((a,b)=>a+b,0);
  const DURATION_OPTIONS = [30, 60, 90, 120];
  return (
    <div style={{ paddingBottom: totalVideos>0 ? 80 : 0 }}>
      <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name={`Video Package (${totalVideos} videos)`} price={total?fmtPKR(total)+"/mo":""} serviceId="video" description={VIDEO_TYPES.filter(vt=>counts[vt.key]>0).map(vt=>`${vt.label}: ${counts[vt.key]} × ${durations[vt.key]}s`).join("\n")} />
      <StickyBar price={total?fmtPKR(total)+"/mo":""} onClick={()=>setGsOpen(true)} color={color} visible={totalVideos>0} />
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a", marginBottom:6 }}>Build Your Video Package</h2>
        <p style={{ color:"#64748b", fontSize:14 }}>Choose video type, pick duration — price updates instantly. +50% per extra 30 seconds.</p>
      </div>
      <SyncedFeatureGroup color={color}>
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
              <FeatureList features={vt.feats} color={color} />
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
      </SyncedFeatureGroup>
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

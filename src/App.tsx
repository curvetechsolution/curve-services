import { useState, useEffect } from "react";

const CALENDLY = "https://calendly.com/curvetechsolution/book-a-meeting";
const WA_NO = "923239236099";
const SITE = "https://curvetechsolution.online";
const waLink = (msg = "") => `https://wa.me/${WA_NO}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
const fmtPKR = n => `Rs. ${Number(n).toLocaleString()}`;

const B = { s:"#0ea5e9", m:"#0369a1", d:"#0c4a6e", x:"#0284c7", q:"#075985", l:"#e0f2fe", p:"#f0f9ff", mid:"#bae6fd" };
const svcColor = id => ({ chatbot:B.s, webdev:B.m, smm:B.s, seo:B.d, googleads:B.x, growth:B.m, calling:B.q, leadgen:B.x, video:B.s }[id] || B.s);
const svcLight = () => B.l;

// ── GetStarted Modal ──────────────────────────────────────────────
function GSModal({ open, onClose, name, price }) {
  if (!open) return null;
  const msg = name ? `Hi! I'm interested in the *${name}* package${price ? ` (${price})` : ""}. Please share more details.` : "";
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.65)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:22, padding:"36px 28px", maxWidth:420, width:"100%", boxShadow:"0 24px 70px rgba(0,0,0,.22)", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:16, background:"#f1f5f9", border:"none", borderRadius:8, width:30, height:30, cursor:"pointer", fontSize:15, color:"#64748b", fontWeight:700 }}>✕</button>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:38, marginBottom:8 }}>🚀</div>
          <h3 style={{ fontSize:20, fontWeight:800, color:"#0f172a", marginBottom:6 }}>Let's Get Started</h3>
          {name && <p style={{ fontSize:13, color:B.s, fontWeight:600, margin:0 }}>{name}{price ? ` — ${price}` : ""}</p>}
          <p style={{ fontSize:13, color:"#64748b", marginTop:6 }}>Choose how you'd like to connect with us</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <a href={waLink(msg)} target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"18px 12px", background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:16, textDecoration:"none", transition:"all .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.background="#dcfce7"; e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#f0fdf4"; e.currentTarget.style.transform="translateY(0)";}}>
            <span style={{ fontSize:28 }}>💬</span>
            <span style={{ fontSize:14, fontWeight:700, color:"#166534" }}>WhatsApp Us</span>
            <span style={{ fontSize:11, color:"#64748b", textAlign:"center" }}>Instant reply during business hours</span>
          </a>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"18px 12px", background:B.p, border:`1.5px solid ${B.mid}`, borderRadius:16, textDecoration:"none", transition:"all .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.background=B.l; e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=B.p; e.currentTarget.style.transform="translateY(0)";}}>
            <span style={{ fontSize:28 }}>📅</span>
            <span style={{ fontSize:14, fontWeight:700, color:B.d }}>Book Free Meeting</span>
            <span style={{ fontSize:11, color:"#64748b", textAlign:"center" }}>30-min strategy call</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Counter ──────────────────────────────────────────────────────
function Ctr({ v, set, min=0, color=B.s, size=36 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", borderRadius:10, overflow:"hidden", border:`1.5px solid ${color}44`, background:"#fff" }}>
      <button onClick={()=>set(Math.max(min,v-1))} style={{ width:size, height:size, border:"none", background:"#f8fafc", cursor:"pointer", fontSize:18, color:"#64748b", fontWeight:700, fontFamily:"inherit" }}>−</button>
      <span style={{ minWidth:38, textAlign:"center", fontWeight:800, fontSize:16, color:"#0f172a" }}>{v}</span>
      <button onClick={()=>set(v+1)} style={{ width:size, height:size, border:"none", background:color, cursor:"pointer", fontSize:18, color:"#fff", fontWeight:700, fontFamily:"inherit" }}>+</button>
    </div>
  );
}

// ── Setup Badge ──────────────────────────────────────────────────
function SetupBadge({ setup, note, color }) {
  if (!setup) return null;
  return (
    <div style={{ background:`${color}10`, border:`1.5px solid ${color}35`, borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ width:36, height:36, borderRadius:9, background:`${color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>🔑</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:10, fontWeight:700, color:`${color}bb`, textTransform:"uppercase", letterSpacing:".06em" }}>{note}</div>
        <div style={{ fontSize:18, fontWeight:900, color }}>{setup}</div>
      </div>
      <div style={{ background:color, color:"#fff", fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:6, flexShrink:0 }}>1× Only</div>
    </div>
  );
}

// ── GSButton ─────────────────────────────────────────────────────
function GSBtn({ color, featured, name, price, full }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <GSModal open={open} onClose={()=>setOpen(false)} name={name} price={price} />
      <button onClick={()=>setOpen(true)}
        style={{ display:"block", width:full?"100%":"auto", marginTop:18, textAlign:"center", padding:"12px 20px", background:featured?`linear-gradient(90deg,${color},${color}cc)`:"transparent", color:featured?"#fff":color, border:`2px solid ${color}`, borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", transition:"all .2s", boxShadow:featured?`0 4px 16px ${color}40`:"none" }}
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
    <div style={{ background:"#fff", border:pkg.featured?`2px solid ${color}`:"1.5px solid #e8edf2", borderRadius:20, padding:"1.5rem", display:"flex", flexDirection:"column", position:"relative", boxShadow:pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)", transition:"transform .25s,box-shadow .25s" }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 14px 36px ${color}22`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)";}}>
      {pkg.featured && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${color},${color}bb)`, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 18px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 4px 12px ${color}50` }}>⭐ Most Popular</div>}
      <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:5 }}>{pkg.tier}</div>
      <div style={{ fontSize:19, fontWeight:800, color:"#0f172a", marginBottom:4 }}>{pkg.name}</div>
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
      <GSBtn color={color} featured={pkg.featured} name={pkg.name} price={pkg.price+"/mo"} full />
    </div>
  );
}

// ── Web Card ─────────────────────────────────────────────────────
function WebCard({ pkg, color }) {
  const [tab, setTab] = useState("service");
  return (
    <div style={{ background:"#fff", border:pkg.featured?`2px solid ${color}`:"1.5px solid #e8edf2", borderRadius:20, padding:"1.5rem", display:"flex", flexDirection:"column", position:"relative", boxShadow:pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)", transition:"transform .25s,box-shadow .25s" }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 14px 36px ${color}22`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=pkg.featured?`0 8px 32px ${color}20`:"0 2px 10px rgba(0,0,0,.05)";}}>
      {pkg.featured && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:`linear-gradient(90deg,${color},${color}bb)`, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 18px", borderRadius:99, whiteSpace:"nowrap", boxShadow:`0 4px 12px ${color}50` }}>⭐ Most Popular</div>}
      <div style={{ fontSize:11, fontWeight:700, color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:5 }}>{pkg.tier}</div>
      <div style={{ fontSize:19, fontWeight:800, color:"#0f172a", marginBottom:6 }}>{pkg.name}</div>
      <div style={{ fontSize:26, fontWeight:900, color, marginBottom:2 }}>{pkg.price}<span style={{ fontSize:13, fontWeight:400, color:"#94a3b8" }}>{pkg.per}</span></div>
      <div style={{ fontSize:12, color:"#ef4444", fontWeight:600, marginBottom:16 }}>{pkg.year}</div>
      <div style={{ display:"flex", background:"#f1f5f9", borderRadius:10, padding:4, marginBottom:14, gap:4 }}>
        {["service","ecom"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:600, background:tab===t?color:"transparent", color:tab===t?"#fff":"#64748b", transition:"all .2s", fontFamily:"inherit" }}>
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
      <GSBtn color={color} featured={pkg.featured} name={`${pkg.name} Website`} price={pkg.price} full />
    </div>
  );
}

// ── Video Service ─────────────────────────────────────────────────
function VideoService({ color }) {
  const [aiCount, setAi] = useState(0);
  const [edCount, setEd] = useState(0);
  const [gsOpen, setGsOpen] = useState(false);
  const AP=6000, EP=3500;
  const total = aiCount*AP + edCount*EP;
  const pkgs = [
    { key:"ai", label:"AI Commercial Video", price:AP, icon:"🎨", badge:"No Copyright Claim",
      feats:["30 second AI-generated video","Background music included","Smooth animations & transitions","Free royalty-free characters","Text overlays & visual effects","HD quality — ready to post"] },
    { key:"ed", label:"Reel / YouTube Shorts Editing", price:EP, icon:"✂️", badge:"Reels & Shorts",
      feats:["30 second professionally edited","Your footage or sourced clips","Reels / YouTube Shorts format","Precision cuts & transitions","Captions & text overlays","Music sync included"] },
  ];
  const counts = { ai:aiCount, ed:edCount };
  const setters = { ai:setAi, ed:setEd };
  const msgStr = () => {
    const lines = ["Hi! I want to order videos this month:"];
    if (aiCount) lines.push(`🎨 AI Videos: ${aiCount} × Rs. 6,000 = ${fmtPKR(aiCount*AP)}`);
    if (edCount) lines.push(`✂️ Editing Videos: ${edCount} × Rs. 3,500 = ${fmtPKR(edCount*EP)}`);
    lines.push(`\n💰 Total: ${fmtPKR(total)}/month\nPlease confirm!`);
    return lines.join("\n");
  };
  return (
    <div>
      <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name={`Video Package (${aiCount+edCount} videos)`} price={total?fmtPKR(total)+"/mo":""} />
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a", marginBottom:6 }}>Build Your Video Package</h2>
        <p style={{ color:"#64748b", fontSize:14 }}>Choose AI or editing — or mix both. Price updates instantly.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(280px,100%),1fr))", gap:20, marginBottom:24 }}>
        {pkgs.map(p=>{
          const cnt = counts[p.key];
          const setter = setters[p.key];
          return (
            <div key={p.key} style={{ background:"#fff", border:`1.5px solid ${cnt>0?color:"#e8edf2"}`, borderRadius:20, padding:"1.5rem", boxShadow:cnt>0?`0 6px 24px ${color}20`:"0 2px 10px rgba(0,0,0,.05)", transition:"all .25s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:B.l, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{p.icon}</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:"#0f172a" }}>{p.label}</div>
                  <span style={{ display:"inline-block", background:`${color}15`, color, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:99, marginTop:3 }}>{p.badge}</span>
                </div>
              </div>
              <div style={{ fontSize:28, fontWeight:900, color, marginBottom:14 }}>{fmtPKR(p.price)}<span style={{ fontSize:13, fontWeight:400, color:"#94a3b8" }}> / video</span></div>
              {p.feats.map((f,i)=>(
                <div key={i} style={{ display:"flex", gap:8, marginBottom:7, fontSize:13, color:"#374151" }}>
                  <span style={{ color, fontWeight:700, flexShrink:0 }}>✓</span>{f}
                </div>
              ))}
              <div style={{ marginTop:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ fontSize:13, color:"#64748b", fontWeight:500 }}>Videos this month:</div>
                <Ctr v={cnt} set={setter} color={color} />
              </div>
              {cnt>0 && (
                <div style={{ marginTop:10, padding:"8px 12px", background:`${color}10`, borderRadius:10, display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:"#64748b" }}>{cnt} video{cnt>1?"s":""}</span>
                  <span style={{ fontWeight:700, color }}>{fmtPKR(cnt*p.price)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {(aiCount+edCount)>0 ? (
        <div style={{ background:`linear-gradient(135deg,${B.p},#fff)`, border:`2px solid ${color}44`, borderRadius:20, padding:24, marginBottom:20 }}>
          <div style={{ fontWeight:700, fontSize:15, color:"#0f172a", marginBottom:12 }}>📋 Your Monthly Video Package</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
            {aiCount>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:14 }}><span style={{ color:"#64748b" }}>🎨 AI Videos ({aiCount})</span><span style={{ fontWeight:700, color }}>{fmtPKR(aiCount*AP)}</span></div>}
            {edCount>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:14 }}><span style={{ color:"#64748b" }}>✂️ Editing Videos ({edCount})</span><span style={{ fontWeight:700, color }}>{fmtPKR(edCount*EP)}</span></div>}
            <div style={{ borderTop:"1.5px solid #e8edf2", paddingTop:10, display:"flex", justifyContent:"space-between", fontSize:18, fontWeight:900 }}>
              <span style={{ color:"#0f172a" }}>Total / Month</span>
              <span style={{ color }}>{fmtPKR(total)}</span>
            </div>
          </div>
          <button onClick={()=>setGsOpen(true)} style={{ width:"100%", background:`linear-gradient(90deg,${color},${color}cc)`, color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 6px 18px ${color}40` }}>
            Get Started →
          </button>
        </div>
      ) : (
        <div style={{ background:"#f8fafc", border:"1.5px dashed #e2e8f0", borderRadius:16, padding:28, textAlign:"center" }}>
          <div style={{ fontSize:28, marginBottom:8 }}>👆</div>
          <div style={{ fontSize:14, color:"#94a3b8" }}>Add videos using the + buttons above to see your package total</div>
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
  { id:"yt", label:"YouTube Shorts", icon:"▶️" },
];

function SMMService({ color }) {
  const [mode, setMode] = useState("packages"); // "packages" | "custom"
  const [plats, setPlats] = useState(["fb","ig"]);
  const [posts, setPosts] = useState(8);
  const [aiReels, setAiReels] = useState(0);
  const [edReels, setEdReels] = useState(0);
  const [fbAds, setFbAds] = useState(0);
  const [ttAds, setTtAds] = useState(0);
  const [liAds, setLiAds] = useState(0);
  const [gsOpen, setGsOpen] = useState(false);
  const [gsPkg, setGsPkg] = useState(null);

  const PLAT_P=1500, POST_P=700, AIR_P=4000, EDR_P=2500, FB_AD=2000, TT_AD=2500, LI_AD=3000;
  const customTotal = plats.length*PLAT_P + posts*POST_P + aiReels*AIR_P + edReels*EDR_P + fbAds*FB_AD + ttAds*TT_AD + liAds*LI_AD;

  const fixedPkgs = [
    { name:"Starter Presence", tier:"Starter", price:"Rs 9,999", per:"/month", featured:false,
      features:["Platforms: Facebook + Instagram","6 Posts per month","1 Reel (20–30 sec)","3 Campaign optimizations","Basic page management","Captions & hashtags"],
      warning:["Sponsored ads budget NOT included","Recommended Ads Budget: PKR 10,000 (Client Paid)"] },
    { name:"Digital Growth", tier:"Standard", price:"Rs 19,999", per:"/month", featured:true,
      features:["Platforms: Facebook + Instagram","One Optional: LinkedIn or TikTok","12 Posts per month","2 Reels (30–45 sec)","Copywriting & caption hooks","Page management","3 Paid Campaigns (Awareness + Engagement + Retargeting)","Monthly growth report"],
      warning:["Boosting Budget: PKR 15,000–20,000 (Client Paid)"] },
    { name:"Brand Authority", tier:"Pro", price:"Rs 34,999", per:"/month", featured:false,
      features:["Platforms: Facebook, Instagram, LinkedIn, YouTube Shorts","25 Custom Posts per month","4 Reels (30–60 sec with overlays)","Content calendar","Competitor analysis","Bi-weekly growth consultation","4 Campaigns (Includes Conversion + Retargeting)"],
      warning:["Boosting Budget: PKR 30,000–50,000 (Client Paid)"] },
  ];

  const togPlat = id => setPlats(p => p.includes(id) ? p.length>1 ? p.filter(x=>x!==id) : p : [...p,id]);

  return (
    <div>
      <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name={gsPkg?.name} price={gsPkg?.price} />
      <div style={{ display:"flex", background:"#f1f5f9", borderRadius:12, padding:4, marginBottom:28, gap:4, maxWidth:360, margin:"0 auto 28px" }}>
        {[{k:"packages",l:"📦 Packages"},{k:"custom",l:"🛠 Make Custom"}].map(t=>(
          <button key={t.k} onClick={()=>setMode(t.k)} style={{ flex:1, padding:"9px 0", borderRadius:9, border:"none", cursor:"pointer", fontSize:13, fontWeight:700, background:mode===t.k?color:"transparent", color:mode===t.k?"#fff":"#64748b", transition:"all .2s", fontFamily:"inherit" }}>{t.l}</button>
        ))}
      </div>

      {mode==="packages" && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(250px,100%),1fr))", gap:20 }}>
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
              <button onClick={()=>{ setGsPkg(pkg); setGsOpen(true); }} style={{ display:"block", width:"100%", marginTop:18, textAlign:"center", padding:"12px 0", background:pkg.featured?`linear-gradient(90deg,${color},${color}cc)`:"transparent", color:pkg.featured?"#fff":color, border:`2px solid ${color}`, borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", transition:"all .2s" }}
                onMouseEnter={e=>{if(!pkg.featured){e.currentTarget.style.background=color;e.currentTarget.style.color="#fff";}}}
                onMouseLeave={e=>{if(!pkg.featured){e.currentTarget.style.background="transparent";e.currentTarget.style.color=color;}}}>
                Get Started →
              </button>
            </div>
          ))}
        </div>
      )}

      {mode==="custom" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr min(300px,100%)", gap:20, alignItems:"start" }}>
          <div>
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem", marginBottom:14 }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:4 }}>📱 Platforms <span style={{ fontSize:12, color:"#94a3b8", fontWeight:400 }}>— {fmtPKR(PLAT_P)}/platform/mo</span></div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:10 }}>
                {PLATS_DEF.map(p=>{
                  const sel=plats.includes(p.id);
                  return <button key={p.id} onClick={()=>togPlat(p.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 13px", borderRadius:10, border:`1.5px solid ${sel?color:"#e2e8f0"}`, background:sel?`${color}12`:"#fff", cursor:"pointer", fontSize:13, fontWeight:600, color:sel?color:"#64748b", transition:"all .2s", fontFamily:"inherit" }}>
                    {p.icon} {p.label} {sel&&<span style={{ background:color, color:"#fff", borderRadius:"50%", width:15, height:15, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>✓</span>}
                  </button>;
                })}
              </div>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem", marginBottom:14 }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:4 }}>📝 Graphic Posts <span style={{ fontSize:12, color:"#94a3b8", fontWeight:400 }}>— {fmtPKR(POST_P)}/post</span></div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10 }}>
                <span style={{ fontSize:13, color:"#475569" }}>Posts per month: <strong style={{ color:"#0f172a" }}>{posts}</strong></span>
                <Ctr v={posts} set={setPosts} min={0} color={color} />
              </div>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #e8edf2", borderRadius:16, padding:"1.2rem", marginBottom:14 }}>
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
                {[{label:"📘 Facebook Ads", v:fbAds, set:setFbAds, p:FB_AD},{label:"🎵 TikTok Ads", v:ttAds, set:setTtAds, p:TT_AD},{label:"💼 LinkedIn Ads", v:liAds, set:setLiAds, p:LI_AD}].map(a=>(
                  <div key={a.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", background:a.v>0?`${color}08`:"#f8fafc", borderRadius:10, border:`1px solid ${a.v>0?color+"44":"#e8edf2"}`, transition:"all .2s" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{a.label}</div>
                      <div style={{ fontSize:11, color:"#94a3b8" }}>{fmtPKR(a.p)}/campaign</div>
                    </div>
                    <Ctr v={a.v} set={a.set} color={color} size={30} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position:"sticky", top:80 }}>
            <div style={{ background:"#fff", border:`2px solid ${color}33`, borderRadius:18, padding:"1.4rem", boxShadow:`0 6px 24px ${color}15` }}>
              <div style={{ fontWeight:800, fontSize:16, color:"#0f172a", marginBottom:14 }}>💰 Package Summary</div>
              <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:14, fontSize:13 }}>
                <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>📱 Platforms ({plats.length})</span><span style={{ fontWeight:600 }}>{fmtPKR(plats.length*PLAT_P)}</span></div>
                <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>📝 Posts ({posts})</span><span style={{ fontWeight:600 }}>{fmtPKR(posts*POST_P)}</span></div>
                {aiReels>0 && <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>🎨 AI Reels ({aiReels})</span><span style={{ fontWeight:600 }}>{fmtPKR(aiReels*AIR_P)}</span></div>}
                {edReels>0 && <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>✂️ Edit Reels ({edReels})</span><span style={{ fontWeight:600 }}>{fmtPKR(edReels*EDR_P)}</span></div>}
                {fbAds>0 && <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>📘 FB Ads ({fbAds})</span><span style={{ fontWeight:600 }}>{fmtPKR(fbAds*FB_AD)}</span></div>}
                {ttAds>0 && <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>🎵 TikTok Ads ({ttAds})</span><span style={{ fontWeight:600 }}>{fmtPKR(ttAds*TT_AD)}</span></div>}
                {liAds>0 && <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#64748b" }}>💼 LinkedIn Ads ({liAds})</span><span style={{ fontWeight:600 }}>{fmtPKR(liAds*LI_AD)}</span></div>}
              </div>
              <div style={{ borderTop:"1.5px solid #e8edf2", paddingTop:10, marginBottom:14 }}>
                <div style={{ fontSize:11, color:"#94a3b8", marginBottom:3, textTransform:"uppercase", letterSpacing:".06em" }}>Monthly Total</div>
                <div style={{ fontSize:28, fontWeight:900, color }}>{fmtPKR(customTotal)}</div>
              </div>
              <div style={{ background:B.p, borderRadius:10, padding:"8px 12px", marginBottom:14, fontSize:11, color:"#64748b", lineHeight:1.6 }}>
                <strong style={{ color:"#0f172a" }}>Selected platforms:</strong> {plats.map(id=>PLATS_DEF.find(p=>p.id===id)?.label).join(", ")}
              </div>
              <button onClick={()=>setGsOpen(true)} style={{ width:"100%", background:`linear-gradient(90deg,${color},${color}cc)`, color:"#fff", border:"none", borderRadius:12, padding:"13px 0", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", boxShadow:`0 4px 16px ${color}40` }}>
                Get Started →
              </button>
              <GSModal open={gsOpen} onClose={()=>setGsOpen(false)} name="Custom Social Media Package" price={fmtPKR(customTotal)+"/mo"} />
            </div>
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
      { name:"Lead Magnet", tier:"Basic", price:"Rs. 12,000", per:"/mo", setup:"Rs. 22,000", setupNote:"One-Time Setup Fee", year:"~Rs. 144,000/year",
        features:["WhatsApp lead qualification bot","Pakistan vs international detection","Meta developer account setup","VPS server included","2 auto follow-ups (4h + 22h)","Google Sheets lead logging","Gmail notification per lead","1,000 conversations / month","Fallback + escalation logic"] },
      { name:"Smart Assistant", tier:"Standard", featured:true, price:"Rs. 22,000", per:"/mo", setup:"Rs. 36,000", setupNote:"One-Time Setup Fee", year:"~Rs. 264,000/year",
        features:["Everything in Basic","Hiring flow (6 role-specific forms)","Voice note transcription (Whisper AI)","2-hour hiring follow-up automation","5,000 conversations / month","VPS server included","Google Sheets + Gmail integration","Multi-language support","Smart fallback & escalation rules"] },
      { name:"Growth Suite", tier:"Pro", price:"Rs. 35,000", per:"/mo", setup:"Rs. 54,000", setupNote:"One-Time Setup Fee", year:"~Rs. 420,000/year",
        features:["Everything in Standard","Instagram DM automation","Facebook Messenger integration","Unified multi-platform inbox log","1,000 conv/platform (3,000 total)","AI-powered CV analyzer","Best-match candidate filter","Monthly performance report","Priority support"] },
    ]},
  { id:"webdev", icon:"🌐", label:"Website Development", tagline:"Custom websites that convert visitors into clients",
    desc:"Fast, mobile-responsive, SEO-optimized websites. From landing pages to full e-commerce stores.", type:"web",
    packages:[
      { name:"Starter", tier:"Basic", price:"Rs. 10,000", per:"/project", year:"❌ Domain & Hosting NOT included",
        service:["4–6 page service-based website","CTA: WhatsApp button only","WhatsApp chatbot included","Query form + Google Map + Reviews"], ecom:["4 pages","10 product listings","WhatsApp button CTA"] },
      { name:"Standard", tier:"Standard", featured:true, price:"Rs. 28,000", per:"/project", year:"❌ Domain & Hosting NOT included",
        service:["4–10 page website","Appointment booking system","WhatsApp chatbot included","Google Map & Reviews integration","Basic SEO + mobile responsive"], ecom:["4–10 pages, 20 products, 5 categories","Add-to-cart + Cash on Delivery","Payment Gateway: Optional (+Rs. 5,000)"] },
      { name:"Premium / Pro", tier:"Pro", price:"Rs. 52,000", per:"/project", year:"❌ Domain & Hosting NOT included",
        service:["6–15 page fully custom website","Appointment booking + calendar","AI chatbot + Google Sheets CRM","Meta Pixel + Google indexing","Advanced SEO + Core Web Vitals"], ecom:["6–15 pages, 50 products","Full payment: Stripe, PayPal, QR, Bank","Checkout + inventory + customer accounts"] },
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
  { id:"leadgen", icon:"🎯", label:"Lead Generation", tagline:"Targeted lead lists and B2B outreach", desc:"Verified leads via data scraping, LinkedIn outreach, cold email, and WhatsApp campaigns.", type:"packages",
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
    <div style={{ background:"#0c4a6e", color:"#fff", padding:"28px 20px", textAlign:"center" }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <div style={{ fontSize:15, fontWeight:800, marginBottom:6 }}>Curve Tech Solution</div>
        <div style={{ fontSize:13, color:"#93c5fd", marginBottom:16 }}>AI-Powered Digital Services for Modern Businesses</div>
        <a href={SITE} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, background:`linear-gradient(90deg,${B.s},${B.m})`, color:"#fff", borderRadius:12, padding:"10px 24px", fontWeight:700, fontSize:14, textDecoration:"none", marginBottom:16, boxShadow:"0 4px 14px rgba(14,165,233,.4)" }}>
          🌐 Visit curvetechsolution.online →
        </a>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16, fontSize:12, color:"#7dd3fc" }}>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ color:"#7dd3fc", textDecoration:"none" }}>💬 WhatsApp: 0323 923 6099</a>
          <span>·</span>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ color:"#7dd3fc", textDecoration:"none" }}>📅 Book a Meeting</a>
          <span>·</span>
          <a href={SITE} target="_blank" rel="noopener noreferrer" style={{ color:"#7dd3fc", textDecoration:"none" }}>curvetechsolution.online</a>
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
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"Inter,sans-serif", display:"flex", flexDirection:"column" }}>
      <div style={{ background:"#fff", borderBottom:"1px solid #e8edf2", padding:"12px 20px", display:"flex", alignItems:"center", gap:10, position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 10px rgba(0,0,0,.05)", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ background:"#f1f5f9", border:"1.5px solid #e2e8f0", color:"#0f172a", borderRadius:8, padding:"7px 14px", cursor:"pointer", fontSize:13, fontWeight:600, flexShrink:0, fontFamily:"inherit" }}>← All</button>
        <span style={{ fontSize:20 }}>{svc.icon}</span>
        <span style={{ fontWeight:800, fontSize:15, color:"#0f172a", flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{svc.label}</span>
        <button onClick={()=>setShowOthers(!showOthers)} style={{ background:showOthers?color:"#f1f5f9", color:showOthers?"#fff":"#475569", border:"none", borderRadius:8, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:600, flexShrink:0, transition:"all .2s", fontFamily:"inherit" }}>🔍 Other Services</button>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ background:"#25d366", color:"#fff", borderRadius:10, padding:"8px 16px", fontWeight:700, fontSize:13, textDecoration:"none", flexShrink:0 }}>💬 WhatsApp</a>
      </div>
      {showOthers && (
        <div style={{ background:"#fff", borderBottom:"1px solid #e8edf2", padding:"12px 20px", boxShadow:"0 4px 16px rgba(0,0,0,.06)" }}>
          <div style={{ maxWidth:960, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:8 }}>
            {others.map(s => (
              <button key={s.id} onClick={()=>{ onOther(s.id); setShowOthers(false); }} style={{ display:"flex", alignItems:"center", gap:7, background:B.p, border:`1.5px solid ${B.mid}`, borderRadius:10, padding:"7px 14px", cursor:"pointer", fontSize:13, fontWeight:600, color:B.m, transition:"all .2s", fontFamily:"inherit" }}
                onMouseEnter={e=>{e.currentTarget.style.background=B.s;e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor=B.s;}}
                onMouseLeave={e=>{e.currentTarget.style.background=B.p;e.currentTarget.style.color=B.m;e.currentTarget.style.borderColor=B.mid;}}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ maxWidth:960, margin:"0 auto", padding:"40px 16px", flex:1, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:40, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:"all .5s ease" }}>
          <div style={{ width:66, height:66, borderRadius:18, background:B.l, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, margin:"0 auto 14px" }}>{svc.icon}</div>
          <div style={{ display:"inline-block", background:B.l, color:B.m, fontSize:11, fontWeight:700, padding:"5px 18px", borderRadius:99, marginBottom:14, textTransform:"uppercase", letterSpacing:".08em" }}>Service Overview</div>
          <h1 style={{ fontSize:"clamp(22px,4vw,32px)", fontWeight:900, color:"#0f172a", marginBottom:10, lineHeight:1.2 }}>{svc.label}</h1>
          <p style={{ fontSize:15, color, fontWeight:600, marginBottom:10 }}>{svc.tagline}</p>
          <p style={{ fontSize:14, color:"#64748b", maxWidth:560, margin:"0 auto", lineHeight:1.8 }}>{svc.desc}</p>
        </div>

        <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(16px)", transition:"all .5s ease .15s" }}>
          {svc.type === "smm" && <SMMService color={color} />}
          {svc.type === "video" && <VideoService color={color} />}
          {svc.type === "web" && (
            <>
              <div style={{ textAlign:"center", marginBottom:26 }}>
                <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a", marginBottom:6 }}>Choose Your Plan</h2>
                <p style={{ color:"#94a3b8", fontSize:13 }}>Toggle between Service-based & E-Commerce details</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(270px,100%),1fr))", gap:20, marginBottom:40 }}>
                {svc.packages.map((pkg,i) => <WebCard key={i} pkg={pkg} color={color} />)}
              </div>
            </>
          )}
          {svc.type === "packages" && (
            <>
              <div style={{ textAlign:"center", marginBottom:26 }}>
                <h2 style={{ fontSize:22, fontWeight:900, color:"#0f172a", marginBottom:6 }}>Choose Your Plan</h2>
                <p style={{ color:"#94a3b8", fontSize:13 }}>Transparent pricing · No hidden fees · Cancel anytime after 3 months</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(270px,100%),1fr))", gap:20, marginBottom:40 }}>
                {svc.packages.map((pkg,i) => <PkgCard key={i} pkg={pkg} color={color} />)}
              </div>
            </>
          )}
        </div>

        <div style={{ background:`linear-gradient(135deg,${B.p},#fff)`, border:`1.5px solid ${B.mid}`, borderRadius:20, padding:"32px 24px", textAlign:"center", marginTop:24 }}>
          <h3 style={{ fontSize:19, fontWeight:800, color:"#0f172a", marginBottom:8 }}>Have a question or want something custom?</h3>
          <p style={{ color:"#64748b", fontSize:14, maxWidth:420, margin:"0 auto 20px" }}>Message us on WhatsApp or book a free strategy call.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", background:"#25d366", color:"#fff", borderRadius:12, padding:"12px 24px", fontWeight:700, fontSize:14, textDecoration:"none", boxShadow:"0 6px 18px rgba(37,211,102,.3)" }}>💬 WhatsApp</a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", background:`linear-gradient(90deg,${B.s},${B.m})`, color:"#fff", borderRadius:12, padding:"12px 24px", fontWeight:700, fontSize:14, textDecoration:"none", boxShadow:`0 6px 18px ${B.s}40` }}>📅 Book Free Meeting</a>
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
    return <ServiceDetail svc={svc} onBack={()=>{ setActive(null); window.location.hash=""; }} onOther={id=>setActive(id)} />;
  }

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", fontFamily:"Inter,sans-serif", display:"flex", flexDirection:"column" }}>
      <div style={{ background:`linear-gradient(90deg,${B.d},${B.s})`, textAlign:"center", padding:"9px 16px", fontSize:13, fontWeight:500, color:"#fff" }}>
        🚀 AI-Powered Digital Services &nbsp;·&nbsp;
        <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ color:"#fff", fontWeight:700, textDecoration:"underline" }}>WhatsApp for custom quote →</a>
      </div>

      <div style={{ background:"#fff", borderBottom:"1px solid #e8edf2", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 10px rgba(0,0,0,.04)" }}>
        <div style={{ display:"flex", alignItems:"center" }}>
          <img src="/logo.png" alt="Curve Tech Solution" style={{ height:60, objectFit:"contain" }} />
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ background:B.p, color:B.m, border:`1.5px solid ${B.mid}`, borderRadius:10, padding:"8px 16px", fontWeight:700, fontSize:13, textDecoration:"none" }}>📅 Book Meeting</a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ background:"#25d366", color:"#fff", borderRadius:10, padding:"9px 18px", fontWeight:700, fontSize:13, textDecoration:"none", boxShadow:"0 4px 14px rgba(37,211,102,.3)" }}>💬 WhatsApp</a>
        </div>
      </div>

      <div style={{ textAlign:"center", padding:"clamp(40px,8vw,68px) 20px clamp(28px,5vw,48px)", background:`linear-gradient(180deg,${B.l} 0%,#f8fafc 100%)`, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:"all .6s ease" }}>
        <div style={{ display:"inline-block", background:`linear-gradient(90deg,${B.d},${B.s})`, color:"#fff", fontSize:12, fontWeight:700, padding:"5px 20px", borderRadius:99, marginBottom:20, letterSpacing:".08em", textTransform:"uppercase", boxShadow:`0 4px 14px ${B.s}50` }}>All Services</div>
        <h1 style={{ fontSize:"clamp(24px,5vw,40px)", fontWeight:900, color:"#0f172a", marginBottom:14, lineHeight:1.18 }}>
          Smart Digital Solutions<br />
          <span style={{ background:`linear-gradient(90deg,${B.d},${B.s})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>for Modern Businesses</span>
        </h1>
        <p style={{ color:"#64748b", fontSize:"clamp(14px,2.5vw,16px)", maxWidth:500, margin:"0 auto", lineHeight:1.8 }}>
          Choose a service to view packages and pricing. All customized to your needs.
        </p>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"28px 16px 32px", flex:1, width:"100%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(185px,100%),1fr))", gap:14 }}>
          {SERVICES.map((svc,idx) => (
            <button key={svc.id} onClick={()=>setActive(svc.id)} style={{ background:"#fff", border:`1.5px solid #e8edf2`, borderRadius:16, padding:"22px 14px", cursor:"pointer", textAlign:"center", transition:"all .25s cubic-bezier(.4,0,.2,1)", display:"flex", flexDirection:"column", alignItems:"center", gap:9, boxShadow:"0 2px 8px rgba(0,0,0,.04)", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transitionDelay:`${idx*.04}s`, fontFamily:"inherit" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=B.s;e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 10px 28px ${B.s}22`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#e8edf2";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.04)";}}>
              <div style={{ width:50, height:50, borderRadius:14, background:B.l, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{svc.icon}</div>
              <div style={{ fontWeight:800, fontSize:13, color:"#0f172a", lineHeight:1.3 }}>{svc.label}</div>
              <div style={{ fontSize:11, color:"#64748b", lineHeight:1.5 }}>{svc.tagline}</div>
              <div style={{ background:B.l, color:B.m, fontSize:11, fontWeight:700, padding:"4px 14px", borderRadius:99 }}>View Packages →</div>
            </button>
          ))}
        </div>
        <div style={{ marginTop:40, textAlign:"center" }}>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"12px 20px", color:"#94a3b8", fontSize:12, marginBottom:24 }}>
            {["🔒 Secure & Confidential","⚡ Fast Delivery","📋 Contract Provided","💬 24/7 Support","🌍 Serving Worldwide"].map((t,i)=><span key={i}>{t}</span>)}
          </div>
          <div style={{ padding:"22px 24px", background:"#fff", border:"1.5px solid #e8edf2", borderRadius:18 }}>
            <p style={{ color:"#64748b", fontSize:14, marginBottom:14 }}>Want a custom package? Talk to us — we respond fast.</p>
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", background:"#25d366", color:"#fff", borderRadius:12, padding:"11px 24px", fontWeight:700, fontSize:14, textDecoration:"none", boxShadow:"0 6px 18px rgba(37,211,102,.3)" }}>💬 WhatsApp: 0323 923 6099</a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", background:`linear-gradient(90deg,${B.s},${B.m})`, color:"#fff", borderRadius:12, padding:"11px 24px", fontWeight:700, fontSize:14, textDecoration:"none", boxShadow:`0 6px 18px ${B.s}40` }}>📅 Book Free Meeting</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

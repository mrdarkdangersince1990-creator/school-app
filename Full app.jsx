import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const TEACHERS = [
  { id: 1, name: "Mrs. Priya Sharma", subject: "Mathematics", class: "X-A", qual: "M.Sc, B.Ed", avatar: "PS", color: "#4F8CFF" },
  { id: 2, name: "Mr. Rajesh Kumar", subject: "Physics", class: "XI-B", qual: "M.Sc, B.Ed", avatar: "RK", color: "#FF6B6B" },
  { id: 3, name: "Ms. Anita Verma", subject: "English", class: "IX-C", qual: "MA, B.Ed", avatar: "AV", color: "#43D9AD" },
  { id: 4, name: "Mr. Suresh Nair", subject: "Chemistry", class: "XII-A", qual: "M.Sc, Ph.D", avatar: "SN", color: "#F7931E" },
  { id: 5, name: "Ms. Deepa Joshi", subject: "Biology", class: "X-B", qual: "M.Sc, B.Ed", avatar: "DJ", color: "#9B59B6" },
  { id: 6, name: "Mr. Anil Mishra", subject: "History", class: "VIII-A", qual: "MA, B.Ed", avatar: "AM", color: "#E74C3C" },
];

const NOTICES = [
  { id: 1, title: "Annual Sports Day", date: "May 18, 2026", desc: "All students must report by 8 AM in sports uniform. Parents are cordially invited.", tag: "Event" },
  { id: 2, title: "Exam Schedule Released", date: "May 15, 2026", desc: "Final term exams begin June 2nd. Timetable available on the notice board.", tag: "Academic" },
  { id: 3, title: "Fee Submission Reminder", date: "May 12, 2026", desc: "Last date for Q2 fee submission is May 25th. Avoid late fine.", tag: "Finance" },
  { id: 4, title: "Science Exhibition", date: "May 10, 2026", desc: "Inter-school science exhibition on May 30. Register before May 20.", tag: "Event" },
];

const GALLERY = [
  { id: 1, label: "Sports Day 2025", emoji: "🏃", bg: "linear-gradient(135deg,#667eea,#764ba2)" },
  { id: 2, label: "Science Fair", emoji: "🔬", bg: "linear-gradient(135deg,#f093fb,#f5576c)" },
  { id: 3, label: "Annual Day", emoji: "🎭", bg: "linear-gradient(135deg,#4facfe,#00f2fe)" },
  { id: 4, label: "Republic Day", emoji: "🇮🇳", bg: "linear-gradient(135deg,#43e97b,#38f9d7)" },
  { id: 5, label: "Farewell Party", emoji: "🎓", bg: "linear-gradient(135deg,#fa709a,#fee140)" },
  { id: 6, label: "Tree Plantation", emoji: "🌳", bg: "linear-gradient(135deg,#a8edea,#fed6e3)" },
];

const BOOKS = {
  "Class VIII": ["Mathematics NCERT", "Science NCERT", "English Literature", "Social Studies", "Hindi Vyakaran"],
  "Class IX": ["Mathematics NCERT", "Physics Part I", "Chemistry Part I", "Biology", "English Beehive"],
  "Class X": ["Mathematics Standard", "Science NCERT", "SST NCERT", "English First Flight", "Hindi Kshitij"],
  "Class XI": ["Physics Part I & II", "Chemistry Part I & II", "Maths NCERT", "English Hornbill", "Informatics Practices"],
  "Class XII": ["Physics Part I & II", "Chemistry Part I & II", "Maths NCERT", "English Flamingo", "Computer Science"],
};

const PERFORMANCE = [
  { month: "Aug", score: 72 },
  { month: "Sep", score: 78 },
  { month: "Oct", score: 75 },
  { month: "Nov", score: 85 },
  { month: "Dec", score: 80 },
  { month: "Jan", score: 88 },
  { month: "Feb", score: 91 },
  { month: "Mar", score: 94 },
];

const ATTENDANCE_DATA = [
  { name: "Aarav Mehta", roll: "01", status: null },
  { name: "Priya Sharma", roll: "02", status: null },
  { name: "Rohan Gupta", roll: "03", status: null },
  { name: "Sneha Patel", roll: "04", status: null },
  { name: "Karan Singh", roll: "05", status: null },
  { name: "Ananya Roy", roll: "06", status: null },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const G = {
  bg: "#F0F4FF",
  card: "rgba(255,255,255,0.82)",
  border: "rgba(255,255,255,0.95)",
  shadow: "0 8px 32px rgba(79,140,255,0.10), 0 2px 8px rgba(0,0,0,0.06)",
  shadowHover: "0 16px 48px rgba(79,140,255,0.18), 0 4px 16px rgba(0,0,0,0.10)",
  accent: "#4F8CFF",
  accentSoft: "rgba(79,140,255,0.12)",
  text: "#0A0A0A",
  muted: "#8A96A8",
  success: "#43D9AD",
  danger: "#FF6B6B",
  radius: "20px",
  radiusSm: "12px",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  
  body { background: ${G.bg}; font-family: 'DM Sans', sans-serif; color: ${G.text}; overflow: hidden; height: 100vh; }
  
  ::-webkit-scrollbar { width: 0; }
  
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideRight { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
  @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.04);} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes progressFill { from{stroke-dashoffset:280} }
  @keyframes drawLine { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
  @keyframes flip { 0%{transform:rotateY(0)} 100%{transform:rotateY(180deg)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
  @keyframes noticeSlide { 0%,100%{opacity:1;transform:translateY(0)} 45%{opacity:1;transform:translateY(0)} 50%{opacity:0;transform:translateY(-20px)} 55%{opacity:0;transform:translateY(20px)} }

  .glass-card {
    background: ${G.card};
    border: 1px solid ${G.border};
    border-radius: ${G.radius};
    box-shadow: ${G.shadow};
    backdrop-filter: blur(20px);
  }
  .btn-accent {
    background: ${G.accent};
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: -0.2px;
  }
  .btn-accent:hover { transform: scale(1.03); box-shadow: 0 8px 24px rgba(79,140,255,0.35); }
  .btn-accent:active { transform: scale(0.97); }
  .btn-ghost {
    background: ${G.accentSoft};
    color: ${G.accent};
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .btn-ghost:hover { background: ${G.accent}; color: #fff; }
  .tag { display:inline-flex; align-items:center; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; letter-spacing:0.3px; }
  .stagger-1 { animation: fadeUp 0.5s ease both; animation-delay: 0.05s; }
  .stagger-2 { animation: fadeUp 0.5s ease both; animation-delay: 0.10s; }
  .stagger-3 { animation: fadeUp 0.5s ease both; animation-delay: 0.15s; }
  .stagger-4 { animation: fadeUp 0.5s ease both; animation-delay: 0.20s; }
  .stagger-5 { animation: fadeUp 0.5s ease both; animation-delay: 0.25s; }
  .stagger-6 { animation: fadeUp 0.5s ease both; animation-delay: 0.30s; }
  
  .page-enter { animation: slideIn 0.35s cubic-bezier(0.32,0.72,0,1) both; }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Avatar = ({ initials, color, size = 42 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 700, fontSize: size * 0.33,
    flexShrink: 0, letterSpacing: 0.5,
    boxShadow: `0 4px 12px ${color}44`
  }}>{initials}</div>
);

const TagBadge = ({ text, color = G.accent }) => (
  <span className="tag" style={{ background: `${color}18`, color }}>{text}</span>
);

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
< truncated lines 159-764 >
                  <label style={{ fontSize:12, color:G.muted, fontWeight:600, display:"block", marginBottom:6 }}>TITLE (शीर्षक)</label>
                  <input value={noticeForm.title} onChange={e=>setNoticeForm(f=>({...f,title:e.target.value}))}
                    placeholder="Notice title... (सूचना शीर्षक)"
                    style={{ width:"100%", padding:"12px 14px", borderRadius:12, border:"1px solid rgba(0,0,0,0.1)",
                      fontFamily:"DM Sans", fontSize:14, outline:"none", background:"rgba(255,255,255,0.8)" }} />
                </div>
                <div>
                  <label style={{ fontSize:12, color:G.muted, fontWeight:600, display:"block", marginBottom:6 }}>DESCRIPTION (विवरण)</label>
                  <textarea value={noticeForm.desc} onChange={e=>setNoticeForm(f=>({...f,desc:e.target.value}))}
                    placeholder="Write notice details... (सूचना विवरण लिखें)" rows={4}
                    style={{ width:"100%", padding:"12px 14px", borderRadius:12, border:"1px solid rgba(0,0,0,0.1)",
                      fontFamily:"DM Sans", fontSize:14, outline:"none", background:"rgba(255,255,255,0.8)",
                      resize:"none" }} />
                </div>
                <div>
                  <label style={{ fontSize:12, color:G.muted, fontWeight:600, display:"block", marginBottom:6 }}>CATEGORY (श्रेणी)</label>
                  <div style={{ display:"flex", gap:8 }}>
                    {[["Event","आयोजन"],["Academic","शैक्षणिक"],["Finance","वित्त"],["General","सामान्य"]].map(([t,h]) => (
                      <button key={t} onClick={() => setNoticeForm(f=>({...f,tag:t}))} style={{
                        padding:"8px 10px", borderRadius:10, border:"none", cursor:"pointer",
                        fontFamily:"DM Sans", fontWeight:600, fontSize:11,
                        background: noticeForm.tag===t ? G.accent : G.accentSoft,
                        color: noticeForm.tag===t ? "#fff" : G.accent, transition:"all 0.2s"
                      }}>{t}<br/><span style={{fontSize:9,opacity:0.8}}>({h})</span></button>
                    ))}
                  </div>
                </div>
                <button className="btn-accent" onClick={sendNotice} style={{ marginTop:4 }}>
                  {noticeSent ? "✓ Notice Published! (सूचना प्रकाशित!)" : "Publish Notice (सूचना प्रकाशित करें)"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "performance" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeUp 0.4s ease" }}>
            <div className="glass-card" style={{ padding:"20px" }}>
              <div style={{ fontWeight:600, fontSize:15, marginBottom:4 }}>📈 Class Performance (कक्षा प्रदर्शन)</div>
              <div style={{ color:G.muted, fontSize:12, marginBottom:16 }}>Class X-A • May 2026</div>
              <PerfChart />
            </div>
            <div className="glass-card" style={{ padding:"8px 0" }}>
              <div style={{ padding:"14px 18px 10px", fontWeight:600, fontSize:14 }}>Enter Marks (अंक दर्ज करें)</div>
              {["Aarav Mehta","Priya Sharma","Rohan Gupta","Sneha Patel"].map((name,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 18px",
                  borderTop:"1px solid rgba(0,0,0,0.05)" }}>
                  <Avatar initials={name.split(" ").map(w=>w[0]).join("")} color={G.accent} size={32} />
                  <span style={{ flex:1, fontSize:13, fontWeight:500 }}>{name}</span>
                  <input type="number" placeholder="—" min={0} max={100}
                    style={{ width:60, padding:"8px", borderRadius:8, border:"1px solid rgba(0,0,0,0.1)",
                      fontFamily:"DM Sans", fontSize:14, textAlign:"center", outline:"none" }} />
                </div>
              ))}
              <div style={{ padding:"12px 18px" }}>
                <button className="btn-accent" style={{ width:"100%" }}>Upload Marks (अंक अपलोड करें)</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STUDENT BOTTOM NAV ───────────────────────────────────────────────────────
function BottomNav({ active, onChange }) {
  const tabs = [
    { id:"home", label:"Home (होम)", icon:"🏠" },
    { id:"student", label:"Student (छात्र)", icon:"🎒" },
    { id:"school", label:"School (स्कूल)", icon:"🏫" },
  ];
  return (
    <div style={{
      position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)",
      display:"flex", gap:4, background:"rgba(255,255,255,0.88)",
      backdropFilter:"blur(20px)", borderRadius:24, padding:"8px 10px",
      boxShadow:"0 8px 32px rgba(79,140,255,0.18), 0 2px 8px rgba(0,0,0,0.08)",
      border:"1px solid rgba(255,255,255,0.95)", zIndex:100, minWidth:240,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          display:"flex", flexDirection:"column", alignItems:"center", gap:2,
          padding:"8px 20px", borderRadius:18, border:"none", cursor:"pointer",
          background: active===t.id ? G.accent : "transparent",
          transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          transform: active===t.id ? "scale(1.05)" : "scale(1)",
        }}>
          <span style={{ fontSize:18 }}>{t.icon}</span>
          <span style={{ fontFamily:"DM Sans", fontWeight:600, fontSize:11,
            color: active===t.id ? "#fff" : G.muted }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── STUDENT DASHBOARD ────────────────────────────────────────────────────────
function StudentDashboard({ onLogout }) {
  const [tab, setTab] = useState("home");

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:G.bg, position:"relative" }}>
      {/* Top Bar */}
      <div style={{ padding:"20px 20px 12px", flexShrink:0, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, fontWeight:400, letterSpacing:-0.3 }}>
            Smart School <span style={{fontSize:13,fontFamily:"DM Sans",color:G.muted}}>(स्मार्ट स्कूल)</span>
          </div>
          <div style={{ color:G.muted, fontSize:12 }}>Tue, 12 May 2026</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#4F8CFF,#7B5EA7)",
            display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:14 }}>AM</div>
          <button onClick={onLogout} style={{ background:"rgba(255,107,107,0.12)", color:G.danger,
            border:"none", borderRadius:10, padding:"7px 12px", fontFamily:"DM Sans",
            fontWeight:600, fontSize:12, cursor:"pointer" }}>निकलें</button>
        </div>
      </div>

      {/* Tab Content */}
      <div key={tab} style={{ flex:1, overflowY:"auto", animation:"fadeUp 0.3s ease" }}>
        {tab === "home" && <HomeTab />}
        {tab === "student" && <StudentTab />}
        {tab === "school" && <SchoolTab />}
      </div>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login"); // login | student | teacher
  const [key, setKey] = useState(0);

  const handleLogin = (role) => {
    setScreen(role === "student" ? "student" : "teacher");
    setKey(k => k + 1);
  };

  const handleLogout = () => {
    setScreen("login");
    setKey(k => k + 1);
  };

  return (
    <>
      <style>{css}</style>
      <div key={key} style={{ maxWidth:430, margin:"0 auto", height:"100vh", position:"relative", overflow:"hidden" }}>
        {screen === "login" && <LoginScreen onLogin={handleLogin} />}
        {screen === "student" && <StudentDashboard onLogout={handleLogout} />}
        {screen === "teacher" && <TeacherDashboard onLogout={handleLogout} />}
      </div>
    </>
  );
}
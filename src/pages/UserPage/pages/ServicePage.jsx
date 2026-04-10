import { useNavigate } from "react-router-dom";

const SERVICES_FULL = [
  { icon: "🩺", title: "General Checkup",     desc: "Comprehensive health assessments by experienced physicians with personalised care plans.", color: "#7c3aed" },
  { icon: "🧬", title: "Lab Diagnostics",      desc: "Advanced laboratory testing and imaging with fast, precise results delivered online.",    color: "#0891b2" },
  { icon: "💊", title: "Pharmacy",             desc: "In-house pharmacy stocked with all prescribed medications, open 7 days a week.",          color: "#059669" },
  { icon: "❤️", title: "Cardiology",           desc: "Expert diagnosis and treatment of heart conditions using the latest cardiac technology.",  color: "#dc2626" },
  { icon: "🧠", title: "Neurology",            desc: "Specialised care for brain and nervous system conditions including stroke and epilepsy.",   color: "#9333ea" },
  { icon: "🦴", title: "Orthopedics",          desc: "Joint replacement, sports injuries, and musculoskeletal rehabilitation by top surgeons.",  color: "#d97706" },
  { icon: "👁️", title: "Ophthalmology",        desc: "Advanced eye care including LASIK, cataract surgery, and retinal treatments.",            color: "#0284c7" },
  { icon: "🦷", title: "Dental Care",          desc: "Complete dental services from routine cleaning to cosmetic smile makeovers.",              color: "#16a34a" },
  { icon: "🤱", title: "Maternity & Neonatal", desc: "Complete prenatal, delivery, and neonatal ICU care by experienced OB-GYN specialists.",   color: "#db2777" },
];

/* ── SVG illustrations ── */
const ServiceHeroSVG = () => (
  <svg viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="380" height="260" rx="20" fill="#f5f3ff"/>
    {/* Large cross */}
    <rect x="155" y="40" width="70" height="22" rx="11" fill="#7c3aed" opacity="0.8"/>
    <rect x="166" y="18" width="22" height="70" rx="11" fill="#7c3aed" opacity="0.8"/>
    {/* Clipboard */}
    <rect x="60" y="80" width="110" height="150" rx="10" fill="white" stroke="#c4b5fd" strokeWidth="2"/>
    <rect x="85" y="70" width="60" height="18" rx="9" fill="#7c3aed"/>
    <rect x="74" y="105" width="82" height="7" rx="3.5" fill="#ede9fe"/>
    <rect x="74" y="120" width="62" height="7" rx="3.5" fill="#ede9fe"/>
    <rect x="74" y="135" width="72" height="7" rx="3.5" fill="#ede9fe"/>
    <rect x="74" y="150" width="50" height="7" rx="3.5" fill="#c4b5fd"/>
    <rect x="74" y="168" width="82" height="7" rx="3.5" fill="#ede9fe"/>
    <rect x="74" y="183" width="40" height="7" rx="3.5" fill="#ede9fe"/>
    {/* Stethoscope */}
    <path d="M220 90 Q230 110 225 130 Q220 150 235 165" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <circle cx="238" cy="170" r="14" fill="#7c3aed" opacity="0.15" stroke="#7c3aed" strokeWidth="2.5"/>
    <circle cx="238" cy="170" r="6" fill="#7c3aed"/>
    <path d="M215 92 Q205 110 210 130 Q215 150 235 165" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <circle cx="218" cy="89" r="10" fill="#7c3aed" opacity="0.2" stroke="#7c3aed" strokeWidth="2"/>
    {/* Pills */}
    <ellipse cx="310" cy="100" ry="14" rx="14" fill="#fde68a" stroke="#d97706" strokeWidth="2" transform="rotate(-30 310 100)"/>
    <line x1="296" y1="107" x2="324" y2="93" stroke="#d97706" strokeWidth="2"/>
    <ellipse cx="340" cy="140" rx="22" ry="11" fill="#bbf7d0" stroke="#059669" strokeWidth="2" transform="rotate(20 340 140)"/>
    <line x1="328" y1="133" x2="352" y2="147" stroke="#059669" strokeWidth="2"/>
    <ellipse cx="300" cy="175" rx="20" ry="10" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2" transform="rotate(-15 300 175)"/>
    <line x1="288" y1="180" x2="312" y2="170" stroke="#3b82f6" strokeWidth="2"/>
    {/* Heart rate */}
    <polyline points="220,220 235,220 242,200 250,235 258,215 265,220 280,220" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const MedEquipmentSVG = () => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="180" rx="16" fill="#fff7ed"/>
    {/* MRI machine */}
    <rect x="30" y="50" width="130" height="90" rx="12" fill="#fed7aa" stroke="#ea580c" strokeWidth="2"/>
    <ellipse cx="95" cy="95" rx="45" ry="35" fill="#fff" stroke="#ea580c" strokeWidth="2"/>
    <ellipse cx="95" cy="95" rx="30" ry="22" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5"/>
    <rect x="55" y="140" width="80" height="10" rx="5" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5"/>
    <text x="95" y="160" textAnchor="middle" fontSize="8" fill="#ea580c" fontWeight="600">MRI Scanner</text>
    {/* Monitor */}
    <rect x="180" y="40" width="80" height="60" rx="8" fill="#1e1e2f" stroke="#7c3aed" strokeWidth="1.5"/>
    <rect x="186" y="46" width="68" height="48" rx="5" fill="#12111e"/>
    <polyline points="190,70 200,70 207,55 215,82 223,62 230,70 248,70" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <rect x="210" y="100" width="20" height="6" rx="3" fill="#7c3aed"/>
    <rect x="206" y="106" width="28" height="30" rx="4" fill="#374151"/>
    <text x="220" y="148" textAnchor="middle" fontSize="8" fill="#7c3aed" fontWeight="600">Vitals Monitor</text>
  </svg>
);

const WhoWeAreSVG = () => (
  <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="180" rx="16" fill="#f0f9ff"/>
    {/* Doctor */}
    <circle cx="90" cy="65" r="26" fill="#fde68a"/>
    <ellipse cx="90" cy="42" rx="22" ry="12" fill="#1f2937"/>
    <rect x="67" y="88" width="46" height="65" rx="14" fill="#0891b2"/>
    <path d="M67 100 L80 88 L90 106 L100 88 L113 100" fill="white" opacity="0.9"/>
    <rect x="82" y="85" width="16" height="5" rx="2.5" fill="#ef4444"/>
    <rect x="87" y="80" width="6" height="14" rx="3" fill="#ef4444"/>
    {/* Patient */}
    <circle cx="200" cy="75" r="22" fill="#fde68a"/>
    <ellipse cx="200" cy="56" rx="18" ry="10" fill="#92400e"/>
    <rect x="179" y="95" width="42" height="55" rx="12" fill="#e0e7ff"/>
    {/* Handshake area */}
    <path d="M113 120 Q150 110 179 120" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="6,4"/>
    <text x="148" y="108" textAnchor="middle" fontSize="14">🤝</text>
    <text x="140" y="165" textAnchor="middle" fontSize="9" fill="#0891b2" fontWeight="600">Patient-Centred Care</text>
  </svg>
);

export default function ServicePage() {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-bg min-h-screen">

      {/* ── PAGE HERO ── */}
      <div className="bg-bg py-16 px-6 text-center">
        <p className="text-violet-400 text-sm mb-3">Home › <span className="text-violet-600 font-semibold">Services</span></p>
        <h1 className="text-4xl sm:text-5xl font-black text-text mb-4">Our Medical Services</h1>
        <p className="text-text/70 text-base max-w-xl mx-auto leading-relaxed">
          From diagnostics to specialised surgery, MedLab Hospital offers comprehensive healthcare services under one roof.
        </p>
        <button onClick={() => navigate("/user/appointment")} className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-bold px-7 py-3 rounded-full text-sm shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5">
          📅 Book an Appointment
        </button>
      </div>

      {/* ── HERO ILLUSTRATION ── */}
      <section className="py-10 px-6 bg-card">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 h-64 rounded-2xl overflow-hidden shadow-lg">
            <ServiceHeroSVG />
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="h-44 rounded-2xl overflow-hidden shadow-md"><MedEquipmentSVG /></div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-md"><WhoWeAreSVG /></div>
            <div className="col-span-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-white font-black text-lg">Need a consultation?</p>
                <p className="text-violet-200 text-sm">Book your slot with a specialist today.</p>
              </div>
              <button onClick={() => navigate("/user/appointment")} className="bg-white text-violet-600 font-bold px-5 py-2.5 rounded-full text-sm hover:shadow-lg transition-all whitespace-nowrap">
                Book Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES ── */}
      <section className="py-20 px-6 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text">All 9 Services</h2>
            <p className="text-text/50 mt-3 max-w-md mx-auto text-sm">From diagnostics to surgery, we cover all your healthcare needs under one roof.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_FULL.map(s => (
              <div key={s.title} className="bg-card border border-secondary rounded-2xl p-7 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100 transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5" style={{ background: s.color + "18" }}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-extrabold text-text mb-2">{s.title}</h3>
                <p className="text-text/70 text-sm leading-relaxed mb-5">{s.desc}</p>
                <button onClick={() => navigate("/user/appointment")} className="text-sm font-bold transition-colors hover:underline" style={{ color: s.color }}>
                  Book this service →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:flex-1 h-56 rounded-2xl overflow-hidden shadow-lg"><WhoWeAreSVG /></div>
          <div className="w-full lg:flex-1">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Biography</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text mb-5">Who We Are</h2>
            <p className="text-text/70 text-sm leading-relaxed mb-4">MedLab Hospital is a full-service healthcare provider offering innovative medical solutions that deliver the right level of care.</p>
            <p className="text-violet-600 font-bold text-sm mb-1">Since 2010: time to heal and thrive.</p>
            <p className="text-text/50 text-xs italic mb-8">We are your Social Healthcare Partner.</p>
            <div className="flex flex-wrap gap-3">
              {[{ i: "🏅", l: "ISO Certified" }, { i: "🕐", l: "24/7 Emergency" }, { i: "🌐", l: "Online Booking" }].map(b => (
                <div key={b.l} className="flex items-center gap-2 bg-violet-100 text-violet-700 font-semibold text-sm px-4 py-2 rounded-full"><span>{b.i}</span><span>{b.l}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 py-20 px-6">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Book Your Appointment?</h2>
          <p className="text-violet-100 text-base mb-8 max-w-md mx-auto">Choose from our 9 specialties and get expert care from our top doctors.</p>
          <button onClick={() => navigate("/user/appointment")} className="bg-white text-violet-600 font-bold px-8 py-4 rounded-full text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
            Get Started Today →
          </button>
        </div>
      </section>
    </div>
  );
}
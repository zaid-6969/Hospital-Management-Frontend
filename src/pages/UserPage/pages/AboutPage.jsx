import { useNavigate } from "react-router-dom";

const DOCTORS = [
  { name: "Dr. Priya Sharma",  specialty: "Cardiologist",    exp: "12 yrs", bio: "Trained at AIIMS Delhi, specialises in interventional cardiology and heart failure management.", color: "#7c3aed" },
  { name: "Dr. Arjun Mehta",   specialty: "Neurologist",     exp: "9 yrs",  bio: "Fellow of the American Academy of Neurology with expertise in epilepsy, stroke and movement disorders.", color: "#0891b2" },
  { name: "Dr. Lakshmi Nair",  specialty: "Pediatrician",    exp: "15 yrs", bio: "Passionate about child health, known for her gentle approach and expertise in neonatal care.", color: "#059669" },
  { name: "Dr. Ramesh Iyer",   specialty: "Orthopedic Surg", exp: "11 yrs", bio: "Specialises in minimally invasive joint replacement and sports injury rehabilitation.", color: "#d97706" },
  { name: "Dr. Kavitha Menon", specialty: "Ophthalmologist", exp: "8 yrs",  bio: "Pioneer in advanced LASIK and retinal surgery with over 3,000 successful procedures.", color: "#db2777" },
  { name: "Dr. Suresh Kumar",  specialty: "Dental Surgeon",  exp: "10 yrs", bio: "Expert in cosmetic and restorative dentistry, from implants to smile makeovers.", color: "#7c3aed" },
];

const MILESTONES = [
  { year: "2010", event: "MedLab Hospital founded by Dr. R. Venkatesh in Anna Nagar, Chennai." },
  { year: "2013", event: "Expanded to 5 departments and received NABH accreditation." },
  { year: "2016", event: "Launched 24/7 emergency services and in-house ICU." },
  { year: "2018", event: "Opened advanced diagnostic imaging centre with MRI & CT." },
  { year: "2021", event: "Introduced telemedicine & launched the MedLab patient mobile app." },
  { year: "2024", event: "Crossed 12,000 patients served. Expanded to 9 specialties." },
];

const VALUES = [
  { i: "💜", t: "Compassion",  d: "We treat every patient with kindness, empathy, and genuine care." },
  { i: "🔬", t: "Excellence",  d: "We pursue the highest medical standards in every procedure and interaction." },
  { i: "🤝", t: "Integrity",   d: "Honest, transparent communication with patients and families always." },
  { i: "⚡", t: "Innovation",  d: "Continuously adopting the latest medical technology and best practices." },
];

/* ── SVG illustrations ── */
const HospitalFrontSVG = () => (
  <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="200" rx="16" fill="#f5f3ff"/>
    <rect x="30" y="55" width="220" height="140" rx="6" fill="#ede9fe"/>
    <rect x="30" y="55" width="220" height="32" rx="6" fill="#7c3aed"/>
    <text x="140" y="77" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">MedLab Hospital</text>
    {[50,90,130,170,210].map(x => [96,130,162].map(y => (
      <rect key={`${x}-${y}`} x={x} y={y} width="22" height="18" rx="3" fill="#c4b5fd" opacity="0.8"/>
    )))}
    <rect x="110" y="168" width="60" height="27" rx="5" fill="#7c3aed" opacity="0.9"/>
    <circle cx="133" cy="182" r="2.5" fill="#ede9fe"/>
    <rect x="122" y="18" width="36" height="10" rx="5" fill="#7c3aed"/>
    <rect x="133" y="9" width="10" height="28" rx="5" fill="#7c3aed"/>
    <rect x="20" y="196" width="240" height="4" rx="2" fill="#7c3aed" opacity="0.3"/>
  </svg>
);

const LabRoomSVG = () => (
  <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="200" rx="16" fill="#ecfdf5"/>
    <rect x="20" y="20" width="240" height="160" rx="10" fill="#d1fae5" opacity="0.5"/>
    <rect x="20" y="150" width="240" height="30" rx="0" fill="#6ee7b7" opacity="0.4"/>
    <rect x="40" y="25" width="12" height="70" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1.5"/>
    <ellipse cx="46" cy="112" rx="22" ry="30" fill="#a7f3d0" opacity="0.7" stroke="#059669" strokeWidth="1.5"/>
    <rect x="80" y="40" width="12" height="55" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1.5"/>
    <ellipse cx="86" cy="110" rx="18" ry="24" fill="#6ee7b7" opacity="0.6" stroke="#059669" strokeWidth="1.5"/>
    <rect x="118" y="15" width="12" height="80" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1.5"/>
    <ellipse cx="124" cy="118" rx="24" ry="32" fill="#34d399" opacity="0.5" stroke="#059669" strokeWidth="1.5"/>
    <rect x="160" y="60" width="90" height="80" rx="8" fill="white" stroke="#059669" strokeWidth="1.5"/>
    <rect x="168" y="70" width="56" height="5" rx="2.5" fill="#6ee7b7"/>
    <rect x="168" y="83" width="38" height="5" rx="2.5" fill="#6ee7b7"/>
    <rect x="168" y="96" width="46" height="5" rx="2.5" fill="#6ee7b7"/>
    <rect x="168" y="109" width="28" height="5" rx="2.5" fill="#a7f3d0"/>
    <text x="180" y="130" fontSize="8" fill="#059669" fontWeight="700">Status: Normal ✓</text>
    <circle cx="220" cy="35" r="16" fill="#d1fae5" stroke="#059669" strokeWidth="1.5"/>
    <text x="220" y="40" textAnchor="middle" fontSize="16">🔬</text>
  </svg>
);

const TeamGroupSVG = () => (
  <svg viewBox="0 0 280 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="280" height="130" rx="16" fill="#faf5ff"/>
    {[
      { cx: 42,  color: "#7c3aed", hair: "#1f2937", coat: "#7c3aed" },
      { cx: 98,  color: "#0891b2", hair: "#92400e", coat: "#0891b2" },
      { cx: 154, color: "#059669", hair: "#1f2937", coat: "#059669" },
      { cx: 210, color: "#d97706", hair: "#7c3aed", coat: "#d97706" },
      { cx: 258, color: "#db2777", hair: "#374151", coat: "#db2777" },
    ].map(({ cx, color, hair, coat }, i) => (
      <g key={i}>
        <circle cx={cx} cy={44} r={18} fill="#fde68a"/>
        <ellipse cx={cx} cy={28} rx={15} ry={8} fill={hair}/>
        <rect x={cx-13} y={59} width={26} height={38} rx={8} fill={coat}/>
        <path d={`M${cx-13} 67 L${cx-6} 60 L${cx} 72 L${cx+6} 60 L${cx+13} 67`} fill="white" opacity="0.85"/>
        <rect x={cx-4} y={56} width={8} height={3} rx="1.5" fill="#ef4444"/>
        <rect x={cx-1.5} y={53} width={3} height={8} rx="1.5" fill="#ef4444"/>
      </g>
    ))}
    <text x="140" y="118" textAnchor="middle" fontSize="10" fill="#7c3aed" fontWeight="700">Our Expert Medical Team</text>
  </svg>
);

const DoctorAvatarSVG = ({ color, letter }) => (
  <svg viewBox="0 0 260 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="260" height="176" fill={color + "15"}/>
    <rect x="78" y="90" width="104" height="86" rx="20" fill={color}/>
    <circle cx="130" cy="78" r="36" fill="#fde68a"/>
    <ellipse cx="130" cy="46" rx="32" ry="16" fill="#1f2937"/>
    <path d="M78 108 L100 94 L130 118 L160 94 L182 108" fill="white" opacity="0.9"/>
    <rect x="116" y="96" width="28" height="7" rx="3.5" fill="#ef4444"/>
    <rect x="124" y="88" width="12" height="23" rx="6" fill="#ef4444"/>
    <path d="M108 124 Q100 144 104 154" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <circle cx="104" cy="156" r="4.5" fill="#374151"/>
    <path d="M152 124 Q160 144 156 154" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M104 126 Q130 136 156 126" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <text x="130" y="83" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#1f2937">{letter}</text>
  </svg>
);

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-bg min-h-screen">

      {/* ── PAGE HERO ── */}
      <div className="bg-bg py-16 px-6 text-center">
        <p className="text-violet-400 text-sm mb-3">Home › <span className="text-violet-600 font-semibold">About Us</span></p>
        <h1 className="text-4xl sm:text-5xl font-black text-text mb-4">About MedLab Hospital</h1>
        <p className="text-text/70 text-base max-w-xl mx-auto leading-relaxed">
          Since 2010, we've been Chennai's most trusted healthcare partner — combining compassionate care with cutting-edge medicine.
        </p>
        <button onClick={() => navigate("/user/appointment")} className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-bold px-7 py-3 rounded-full text-sm shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5">
          📅 Book an Appointment
        </button>
      </div>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:flex-1 grid grid-cols-2 gap-4">
            <div className="rounded-2xl h-52 overflow-hidden shadow-md"><HospitalFrontSVG /></div>
            <div className="rounded-2xl h-52 overflow-hidden shadow-md mt-7"><LabRoomSVG /></div>
            <div className="rounded-2xl h-36 overflow-hidden shadow-md col-span-2"><TeamGroupSVG /></div>
          </div>
          <div className="w-full lg:flex-1">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text mb-5">Who We Are</h2>
            <p className="text-text/70 text-sm leading-relaxed mb-4">
              Founded in 2010 by Dr. R. Venkatesh, MedLab Hospital started as a small diagnostic centre in Anna Nagar with a vision to make quality healthcare accessible to all. Over the years, we've grown into a full-service, multi-specialty hospital trusted by over 12,000 patients across Tamil Nadu.
            </p>
            <p className="text-text/70 text-sm leading-relaxed mb-8">
              Our team of 50+ specialists, 200+ support staff, and state-of-the-art infrastructure make us one of the leading healthcare institutions in the region.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[{ v: "12K+", l: "Patients Served" }, { v: "50+", l: "Specialists" }, { v: "9+", l: "Departments" }, { v: "15yrs", l: "Of Excellence" }].map(s => (
                <div key={s.l} className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center">
                  <div className="text-xl font-black text-violet-600">{s.v}</div>
                  <div className="text-xs text-violet-400 mt-1 font-medium">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 px-6 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.t} className="bg-card border border-secondary rounded-2xl p-7 text-center hover:shadow-lg hover:shadow-violet-100 hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{v.i}</div>
                <h3 className="font-extrabold text-text text-lg mb-2">{v.t}</h3>
                <p className="text-text/70 text-sm leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-violet-200" />
            <div className="flex flex-col gap-8">
              {MILESTONES.map(m => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-lg shadow-violet-300">
                      {m.year.slice(2)}
                    </div>
                  </div>
                  <div className="bg-bg border border-secondary rounded-2xl p-5 flex-1 hover:border-violet-200 hover:shadow-md transition-all">
                    <span className="text-violet-600 font-extrabold text-sm">{m.year}</span>
                    <p className="text-text/80 text-sm leading-relaxed mt-1">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="py-20 px-6 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text">Our Specialist Doctors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.map(doc => (
              <div key={doc.name} className="bg-card border border-secondary rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 transition-all">
                <div className="h-44 overflow-hidden">
                  <DoctorAvatarSVG color={doc.color} letter={doc.name.split(" ").slice(1).map(n=>n[0]).join("")} />
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-text text-lg">{doc.name}</h3>
                  <p className="font-semibold text-sm mt-0.5" style={{ color: doc.color }}>{doc.specialty}</p>
                  <p className="text-text/40 text-xs mt-0.5 mb-3">{doc.exp} experience</p>
                  <p className="text-text/70 text-xs leading-relaxed mb-5">{doc.bio}</p>
                  <button onClick={() => navigate("/user/appointment")} className="w-full text-white font-bold py-2.5 rounded-xl text-sm transition-all hover:opacity-90" style={{ background: doc.color }}>
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigate("/user/appointment")} className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5">
              📅 Book an Appointment →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
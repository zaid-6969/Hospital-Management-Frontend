import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const DOCTORS = [
  { name: "Dr. Priya Sharma",  specialty: "Cardiologist",    exp: "12 yrs", bio: "Trained at AIIMS Delhi, specialises in interventional cardiology and heart failure management.", color: "#7c3aed", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80" },
  { name: "Dr. Arjun Mehta",   specialty: "Neurologist",     exp: "9 yrs",  bio: "Fellow of the American Academy of Neurology with expertise in epilepsy, stroke and movement disorders.", color: "#0891b2", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
  { name: "Dr. Lakshmi Nair",  specialty: "Pediatrician",    exp: "15 yrs", bio: "Passionate about child health, known for her gentle approach and expertise in neonatal care.", color: "#059669", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
  { name: "Dr. Ramesh Iyer",   specialty: "Orthopedic Surg", exp: "11 yrs", bio: "Specialises in minimally invasive joint replacement and sports injury rehabilitation.", color: "#d97706", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80" },
  { name: "Dr. Kavitha Menon", specialty: "Ophthalmologist", exp: "8 yrs",  bio: "Pioneer in advanced LASIK and retinal surgery with over 3,000 successful procedures.", color: "#db2777", img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80" },
  { name: "Dr. Suresh Kumar",  specialty: "Dental Surgeon",  exp: "10 yrs", bio: "Expert in cosmetic and restorative dentistry, from implants to smile makeovers.", color: "#7c3aed", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80" },
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
  { img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80", t: "Compassion",  d: "We treat every patient with kindness, empathy, and genuine care." },
  { img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80", t: "Excellence",  d: "We pursue the highest medical standards in every procedure and interaction." },
  { img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80", t: "Integrity",   d: "Honest, transparent communication with patients and families always." },
  { img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80", t: "Innovation",  d: "Continuously adopting the latest medical technology and best practices." },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="font-sans min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── PAGE HERO ── */}
      <div
        className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-violet-300 text-sm mb-3">Home › <span className="text-white font-semibold">About Us</span></p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">About MedLab Hospital</h1>
          <p className="text-violet-200 text-base max-w-xl mx-auto leading-relaxed mb-6">
            Since 2010, we've been Chennai's most trusted healthcare partner — combining compassionate care with cutting-edge medicine.
          </p>
          <button
            onClick={() => navigate("/user/appointment")}
            className="inline-flex items-center gap-2 bg-white font-bold px-7 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ color: "#7c3aed" }}
          >
            Book an Appointment <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:flex-1 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80" alt="Doctors" className="rounded-2xl h-52 w-full object-cover shadow-lg" />
            <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80" alt="Hospital" className="rounded-2xl h-52 w-full object-cover shadow-lg mt-7" />
            <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80" alt="Team" className="rounded-2xl h-36 w-full object-cover shadow-lg col-span-2" />
          </div>
          <div className="w-full lg:flex-1">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-black mb-5" style={{ color: "var(--text)" }}>Who We Are</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)", opacity: 0.7 }}>
              Founded in 2010 by Dr. R. Venkatesh, MedLab Hospital started as a small diagnostic centre in Anna Nagar with a vision to make quality healthcare accessible to all. Over the years, we've grown into a full-service, multi-specialty hospital trusted by over 12,000 patients.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text)", opacity: 0.7 }}>
              Our team of 50+ specialists and state-of-the-art infrastructure make us one of the leading healthcare institutions in Tamil Nadu.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[{ v: "12K+", l: "Patients" }, { v: "50+", l: "Specialists" }, { v: "9+", l: "Departments" }, { v: "15yrs", l: "Excellence" }].map(s => (
                <div key={s.l} className="rounded-xl p-4 text-center" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
                  <div className="text-xl font-black" style={{ color: "#7c3aed" }}>{s.v}</div>
                  <div className="text-xs font-medium mt-1" style={{ color: "#7c3aed", opacity: 0.7 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text)" }}>Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div
                key={v.t}
                className="rounded-2xl overflow-hidden hover:-translate-y-1 transition-all"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="h-36 overflow-hidden">
                  <img src={v.img} alt={v.t} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-extrabold text-base mb-2" style={{ color: "var(--text)" }}>{v.t}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text)", opacity: 0.65 }}>{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text)" }}>Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: "rgba(124,58,237,0.2)" }} />
            <div className="flex flex-col gap-8">
              {MILESTONES.map(m => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="relative z-10 shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-lg"
                      style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", boxShadow: "0 4px 12px rgba(124,58,237,0.35)" }}
                    >
                      {m.year.slice(2)}
                    </div>
                  </div>
                  <div
                    className="rounded-2xl p-5 flex-1 hover:shadow-md transition-all"
                    style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                  >
                    <span className="font-extrabold text-sm" style={{ color: "#7c3aed" }}>{m.year}</span>
                    <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--text)", opacity: 0.75 }}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="py-20 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text)" }}>Our Specialist Doctors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.map(doc => (
              <div
                key={doc.name}
                className="rounded-2xl overflow-hidden hover:-translate-y-1 transition-all"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = doc.color + "50"; e.currentTarget.style.boxShadow = `0 16px 40px ${doc.color}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="h-52 overflow-hidden relative">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-lg" style={{ color: "var(--text)" }}>{doc.name}</h3>
                  <p className="font-semibold text-sm mt-0.5" style={{ color: doc.color }}>{doc.specialty}</p>
                  <div className="flex items-center gap-1 mt-1.5 mb-3">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#f59e0b" stroke="#f59e0b" />)}
                    <span className="text-xs ml-1" style={{ color: "var(--text)", opacity: 0.5 }}>{doc.exp} exp</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--text)", opacity: 0.65 }}>{doc.bio}</p>
                  <button
                    onClick={() => navigate("/user/appointment")}
                    className="w-full font-bold py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg,${doc.color},${doc.color}cc)` }}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/user/appointment")}
              className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}
            >
              Book an Appointment <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
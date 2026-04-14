import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Star, Shield, Clock, Award } from "lucide-react";

const SERVICES = [
  {
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    title: "General Checkup",
    desc: "Comprehensive health assessments by experienced physicians with personalised care plans.",
    color: "#7c3aed",
  },
  {
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80",
    title: "Lab Diagnostics",
    desc: "Advanced laboratory testing and imaging with fast, precise results delivered online.",
    color: "#0891b2",
  },
  {
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
    title: "Pharmacy",
    desc: "In-house pharmacy stocked with all prescribed medications, open 7 days a week.",
    color: "#059669",
  },
];

const DOCTORS = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    exp: "12 yrs",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    color: "#7c3aed",
  },
  {
    name: "Dr. Arjun Mehta",
    specialty: "Neurologist",
    exp: "9 yrs",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    color: "#0891b2",
  },
  {
    name: "Dr. Lakshmi Nair",
    specialty: "Pediatrician",
    exp: "15 yrs",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    color: "#059669",
  },
];

const TESTIMONIALS = [
  {
    name: "Ravi Kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    text: "The online booking was so easy and the doctor was incredibly thorough. Highly recommend MedLab Hospital!",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    text: "Got my lab results online within hours. The staff was professional and the facilities are world-class.",
    rating: 5,
  },
  {
    name: "Mohammed Farhan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    text: "My kids love coming here. The pediatrics team is amazing — patient, kind, and extremely knowledgeable.",
    rating: 5,
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const displayName = user?.name || user?.email?.split("@")[0] || "Patient";

  return (
    <div className="font-sans min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── HERO ── */}
      <section className="py-14 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              Trusted Healthcare · Chennai
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5"
              style={{ color: "var(--text)" }}
            >
              Hi {displayName.split(" ")[0]}, your{" "}
              <span style={{ color: "#7c3aed" }}>health</span> matters.
            </h1>
            <p className="text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8" style={{ color: "var(--text)", opacity: 0.65 }}>
              MedLab Hospital delivers compassionate, world-class care. Book appointments with top specialists, track your health records, and get results — all online.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/user/appointment")}
                className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", boxShadow: "0 8px 24px rgba(124,58,237,0.35)" }}
              >
                Book Appointment <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/user/services")}
                className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
                style={{ border: "1.5px solid rgba(124,58,237,0.3)", color: "#7c3aed", background: "rgba(124,58,237,0.06)" }}
              >
                Our Services
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { v: "12K+", l: "Happy Patients" },
                { v: "95%", l: "Success Rate" },
                { v: "50+", l: "Specialists" },
                { v: "15yrs", l: "Experience" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-black" style={{ color: "#7c3aed" }}>{s.v}</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: "var(--text)", opacity: 0.5 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="flex-1 flex justify-center w-full">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
                alt="Hospital"
                className="w-full h-80 lg:h-96 object-cover rounded-3xl"
                style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
              />
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.12)" }}>
                  <Shield size={18} style={{ color: "#7c3aed" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--text)" }}>NABH Accredited</p>
                  <p className="text-[10px]" style={{ color: "var(--text)", opacity: 0.45 }}>ISO 9001:2015</p>
                </div>
              </div>
              <div
                className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.12)" }}>
                  <Clock size={18} style={{ color: "#059669" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--text)" }}>24/7 Emergency</p>
                  <p className="text-[10px]" style={{ color: "var(--text)", opacity: 0.45 }}>Always available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT CTA BANNER ── */}
      <section
        className="py-14 px-6"
        style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-violet-200 text-xs font-bold uppercase tracking-widest mb-2">Ready to see a doctor?</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Book Your Appointment Online</h2>
            <p className="text-violet-200 text-sm max-w-md">
              Choose your specialist, pick a date, confirm your slot — all in under 2 minutes.
            </p>
          </div>
          <button
            onClick={() => navigate("/user/appointment")}
            className="shrink-0 flex items-center gap-2 bg-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:shadow-2xl hover:-translate-y-0.5"
            style={{ color: "#7c3aed", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
          >
            Book Now <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text)" }}>Our Core Services</h2>
            <p className="mt-3 max-w-md mx-auto text-sm" style={{ color: "var(--text)", opacity: 0.5 }}>
              From diagnostics to surgery, we cover all your healthcare needs under one roof.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl overflow-hidden hover:-translate-y-1 transition-all group"
                style={{ border: "1px solid var(--border)", background: "var(--bg)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color + "50"; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="h-44 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: s.color + "15" }}>
                    <Award size={18} style={{ color: s.color }} />
                  </div>
                  <h3 className="text-lg font-extrabold mb-2" style={{ color: "var(--text)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)", opacity: 0.65 }}>{s.desc}</p>
                  <button className="text-sm font-bold group-hover:underline" style={{ color: s.color }}>
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/user/services")}
              className="text-sm font-bold px-7 py-3 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ border: "1.5px solid rgba(124,58,237,0.3)", color: "#7c3aed", background: "rgba(124,58,237,0.06)" }}
            >
              View All 9 Services →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Images grid */}
          <div className="w-full lg:flex-1 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80"
              alt="Doctors"
              className="rounded-2xl h-52 w-full object-cover shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80"
              alt="Hospital"
              className="rounded-2xl h-52 w-full object-cover shadow-lg mt-7"
            />
            <img
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80"
              alt="Medical Team"
              className="rounded-2xl h-36 w-full object-cover shadow-lg col-span-2"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:flex-1">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>
              Biography
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-5" style={{ color: "var(--text)" }}>Who We Are</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)", opacity: 0.7 }}>
              MedLab Hospital is a full-service healthcare provider offering innovative medical solutions. Since 2010 we've served 12,000+ patients across Tamil Nadu, combining compassionate care with cutting-edge technology.
            </p>
            <p className="text-sm font-bold mb-1" style={{ color: "#7c3aed" }}>Since 2010 — time to heal and thrive.</p>
            <p className="text-xs italic mb-8" style={{ color: "var(--text)", opacity: 0.5 }}>We are your Social Healthcare Partner.</p>
            <div className="flex flex-wrap gap-3">
              {[
                { i: "🏅", l: "ISO Certified" },
                { i: "🕐", l: "24/7 Emergency" },
                { i: "🌐", l: "Online Booking" },
              ].map((b) => (
                <div
                  key={b.l}
                  className="flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-full"
                  style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}
                >
                  <span>{b.i}</span>
                  <span>{b.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>
              Meet the Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text)" }}>Our Specialist Doctors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.map((doc) => (
              <div
                key={doc.name}
                className="rounded-2xl overflow-hidden hover:-translate-y-1 transition-all"
                style={{ border: "1px solid var(--border)", background: "var(--bg)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = doc.color + "50"; e.currentTarget.style.boxShadow = `0 16px 40px ${doc.color}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-lg" style={{ color: "var(--text)" }}>{doc.name}</h3>
                  <p className="font-semibold text-sm mt-0.5" style={{ color: doc.color }}>{doc.specialty}</p>
                  <div className="flex items-center gap-1 mt-2 mb-5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={11} fill="#f59e0b" stroke="#f59e0b" />
                    ))}
                    <span className="text-xs ml-1 font-medium" style={{ color: "var(--text)", opacity: 0.5 }}>{doc.exp} experience</span>
                  </div>
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
              className="flex items-center gap-2 mx-auto font-bold px-8 py-3.5 rounded-xl text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}
            >
              Book an Appointment with Any Doctor <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>
              Patient Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text)" }}>What Our Patients Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-7 transition-all hover:-translate-y-1"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.12)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic mb-6" style={{ color: "var(--text)", opacity: 0.7 }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-bold text-sm" style={{ color: "var(--text)" }}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="relative overflow-hidden py-20 px-6"
        style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Book Your Appointment?
          </h2>
          <p className="text-violet-200 text-base mb-8 max-w-md mx-auto">
            Join over 12,000 patients who trust MedLab Hospital for their healthcare needs.
          </p>
          <button
            onClick={() => navigate("/user/appointment")}
            className="flex items-center gap-2 mx-auto bg-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ color: "#7c3aed" }}
          >
            Get Started Today <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
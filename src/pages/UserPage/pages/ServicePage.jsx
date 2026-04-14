import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const SERVICES_FULL = [
  { img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",  title: "General Checkup",     desc: "Comprehensive health assessments by experienced physicians with personalised care plans.", color: "#7c3aed" },
  { img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80",  title: "Lab Diagnostics",      desc: "Advanced laboratory testing and imaging with fast, precise results delivered online.",    color: "#0891b2" },
  { img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",  title: "Pharmacy",             desc: "In-house pharmacy stocked with all prescribed medications, open 7 days a week.",          color: "#059669" },
  { img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",     title: "Cardiology",           desc: "Expert diagnosis and treatment of heart conditions using the latest cardiac technology.",  color: "#dc2626" },
  { img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80",     title: "Neurology",            desc: "Specialised care for brain and nervous system conditions including stroke and epilepsy.",   color: "#9333ea" },
  { img: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=400&q=80",  title: "Orthopedics",          desc: "Joint replacement, sports injuries, and musculoskeletal rehabilitation by top surgeons.",  color: "#d97706" },
  { img: "https://images.unsplash.com/photo-1587421020600-607e17fd0a3e?w=400&q=80",  title: "Ophthalmology",        desc: "Advanced eye care including LASIK, cataract surgery, and retinal treatments.",            color: "#0284c7" },
  { img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80",  title: "Dental Care",          desc: "Complete dental services from routine cleaning to cosmetic smile makeovers.",              color: "#16a34a" },
  { img: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400&q=80",  title: "Maternity & Neonatal", desc: "Complete prenatal, delivery, and neonatal ICU care by experienced OB-GYN specialists.",   color: "#db2777" },
];

export default function ServicePage() {
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
          <p className="text-violet-300 text-sm mb-3">Home › <span className="text-white font-semibold">Services</span></p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Our Medical Services</h1>
          <p className="text-violet-200 text-base max-w-xl mx-auto leading-relaxed mb-6">
            From diagnostics to specialised surgery, MedLab Hospital offers comprehensive healthcare services under one roof.
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

      {/* ── HERO ILLUSTRATION ── */}
      <section className="py-14 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-1/2 h-72 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80"
              alt="Hospital"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="h-44 rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80" alt="Equipment" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-md">
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&q=80" alt="Doctors" className="w-full h-full object-cover" />
            </div>
            <div
              className="col-span-2 rounded-2xl p-5 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)" }}
            >
              <div>
                <p className="text-white font-black text-lg">Need a consultation?</p>
                <p className="text-violet-200 text-sm">Book your slot with a specialist today.</p>
              </div>
              <button
                onClick={() => navigate("/user/appointment")}
                className="bg-white font-bold px-5 py-2.5 rounded-xl text-sm hover:shadow-lg transition-all whitespace-nowrap"
                style={{ color: "#7c3aed" }}
              >
                Book Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES ── */}
      <section className="py-20 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text)" }}>All 9 Services</h2>
            <p className="mt-3 max-w-md mx-auto text-sm" style={{ color: "var(--text)", opacity: 0.5 }}>
              From diagnostics to surgery, we cover all your healthcare needs under one roof.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_FULL.map(s => (
              <div
                key={s.title}
                className="rounded-2xl overflow-hidden hover:-translate-y-1 transition-all group"
                style={{ border: "1px solid var(--border)", background: "var(--card)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color + "50"; e.currentTarget.style.boxShadow = `0 16px 40px ${s.color}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.3) 0%,transparent 60%)" }} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-extrabold mb-2" style={{ color: "var(--text)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)", opacity: 0.65 }}>{s.desc}</p>
                  <button
                    onClick={() => navigate("/user/appointment")}
                    className="flex items-center gap-1.5 text-sm font-bold transition-colors hover:underline"
                    style={{ color: s.color }}
                  >
                    <CheckCircle2 size={14} /> Book this service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 px-6" style={{ background: "var(--card)" }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:flex-1 h-72 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80"
              alt="Team"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:flex-1">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>
              Biography
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-5" style={{ color: "var(--text)" }}>Who We Are</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)", opacity: 0.7 }}>
              MedLab Hospital is a full-service healthcare provider offering innovative medical solutions that deliver the right level of care. We strive to build a caring community around your health.
            </p>
            <p className="text-sm font-bold mb-1" style={{ color: "#7c3aed" }}>Since 2010: time to heal and thrive.</p>
            <p className="text-xs italic mb-8" style={{ color: "var(--text)", opacity: 0.5 }}>We are your Social Healthcare Partner.</p>
            <div className="flex flex-wrap gap-3">
              {[{ i: "🏅", l: "ISO Certified" }, { i: "🕐", l: "24/7 Emergency" }, { i: "🌐", l: "Online Booking" }].map(b => (
                <div key={b.l} className="flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-full" style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}>
                  <span>{b.i}</span><span>{b.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden py-20 px-6"
        style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to Book Your Appointment?</h2>
          <p className="text-violet-200 text-base mb-8 max-w-md mx-auto">Choose from our 9 specialties and get expert care from our top doctors.</p>
          <button
            onClick={() => navigate("/user/appointment")}
            className="inline-flex items-center gap-2 bg-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ color: "#7c3aed" }}
          >
            Get Started Today <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
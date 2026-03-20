import { useState } from "react";

const NAV_LINKS = ["Home", "Appointment", "Services", "About Us", "Contact Us"];
const QUICK_LINKS = ["Home", "Appointment", "Services", "About Us", "Contact Us"];
const HOURS = [
  { day: "Monday",    time: "9:00 – 18:00" },
  { day: "Tuesday",   time: "9:00 – 19:00" },
  { day: "Wednesday", time: "9:00 – 18:00" },
  { day: "Thursday",  time: "9:00 – 20:00" },
  { day: "Friday",    time: "9:00 – 18:00" },
];
const SERVICES = [
  { icon: "🩺", title: "General Checkup",  desc: "Comprehensive health assessments by our experienced physicians with personalised care plans." },
  { icon: "🧬", title: "Lab Diagnostics",  desc: "Advanced laboratory testing and imaging with fast, precise results delivered online." },
  { icon: "💊", title: "Pharmacy",         desc: "In-house pharmacy stocked with all prescribed medications, open 7 days a week." },
];
const DOCTORS = [
  { name: "Dr. Priya Sharma", specialty: "Cardiologist",  exp: "12 yrs experience" },
  { name: "Dr. Arjun Mehta",  specialty: "Neurologist",   exp: "9 yrs experience"  },
  { name: "Dr. Lakshmi Nair", specialty: "Pediatrician",  exp: "15 yrs experience" },
];

export default function MedLabHospital() {
  const [activeNav, setActiveNav] = useState("About Us");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", dept: "", date: "" });
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (form.name && form.phone && form.dept && form.date) {
      setBooked(true);
      setTimeout(() => setBooked(false), 3000);
      setForm({ name: "", phone: "", dept: "", date: "" });
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', 'DM Sans', sans-serif", background: "#f8f9fb", minHeight: "100vh" }}>

      {/* ─── GLOBAL STYLES + MEDIA QUERIES ─── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --primary: #6a5acd;
          --secondary: #8e84c6;
          --bg-light: #f8f9fb;
          --text-dark: #222;
          --text-light: #777;
          --border: #e0e0e0;
        }

        /* ── Buttons ── */
        .btn-primary {
          background: var(--primary);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 700;
          cursor: pointer;
          font-size: 14px;
          transition: background .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 6px 20px rgba(106,90,205,.28);
          font-family: inherit;
        }
        .btn-primary:hover { background: #5848b8; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(106,90,205,.35); }

        .btn-outline {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--secondary);
          border-radius: 50px;
          padding: 11px 28px;
          font-weight: 700;
          cursor: pointer;
          font-size: 14px;
          transition: background .2s;
          font-family: inherit;
        }
        .btn-outline:hover { background: #ede8ff; }

        /* ── Nav ── */
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-light);
          cursor: pointer;
          border: none;
          background: none;
          padding-bottom: 3px;
          border-bottom: 2px solid transparent;
          transition: color .2s, border-color .2s;
          font-family: inherit;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--primary); }
        .nav-link.active { color: var(--primary); border-bottom-color: var(--primary); font-weight: 700; }

        /* ── Card ── */
        .card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 28px;
          transition: box-shadow .25s, border-color .25s, transform .2s;
        }
        .card:hover { box-shadow: 0 10px 36px rgba(106,90,205,.13); border-color: var(--secondary); transform: translateY(-3px); }

        /* ── Tag ── */
        .tag {
          display: inline-block;
          background: #ede8ff;
          color: var(--primary);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 50px;
          margin-bottom: 12px;
        }

        /* ── Form inputs ── */
        .form-input {
          width: 100%;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: var(--text-dark);
          outline: none;
          background: #fafafa;
          transition: border-color .2s, box-shadow .2s;
          font-family: inherit;
        }
        .form-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(106,90,205,.12); background: #fff; }
        .form-label { display: block; font-size: 11px; font-weight: 700; color: var(--text-light); margin-bottom: 5px; letter-spacing: .05em; text-transform: uppercase; }

        /* ── Placeholder image boxes ── */
        .placeholder-box {
          background: linear-gradient(135deg, #ede8ff 0%, #e4dff8 100%);
          border: 2px dashed var(--secondary);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
        }

        /* ── Section title ── */
        .section-title { font-size: 36px; font-weight: 800; color: var(--text-dark); margin: 6px 0 18px; line-height: 1.2; }

        /* ── Footer link ── */
        .footer-link { color: #7a6f96; text-decoration: none; font-size: 13px; transition: color .2s; }
        .footer-link:hover { color: #8e84c6; }

        /* ── Hamburger ── */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--text-dark); border-radius: 2px; transition: .3s; }

        /* ── Mobile menu ── */
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0;
          background: #fff;
          border-top: 1px solid var(--border);
          padding: 8px 0 16px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu .nav-link { padding: 12px 24px; border-bottom: none; font-size: 15px; text-align: left; width: 100%; }
        .mobile-menu .nav-link.active { background: #f0eeff; }

        /* ── Layout helpers ── */
        .hero-grid        { display: flex; align-items: center; gap: 60px; flex-wrap: wrap; }
        .bio-grid         { display: flex; gap: 64px; align-items: center; flex-wrap: wrap; }
        .services-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .doctors-grid     { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .booking-form     { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr auto; gap: 16px; align-items: end; }
        .footer-grid      { display: grid; grid-template-columns: 2fr 1fr 1.5fr 1.5fr; gap: 40px; margin-bottom: 40px; }
        .footer-bottom    { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .stats-row        { display: flex; gap: 44px; margin-top: 44px; padding-top: 32px; border-top: 1px solid var(--border); }
        .hero-buttons     { display: flex; gap: 14px; flex-wrap: wrap; }
        .nav-desktop      { display: flex; gap: 32px; }
        .nav-auth         { display: flex; gap: 12px; align-items: center; }
        .cta-inner        { text-align: center; padding: 0 16px; }

        /* ══════════════════════════════════════
           TABLET  ≤ 1024px
        ══════════════════════════════════════ */
        @media (max-width: 1024px) {
          .hero-grid        { gap: 40px; }
          .bio-grid         { gap: 40px; }
          .section-title    { font-size: 30px; }
          .footer-grid      { grid-template-columns: 1fr 1fr; gap: 32px; }
          .booking-form     { grid-template-columns: 1fr 1fr; }
          .booking-form > button { grid-column: span 2; border-radius: 10px !important; }
        }

        /* ══════════════════════════════════════
           MOBILE  ≤ 768px
        ══════════════════════════════════════ */
        @media (max-width: 768px) {
          /* Nav */
          .nav-desktop { display: none; }
          .nav-auth    { display: none; }
          .hamburger   { display: flex; }

          /* Hero */
          .hero-grid { flex-direction: column; gap: 32px; padding: 48px 20px 48px; }
          .hero-text h1 { font-size: 34px !important; }
          .hero-placeholder { width: 100% !important; height: 260px !important; }
          .stats-row { gap: 24px; flex-wrap: wrap; }

          /* Booking form */
          .booking-form { grid-template-columns: 1fr; }
          .booking-form > button { grid-column: span 1; border-radius: 10px !important; }

          /* Sections */
          .services-grid { grid-template-columns: 1fr; }
          .doctors-grid  { grid-template-columns: 1fr; }
          .bio-grid      { flex-direction: column; gap: 32px; }
          .bio-images    { width: 100% !important; }

          /* Section padding */
          .section-pad   { padding: 60px 20px !important; }
          .section-title { font-size: 26px; }

          /* Footer */
          .footer-grid   { grid-template-columns: 1fr; gap: 28px; }
          .footer-bottom { flex-direction: column; align-items: center; text-align: center; gap: 6px; }

          /* CTA */
          .cta-section   { padding: 52px 20px !important; }
          .cta-inner h2  { font-size: 26px !important; }
        }

        /* ══════════════════════════════════════
           SMALL MOBILE  ≤ 480px
        ══════════════════════════════════════ */
        @media (max-width: 480px) {
          .hero-text h1  { font-size: 28px !important; }
          .section-title { font-size: 22px; }
          .btn-primary, .btn-outline { padding: 10px 20px; font-size: 13px; }
          .stats-row     { gap: 16px; }
          .booking-form  { padding: 18px !important; }
          .cta-inner h2  { font-size: 22px !important; }
        }
      `}</style>

      {/* ─────────────── NAVBAR ─────────────── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>M</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: "var(--text-dark)", whiteSpace: "nowrap" }}>
              MedLab <span style={{ color: "var(--primary)" }}>Hospital</span>
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="nav-desktop">
            {NAV_LINKS.map(l => (
              <button key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => setActiveNav(l)}>{l}</button>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="nav-auth">
            <button className="nav-link" style={{ fontWeight: 600, color: "var(--text-dark)" }}>Sign In</button>
            <button className="btn-primary" style={{ padding: "9px 22px", fontSize: 13 }}>Register</button>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map(l => (
            <button key={l} className={`nav-link${activeNav === l ? " active" : ""}`}
              onClick={() => { setActiveNav(l); setMenuOpen(false); }}>{l}</button>
          ))}
          <div style={{ display: "flex", gap: 12, padding: "12px 24px 0" }}>
            <button className="btn-outline" style={{ flex: 1 }}>Sign In</button>
            <button className="btn-primary" style={{ flex: 1 }}>Register</button>
          </div>
        </div>
      </nav>

      {/* ─────────────── HERO ─────────────── */}
      <section style={{ background: "linear-gradient(135deg, #f0eeff 0%, #f8f9fb 55%, #ede8ff 100%)", padding: "80px 24px" }}>
        <div className="hero-grid" style={{ maxWidth: 1140, margin: "0 auto" }}>
          {/* Text */}
          <div className="hero-text" style={{ flex: "1 1 420px" }}>
            <span className="tag">✦ Trusted Healthcare</span>
            <h1 style={{ fontSize: 52, fontWeight: 900, color: "var(--text-dark)", lineHeight: 1.13, marginBottom: 20 }}>
              We help people to{" "}
              <span style={{ color: "var(--primary)" }}>get appointment</span>{" "}
              in online
            </h1>
            <p style={{ color: "var(--text-light)", fontSize: 15, lineHeight: 1.8, maxWidth: 500, marginBottom: 32 }}>
              MedLab Hospital is a full-service healthcare provider offering innovative
              solutions that deliver the right level of care in the most effective way
              possible. We strive to build a trusted community around your health,
              refining your treatment plan and improving your long-term wellbeing.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Book Appointment</button>
              <button className="btn-outline">Learn More</button>
            </div>
            <div className="stats-row">
              {[{ v: "12K+", l: "Happy Patients" }, { v: "95%", l: "Success Rate" }, { v: "50+", l: "Specialists" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "var(--primary)" }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "var(--text-light)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image placeholder */}
          <div style={{ flex: "1 1 320px", display: "flex", justifyContent: "center" }}>
            <div className="placeholder-box hero-placeholder" style={{ width: 420, height: 400, maxWidth: "100%" }}>
              <span style={{ fontSize: 68, marginBottom: 14 }}>🏥</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Hero Illustration</span>
              <span style={{ fontSize: 11, marginTop: 5, color: "#b0a8d8" }}>Replace with your image</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── BOOKING BAR ─────────────── */}
      <section style={{ background: "var(--primary)", padding: "44px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <p style={{ color: "#d9d4f7", textAlign: "center", fontWeight: 700, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 18 }}>
            ✦ Book an Appointment Online
          </p>
          <div className="booking-form" style={{ background: "#fff", borderRadius: 20, padding: "26px 28px", boxShadow: "0 20px 60px rgba(0,0,0,.18)" }}>
            <div>
              <label className="form-label">Full Name</label>
              <input type="text" placeholder="Your full name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">Preferred Date</label>
              <input type="date" value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">Department</label>
              <select value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} className="form-input">
                <option value="">Select dept.</option>
                {["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "General Medicine"].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <button className="btn-primary" onClick={handleBook}
              style={{ background: booked ? "#22c55e" : "var(--primary)", borderRadius: 12, padding: "12px 24px", whiteSpace: "nowrap", boxShadow: "none" }}>
              {booked ? "✓ Booked!" : "Book Now →"}
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────── SERVICES ─────────────── */}
      <section className="section-pad" style={{ padding: "90px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="tag">What We Offer</span>
            <h2 className="section-title" style={{ margin: "8px auto 0" }}>Our Core Services</h2>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="card">
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "#ede8ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: "var(--text-dark)", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "var(--text-light)", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{s.desc}</p>
                <button style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Learn more →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── WHO WE ARE ─────────────── */}
      <section className="section-pad" style={{ padding: "90px 24px", background: "var(--bg-light)" }}>
        <div className="bio-grid" style={{ maxWidth: 1140, margin: "0 auto" }}>

          {/* Image grid */}
          <div className="bio-images" style={{ flex: "1 1 340px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="placeholder-box" style={{ height: 200 }}>
              <span style={{ fontSize: 44 }}>👨‍⚕️</span>
              <span style={{ fontSize: 11, marginTop: 8 }}>Doctor Image</span>
            </div>
            <div className="placeholder-box" style={{ height: 200, marginTop: 28 }}>
              <span style={{ fontSize: 44 }}>🏨</span>
              <span style={{ fontSize: 11, marginTop: 8 }}>Hospital Image</span>
            </div>
            <div className="placeholder-box" style={{ height: 140, gridColumn: "span 2" }}>
              <span style={{ fontSize: 40 }}>💉</span>
              <span style={{ fontSize: 11, marginTop: 8 }}>Medical Illustration</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: "1 1 340px" }}>
            <span className="tag">Biography</span>
            <h2 className="section-title">Who We Are</h2>
            <p style={{ color: "var(--text-light)", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              MedLab Hospital is a full-service healthcare provider offering innovative
              medical solutions that deliver the right level of care to you. We strive to
              build a caring community around your health, polishing your treatment plan
              and improving your long-term wellbeing.
            </p>
            <p style={{ color: "var(--text-light)", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Our hospital is now one of the most trusted healthcare institutions in the
              region, with the ability to connect patients with top specialists in real time.
            </p>
            <p style={{ color: "var(--primary)", fontWeight: 700, marginBottom: 4, fontSize: 14 }}>Since 2010: time to heal and thrive.</p>
            <p style={{ color: "var(--text-light)", fontSize: 13, fontStyle: "italic", marginBottom: 32 }}>We are your Social Healthcare Partner.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[{ i: "🏅", l: "ISO Certified" }, { i: "🕐", l: "24/7 Emergency" }, { i: "🌐", l: "Online Booking" }].map(b => (
                <div key={b.l} style={{ display: "flex", alignItems: "center", gap: 8, background: "#ede8ff", padding: "8px 16px", borderRadius: 50 }}>
                  <span style={{ fontSize: 16 }}>{b.i}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>{b.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── DOCTORS ─────────────── */}
      <section className="section-pad" style={{ padding: "90px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="tag">Meet the Team</span>
            <h2 className="section-title" style={{ margin: "8px auto 0" }}>Our Specialist Doctors</h2>
          </div>
          <div className="doctors-grid">
            {DOCTORS.map(doc => (
              <div key={doc.name} style={{ borderRadius: 18, border: "1px solid var(--border)", overflow: "hidden", background: "#fff", transition: "box-shadow .2s, transform .2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 36px rgba(106,90,205,.16)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                <div className="placeholder-box" style={{ height: 200, borderRadius: 0 }}>
                  <span style={{ fontSize: 54 }}>👨‍⚕️</span>
                  <span style={{ fontSize: 11, marginTop: 8 }}>Doctor Photo</span>
                </div>
                <div style={{ padding: "22px 24px" }}>
                  <h3 style={{ fontWeight: 800, fontSize: 17, color: "var(--text-dark)", marginBottom: 4 }}>{doc.name}</h3>
                  <p style={{ color: "var(--primary)", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{doc.specialty}</p>
                  <p style={{ color: "var(--text-light)", fontSize: 12, marginBottom: 18 }}>{doc.exp}</p>
                  <button className="btn-primary" style={{ width: "100%", borderRadius: 10, padding: "10px", fontSize: 13, boxShadow: "none" }}>Book Appointment</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA BANNER ─────────────── */}
      <section className="cta-section" style={{ background: "linear-gradient(135deg, #6a5acd 0%, #8e84c6 100%)", padding: "70px 24px" }}>
        <div className="cta-inner">
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Ready to Book Your Appointment?</h2>
          <p style={{ color: "#d9d4f7", fontSize: 15, marginBottom: 32 }}>
            Join over 12,000 patients who trust MedLab Hospital for their healthcare needs.
          </p>
          <button className="btn-primary" style={{ background: "#fff", color: "var(--primary)", fontSize: 15, padding: "14px 36px", boxShadow: "0 8px 28px rgba(0,0,0,.18)" }}>
            Get Started Today →
          </button>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer style={{ background: "#1a1628", color: "#a89ec9", padding: "60px 24px 24px" }}>
        <div className="footer-grid" style={{ maxWidth: 1140, margin: "0 auto" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontWeight: 800 }}>M</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>MedLab Hospital</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "#7a6f96", maxWidth: 260 }}>
              Providing compassionate, world-class healthcare in Chennai, Tamil Nadu since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 20 }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUICK_LINKS.map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 20 }}>Hours</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {HOURS.map(h => (
                <div key={h.day} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, gap: 12 }}>
                  <span style={{ color: "#a89ec9" }}>{h.day}</span>
                  <span style={{ color: "#7a6f96" }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 20 }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[{ i: "📞", t: "044-2345-6789" }, { i: "✉️", t: "info@medlab.com" }, { i: "📍", t: "Anna Nagar, Chennai, TN" }].map(c => (
                <div key={c.t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span>{c.i}</span>
                  <span style={{ fontSize: 13, color: "#7a6f96", lineHeight: 1.5 }}>{c.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ maxWidth: 1140, margin: "0 auto", borderTop: "1px solid #2d2445", paddingTop: 22, fontSize: 12, color: "#4a3f6b" }}>
          <span>© 2026 MedLab Hospital. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
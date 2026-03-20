import { useState } from "react";

const NAV_LINKS = ["Home", "Appointment", "Services", "About Us", "Contact Us"];
const QUICK_LINKS = ["Home", "Appointment", "Services", "About Us", "Contact Us"];
const HOURS = [
  { day: "Monday", time: "9:00 – 18:00" },
  { day: "Tuesday", time: "9:00 – 19:00" },
  { day: "Wednesday", time: "9:00 – 18:00" },
  { day: "Thursday", time: "9:00 – 20:00" },
  { day: "Friday", time: "9:00 – 18:00" },
];

const DEPARTMENTS = [
  "General Checkup", "Lab Diagnostics", "Pharmacy", "Cardiology",
  "Neurology", "Pediatrics", "Orthopedics", "Ophthalmology", "Dental Care",
];

const DOCTORS = [
  { name: "Dr. Priya Sharma",  dept: "Cardiology",     exp: "12 yrs", icon: "👩‍⚕️" },
  { name: "Dr. Arjun Mehta",   dept: "Neurology",      exp: "9 yrs",  icon: "👨‍⚕️" },
  { name: "Dr. Lakshmi Nair",  dept: "Pediatrics",     exp: "15 yrs", icon: "👩‍⚕️" },
  { name: "Dr. Ramesh Iyer",   dept: "Orthopedics",    exp: "11 yrs", icon: "👨‍⚕️" },
  { name: "Dr. Kavitha Menon", dept: "Ophthalmology",  exp: "8 yrs",  icon: "👩‍⚕️" },
  { name: "Dr. Suresh Kumar",  dept: "Dental Care",    exp: "10 yrs", icon: "👨‍⚕️" },
];

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function AppointmentPage() {
  const [activePage, setActivePage] = useState("Appointment");
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", dept: "", doctor: "", date: "", time: "", type: "In-Person", notes: "" });
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (form.name && form.phone && form.dept && form.date && form.time) {
      setBooked(true);
    }
  };

  const inputCls = "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all bg-gray-50 focus:bg-white";
  const labelCls = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5";

  if (booked) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-6">✅</div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Appointment Confirmed!</h1>
        <p className="text-gray-500 text-base max-w-sm mb-2">
          Your appointment has been booked successfully. A confirmation SMS & email has been sent.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6 text-left w-full max-w-sm shadow-lg">
          <div className="flex flex-col gap-3">
            {[
              { l: "Patient", v: form.name },
              { l: "Department", v: form.dept || "General Checkup" },
              { l: "Date", v: form.date },
              { l: "Time", v: form.time },
              { l: "Type", v: form.type },
            ].map(r => (
              <div key={r.l} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-none last:pb-0">
                <span className="text-gray-400 font-medium">{r.l}</span>
                <span className="text-gray-900 font-bold">{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => { setBooked(false); setForm({ name: "", email: "", phone: "", dept: "", doctor: "", date: "", time: "", type: "In-Person", notes: "" }); setStep(1); }}
          className="mt-8 bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-violet-200">
          Book Another →
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
              <span className="text-white font-extrabold text-base">M</span>
            </div>
            <span className="font-extrabold text-lg text-gray-900">
              MedLab <span className="text-violet-600">Hospital</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => setActivePage(link)}
                className={`text-sm font-medium pb-0.5 border-b-2 transition-colors ${activePage === link ? "text-violet-600 border-violet-600 font-bold" : "text-gray-500 border-transparent hover:text-violet-600"}`}>
                {link}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-semibold text-gray-700 hover:text-violet-600 transition-colors">Sign In</button>
            <button className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-violet-200 transition-all">Register</button>
          </div>
          <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(o => !o)}>
            <span className={`block w-6 h-0.5 bg-gray-800 rounded transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 rounded transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4 pt-2 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => { setActivePage(link); setMenuOpen(false); }}
                className={`text-left text-sm font-medium py-3 px-2 rounded-lg transition-colors ${activePage === link ? "text-violet-600 bg-violet-50 font-bold" : "text-gray-600 hover:text-violet-600"}`}>
                {link}
              </button>
            ))}
            <div className="flex gap-3 mt-2 pt-3 border-t border-gray-100">
              <button className="flex-1 border-2 border-violet-300 text-violet-600 font-bold py-2 rounded-full text-sm">Sign In</button>
              <button className="flex-1 bg-violet-600 text-white font-bold py-2 rounded-full text-sm">Register</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── PAGE HERO ── */}
      <div className="bg-gradient-to-br from-violet-50 via-white to-purple-50 py-16 px-6 text-center">
        <p className="text-violet-400 text-sm mb-3">Home › <span className="text-violet-600 font-semibold">Appointment</span></p>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Book an Appointment</h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          Schedule a visit with our specialists in just a few clicks.
          Same-day appointments available for most departments.
        </p>
      </div>

      {/* ── STEP INDICATOR ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {[{ n: 1, l: "Patient Info" }, { n: 2, l: "Choose Service" }, { n: 3, l: "Date & Time" }].map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold transition-all
                  ${step >= s.n ? "bg-violet-600 text-white shadow-lg shadow-violet-200" : "bg-gray-200 text-gray-400"}`}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span className={`text-xs font-bold mt-1.5 hidden sm:block ${step >= s.n ? "text-violet-600" : "text-gray-400"}`}>{s.l}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 mx-3 ${step > s.n ? "bg-violet-600" : "bg-gray-200"} transition-all`} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN FORM ── */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-violet-50">

            {/* STEP 1 – Patient Info */}
            {step === 1 && (
              <div>
                <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Step 1 of 3</span>
                <h2 className="text-2xl font-black text-gray-900 mb-6">Your Information</h2>
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input type="text" placeholder="Your full name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone *</label>
                      <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input type="email" placeholder="you@example.com" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Consultation Type</label>
                    <div className="flex gap-3">
                      {["In-Person", "Video Call"].map(t => (
                        <button key={t} onClick={() => setForm({ ...form, type: t })}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${form.type === t ? "bg-violet-600 border-violet-600 text-white" : "border-gray-200 text-gray-500 hover:border-violet-300"}`}>
                          {t === "In-Person" ? "🏥 " : "📹 "}{t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => form.name && form.phone && setStep(2)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${form.name && form.phone ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    Continue to Service Selection →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 – Choose Service */}
            {step === 2 && (
              <div>
                <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Step 2 of 3</span>
                <h2 className="text-2xl font-black text-gray-900 mb-6">Choose Department & Doctor</h2>
                <div className="flex flex-col gap-5">
                  <div>
                    <label className={labelCls}>Department *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {DEPARTMENTS.map(d => (
                        <button key={d} onClick={() => setForm({ ...form, dept: d })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all text-center ${form.dept === d ? "bg-violet-600 border-violet-600 text-white" : "border-gray-200 text-gray-600 hover:border-violet-300 bg-white"}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Doctor (optional)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DOCTORS.map(doc => (
                        <button key={doc.name} onClick={() => setForm({ ...form, doctor: doc.name })}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${form.doctor === doc.name ? "bg-violet-50 border-violet-500" : "border-gray-200 hover:border-violet-300 bg-white"}`}>
                          <span className="text-2xl">{doc.icon}</span>
                          <div>
                            <p className={`text-xs font-extrabold ${form.doctor === doc.name ? "text-violet-700" : "text-gray-800"}`}>{doc.name}</p>
                            <p className="text-xs text-gray-400">{doc.dept} · {doc.exp}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Additional Notes</label>
                    <textarea placeholder="Any symptoms, allergies, or special requests..." value={form.notes}
                      onChange={e => setForm({ ...form, notes: e.target.value })}
                      rows={3} className={inputCls + " resize-none"} />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl text-sm hover:border-violet-300 transition-all">← Back</button>
                    <button onClick={() => form.dept && setStep(3)}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${form.dept ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                      Continue to Date & Time →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 – Date & Time */}
            {step === 3 && (
              <div>
                <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Step 3 of 3</span>
                <h2 className="text-2xl font-black text-gray-900 mb-6">Pick Date & Time</h2>
                <div className="flex flex-col gap-5">
                  <div>
                    <label className={labelCls}>Preferred Date *</label>
                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Time *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map(t => (
                        <button key={t} onClick={() => setForm({ ...form, time: t })}
                          className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${form.time === t ? "bg-violet-600 border-violet-600 text-white" : "border-gray-200 text-gray-600 hover:border-violet-300 bg-white"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  {form.date && form.time && (
                    <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
                      <h4 className="font-extrabold text-violet-700 text-sm mb-3">📋 Appointment Summary</h4>
                      <div className="flex flex-col gap-2">
                        {[
                          { l: "Patient", v: form.name },
                          { l: "Type", v: form.type },
                          { l: "Department", v: form.dept },
                          { l: "Doctor", v: form.doctor || "Any Available" },
                          { l: "Date", v: form.date },
                          { l: "Time", v: form.time },
                        ].map(r => (
                          <div key={r.l} className="flex justify-between text-xs">
                            <span className="text-violet-500 font-semibold">{r.l}</span>
                            <span className="text-violet-800 font-bold">{r.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl text-sm hover:border-violet-300 transition-all">← Back</button>
                    <button onClick={handleBook}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${form.date && form.time ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                      Confirm Appointment ✓
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── WHY BOOK ONLINE ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Benefits</span>
            <h2 className="text-3xl font-black text-gray-900">Why Book Online?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { i: "⚡", t: "Instant Confirmation",   d: "Get a confirmed slot immediately without waiting on hold." },
              { i: "🕐", t: "24/7 Availability",      d: "Book anytime — day or night, weekday or weekend." },
              { i: "🔔", t: "Smart Reminders",        d: "Automated SMS & email reminders before your visit." },
              { i: "🔄", t: "Easy Rescheduling",      d: "Change or cancel your appointment with just one click." },
            ].map(b => (
              <div key={b.t} className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-violet-50 transition-colors">
                <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">{b.i}</div>
                <h4 className="font-extrabold text-gray-900 text-sm mb-2">{b.t}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
                <span className="text-white font-extrabold">M</span>
              </div>
              <span className="text-white font-extrabold text-base">MedLab Hospital</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">Providing compassionate, world-class healthcare in Chennai, Tamil Nadu since 2010.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(l => <a key={l} href="#" className="text-gray-500 hover:text-violet-400 text-sm transition-colors">{l}</a>)}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Hours</h4>
            <div className="flex flex-col gap-2.5">
              {HOURS.map(h => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span className="text-gray-400">{h.day}</span>
                  <span className="text-gray-500">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              {[{ i: "📞", t: "044-2345-6789" }, { i: "✉️", t: "info@medlab.com" }, { i: "📍", t: "Anna Nagar, Chennai, TN" }].map(c => (
                <div key={c.t} className="flex gap-2 items-start">
                  <span className="text-sm">{c.i}</span>
                  <span className="text-gray-500 text-sm">{c.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-600">
          <span>© 2026 MedLab Hospital. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
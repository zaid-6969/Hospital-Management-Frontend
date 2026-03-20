import { useState } from "react";

const NAV_LINKS = ["Home", "Appointment", "Services", "About Us", "Contact Us"];
const QUICK_LINKS = ["Home", "Appointment", "Services", "About Us", "Contact Us"];
const HOURS = [
  { day: "Monday",    time: "9:00 – 18:00" },
  { day: "Tuesday",   time: "9:00 – 19:00" },
  { day: "Wednesday", time: "9:00 – 18:00" },
  { day: "Thursday",  time: "9:00 – 20:00" },
  { day: "Friday",    time: "9:00 – 18:00" },
  { day: "Saturday",  time: "10:00 – 14:00" },
  { day: "Sunday",    time: "Closed" },
];

const INFO_CARDS = [
  { i: "📞", title: "Phone",      value: "044-2345-6789",          sub: "Mon–Fri  9am – 8pm",  bg: "bg-violet-100", text: "text-violet-700" },
  { i: "✉️", title: "Email",      value: "info@medlab.com",         sub: "Reply within 2 hrs",  bg: "bg-purple-100",  text: "text-purple-700" },
  { i: "📍", title: "Address",    value: "Anna Nagar, Chennai, TN", sub: "Near Metro Station",  bg: "bg-indigo-100",  text: "text-indigo-700" },
  { i: "🚨", title: "Emergency",  value: "1800-MED-HELP",           sub: "Available 24 / 7",    bg: "bg-red-100",     text: "text-red-600"   },
];

export default function ContactPage() {
  const [activePage, setActivePage] = useState("Contact Us");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  const inputCls = "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all bg-gray-50 focus:bg-white";
  const labelCls = "block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5";

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
        <p className="text-violet-400 text-sm mb-3">Home › <span className="text-violet-600 font-semibold">Contact Us</span></p>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          Have a question, want to book an appointment, or just need directions?
          We're here to help 24 hours a day, 7 days a week.
        </p>
      </div>

      {/* ── INFO CARDS ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {INFO_CARDS.map(c => (
              <div key={c.title} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 ${c.bg} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}>{c.i}</div>
                <p className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-1.5`}>{c.title}</p>
                <p className="font-extrabold text-gray-900 text-sm mb-1">{c.value}</p>
                <p className="text-gray-400 text-xs">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* ── FORM + MAP ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div>
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Send a Message</span>
              <h2 className="text-3xl font-black text-gray-900 mb-2">We'd love to hear from you</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Fill out the form and our team will get back to you within 2 business hours.
              </p>

              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input type="text" placeholder="Your name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input type="email" placeholder="you@example.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className={inputCls}>
                    <option value="">Select a topic</option>
                    {["Appointment Booking", "Lab Results", "Billing & Insurance", "Feedback", "Emergency", "General Enquiry"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Message *</label>
                  <textarea placeholder="Tell us how we can help you..." value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={5} className={inputCls + " resize-none"} />
                </div>
                <button onClick={handleSend}
                  className={`${sent ? "bg-green-500" : "bg-violet-600 hover:bg-violet-700"} text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-violet-200`}>
                  {sent ? "✓ Message Sent! We'll be in touch soon." : "Send Message →"}
                </button>
              </div>
            </div>

            {/* Map + Hours */}
            <div>
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Find Us</span>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Our Location</h2>

              {/* Map placeholder */}
              <div className="h-64 bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-dashed border-violet-300 rounded-2xl flex flex-col items-center justify-center mb-7">
                <span className="text-5xl mb-3">🗺️</span>
                <span className="font-semibold text-violet-500 text-sm">Interactive Map</span>
                <span className="text-violet-300 text-xs mt-1">Replace with Google Maps embed</span>
              </div>

              {/* Hours table */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-violet-600 px-5 py-3.5">
                  <h4 className="text-white font-bold text-sm">🕐 Opening Hours</h4>
                </div>
                <div>
                  {HOURS.map((h, i) => (
                    <div key={h.day} className={`flex justify-between px-5 py-3 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                      <span className="text-gray-700 font-medium">{h.day}</span>
                      <span className={`font-bold ${h.time === "Closed" ? "text-red-500" : "text-violet-600"}`}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL + EMERGENCY + APP ── */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Emergency */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-7">
            <div className="text-4xl mb-4">🚨</div>
            <h3 className="font-extrabold text-red-700 text-xl mb-3">Emergency Line</h3>
            <p className="text-red-600 text-sm leading-relaxed mb-5">
              For life-threatening emergencies, call our 24/7 emergency line immediately.
              Our rapid response team is always ready.
            </p>
            <div className="text-2xl font-black text-red-700">1800-MED-HELP</div>
          </div>

          {/* Social */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7">
            <div className="text-4xl mb-4">📲</div>
            <h3 className="font-extrabold text-gray-900 text-xl mb-3">Follow Us</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Stay updated with health tips, news, and announcements from MedLab Hospital.
            </p>
            <div className="flex gap-3">
              {[
                { n: "F", bg: "bg-blue-600", label: "Facebook" },
                { n: "IG", bg: "bg-pink-500", label: "Instagram" },
                { n: "X", bg: "bg-gray-900", label: "Twitter / X" },
                { n: "YT", bg: "bg-red-600", label: "YouTube" },
              ].map(s => (
                <button key={s.n} title={s.label}
                  className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center text-white text-xs font-extrabold hover:opacity-80 transition-opacity`}>
                  {s.n}
                </button>
              ))}
            </div>
          </div>

          {/* App Download */}
          <div className="bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200 rounded-2xl p-7">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-extrabold text-violet-700 text-xl mb-3">MedLab App</h3>
            <p className="text-violet-600 text-sm leading-relaxed mb-5">
              Book appointments, view lab results, chat with your doctor, and manage
              prescriptions — all from your phone.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all">
                📥 App Store
              </button>
              <button className="border-2 border-violet-400 text-violet-600 font-bold text-xs px-4 py-2.5 rounded-full hover:bg-violet-50 transition-colors">
                📥 Play Store
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 py-20 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to Book Your Appointment?</h2>
        <p className="text-violet-200 text-base mb-8 max-w-md mx-auto">Join over 12,000 patients who trust MedLab Hospital for their healthcare needs.</p>
        <button className="bg-white text-violet-600 font-black px-8 py-4 rounded-full text-base shadow-xl hover:-translate-y-0.5 transition-all">
          Get Started Today →
        </button>
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
              {HOURS.slice(0, 5).map(h => (
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
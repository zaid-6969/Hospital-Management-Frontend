import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HOURS = [
  { day: "Monday",    time: "9:00 – 18:00" },
  { day: "Tuesday",   time: "9:00 – 19:00" },
  { day: "Wednesday", time: "9:00 – 18:00" },
  { day: "Thursday",  time: "9:00 – 20:00" },
  { day: "Friday",    time: "9:00 – 18:00" },
];

const INFO_CARDS = [
  { i: "📞", title: "Phone",     value: "044-2345-6789",        sub: "Mon–Fri  9am – 8pm",   bg: "bg-violet-100", text: "text-violet-700" },
  { i: "✉️", title: "Email",     value: "info@medlab.com",      sub: "Reply within 2 hrs",    bg: "bg-purple-100", text: "text-purple-700" },
  { i: "📍", title: "Address",   value: "Anna Nagar, Chennai",  sub: "Near Metro Station",    bg: "bg-indigo-100", text: "text-indigo-700" },
  { i: "🚨", title: "Emergency", value: "1800-MED-HELP",        sub: "Available 24 / 7",      bg: "bg-red-100",    text: "text-red-600"   },
];

/* ── SVG Map illustration ── */
const MapSVG = () => (
  <svg viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="480" height="240" fill="#e8f4f0"/>
    {/* Roads */}
    <rect x="0" y="110" width="480" height="20" fill="#fff" opacity="0.9"/>
    <rect x="200" y="0" width="20" height="240" fill="#fff" opacity="0.9"/>
    <rect x="320" y="0" width="14" height="240" fill="#fff" opacity="0.7"/>
    <rect x="0" y="60" width="480" height="12" fill="#fff" opacity="0.6"/>
    <rect x="0" y="170" width="480" height="12" fill="#fff" opacity="0.6"/>
    <rect x="100" y="0" width="12" height="240" fill="#fff" opacity="0.6"/>
    {/* Road dashes */}
    {[20,60,100,140,180,240,280,320,360,400,440].map(x => (
      <rect key={x} x={x} y="119" width="18" height="2" rx="1" fill="#d1d5db" opacity="0.8"/>
    ))}
    {[15,45,75,105,135,165,195].map(y => (
      <rect key={y} x="209" y={y} width="2" height="14" rx="1" fill="#d1d5db" opacity="0.8"/>
    ))}
    {/* City blocks */}
    <rect x="20" y="20" width="70" height="32" rx="4" fill="#c7d2fe" opacity="0.6"/>
    <rect x="20" y="132" width="70" height="28" rx="4" fill="#c7d2fe" opacity="0.6"/>
    <rect x="230" y="20" width="75" height="32" rx="4" fill="#bbf7d0" opacity="0.6"/>
    <rect x="230" y="132" width="75" height="28" rx="4" fill="#bbf7d0" opacity="0.6"/>
    <rect x="340" y="20" width="80" height="32" rx="4" fill="#fde68a" opacity="0.5"/>
    <rect x="340" y="132" width="80" height="28" rx="4" fill="#fde68a" opacity="0.5"/>
    <rect x="20" y="182" width="70" height="40" rx="4" fill="#fed7aa" opacity="0.5"/>
    <rect x="230" y="182" width="75" height="40" rx="4" fill="#c7d2fe" opacity="0.5"/>
    <rect x="340" y="182" width="80" height="40" rx="4" fill="#bbf7d0" opacity="0.5"/>
    <rect x="120" y="20" width="65" height="32" rx="4" fill="#fce7f3" opacity="0.6"/>
    <rect x="120" y="132" width="65" height="28" rx="4" fill="#fce7f3" opacity="0.5"/>
    {/* Hospital marker */}
    <circle cx="210" cy="120" r="26" fill="#7c3aed" opacity="0.18"/>
    <circle cx="210" cy="120" r="18" fill="#7c3aed" opacity="0.4"/>
    <circle cx="210" cy="120" r="10" fill="#7c3aed"/>
    {/* Hospital cross on pin */}
    <rect x="205" y="116" width="10" height="3" rx="1.5" fill="white"/>
    <rect x="208" y="113" width="3" height="9" rx="1.5" fill="white"/>
    {/* Pin tail */}
    <polygon points="210,135 204,124 216,124" fill="#7c3aed"/>
    {/* Label */}
    <rect x="140" y="78" width="140" height="24" rx="12" fill="#7c3aed"/>
    <text x="210" y="95" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">MedLab Hospital</text>
    {/* Nearby labels */}
    <text x="55" y="40" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="500">Shopping</text>
    <text x="267" y="40" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="500">Park</text>
    <text x="380" y="40" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="500">School</text>
    <text x="55" y="150" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="500">Clinic</text>
    <text x="267" y="150" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="500">Metro →</text>
    <text x="210" y="212" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="500">Anna Nagar, Chennai</text>
    {/* Scale bar */}
    <rect x="380" y="220" width="60" height="2" rx="1" fill="#9ca3af"/>
    <rect x="380" y="216" width="2" height="8" rx="1" fill="#9ca3af"/>
    <rect x="440" y="216" width="2" height="8" rx="1" fill="#9ca3af"/>
    <text x="410" y="213" textAnchor="middle" fontSize="6" fill="#9ca3af">500m</text>
  </svg>
);

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  const inputCls = "w-full border-2 border-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all bg-bg focus:bg-card text-text";
  const labelCls = "block text-xs font-bold text-text/50 uppercase tracking-wider mb-1.5";

  return (
    <div className="font-sans bg-bg min-h-screen">

      {/* ── PAGE HERO ── */}
      <div className="bg-bg py-16 px-6 text-center">
        <p className="text-violet-400 text-sm mb-3">Home › <span className="text-violet-600 font-semibold">Contact Us</span></p>
        <h1 className="text-4xl sm:text-5xl font-black text-text mb-4">Get in Touch</h1>
        <p className="text-text/70 text-base max-w-xl mx-auto leading-relaxed">
          Have a question, want to book an appointment, or just need directions? We're here 24/7.
        </p>
        <button onClick={() => navigate("/user/appointment")} className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-bold px-7 py-3 rounded-full text-sm shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5">
          📅 Book an Appointment
        </button>
      </div>

      {/* ── INFO CARDS ── */}
      <section className="py-14 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {INFO_CARDS.map(c => (
              <div key={c.title} className="bg-card border border-secondary rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 ${c.bg} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}>{c.i}</div>
                <p className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-1.5`}>{c.title}</p>
                <p className="font-extrabold text-text text-sm mb-1">{c.value}</p>
                <p className="text-text/50 text-xs">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* ── FORM + MAP ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Send a Message</span>
              <h2 className="text-3xl font-black text-text mb-6">We'd Love to Hear from You</h2>
              {sent && (
                <div className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3 text-sm font-semibold">
                  ✅ Message sent! We'll get back to you within 2 hours.
                </div>
              )}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>Full Name *</label><input className={inputCls} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                  <div><label className={labelCls}>Phone</label><input className={inputCls} placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                </div>
                <div><label className={labelCls}>Email *</label><input className={inputCls} type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><label className={labelCls}>Subject</label><input className={inputCls} placeholder="How can we help?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></div>
                <div><label className={labelCls}>Message *</label><textarea className={`${inputCls} resize-none`} rows={5} placeholder="Write your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
                <div className="flex gap-3">
                  <button onClick={handleSend} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl text-sm transition-all">Send Message</button>
                  <button onClick={() => navigate("/user/appointment")} className="flex-1 border-2 border-violet-300 text-violet-600 font-bold py-3 rounded-xl text-sm hover:bg-violet-50 transition-colors">📅 Book Appointment</button>
                </div>
              </div>
            </div>

            {/* Map + Hours */}
            <div>
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Find Us</span>
              <h2 className="text-3xl font-black text-text mb-6">Our Location</h2>
              {/* SVG Map */}
              <div className="h-64 rounded-2xl overflow-hidden shadow-lg mb-7 border border-violet-100">
                <MapSVG />
              </div>
              {/* Hours table */}
              <div className="bg-card border border-secondary rounded-2xl overflow-hidden">
                <div className="bg-violet-600 px-5 py-3.5">
                  <h4 className="font-bold text-white text-sm">🕐 Opening Hours</h4>
                </div>
                {HOURS.map((h, i) => (
                  <div key={h.day} className={`flex justify-between px-5 py-3 text-sm ${i % 2 === 0 ? "bg-bg" : "bg-card"}`}>
                    <span className="text-text/70 font-medium">{h.day}</span>
                    <span className="font-bold text-violet-600">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL + EMERGENCY + APP ── */}
      <section className="py-16 px-6 bg-bg">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-7">
            <div className="text-4xl mb-4">🚨</div>
            <h3 className="font-extrabold text-red-700 text-xl mb-3">Emergency Line</h3>
            <p className="text-red-600 text-sm leading-relaxed mb-5">For life-threatening emergencies, call our 24/7 emergency line immediately.</p>
            <div className="text-2xl font-black text-red-700">1800-MED-HELP</div>
          </div>
          <div className="bg-card border border-secondary rounded-2xl p-7">
            <div className="text-4xl mb-4">📲</div>
            <h3 className="font-extrabold text-text text-xl mb-3">Follow Us</h3>
            <p className="text-text/70 text-sm leading-relaxed mb-5">Stay updated with health tips, news, and announcements from MedLab Hospital.</p>
            <div className="flex gap-3">
              {[{ n: "F", bg: "bg-blue-600" }, { n: "IG", bg: "bg-pink-500" }, { n: "X", bg: "bg-gray-800" }, { n: "YT", bg: "bg-red-600" }].map(s => (
                <button key={s.n} className={`w-10 h-10 ${s.bg} text-white rounded-xl flex items-center justify-center text-xs font-extrabold hover:opacity-80 transition-opacity`}>{s.n}</button>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200 rounded-2xl p-7">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-extrabold text-violet-700 text-xl mb-3">MedLab App</h3>
            <p className="text-violet-600 text-sm leading-relaxed mb-5">Book appointments, view lab results, chat with your doctor — all from your phone.</p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all">📥 App Store</button>
              <button className="border-2 border-violet-400 text-violet-600 font-bold text-xs px-4 py-2.5 rounded-full hover:bg-violet-50 transition-colors">📥 Play Store</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
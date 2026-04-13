import { useState } from "react";
import { useNavigate } from "react-router-dom";


const INFO_CARDS = [
  {
    i: "📞",
    title: "Phone",
    value: "044-2345-6789",
    sub: "Mon–Fri  9am – 8pm",
    bg: "bg-violet-100",
    text: "text-violet-700",
  },
  {
    i: "✉️",
    title: "Email",
    value: "info@medlab.com",
    sub: "Reply within 2 hrs",
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  {
    i: "📍",
    title: "Address",
    value: "Anna Nagar, Chennai",
    sub: "Near Metro Station",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
  },
  {
    i: "🚨",
    title: "Emergency",
    value: "1800-MED-HELP",
    sub: "Available 24 / 7",
    bg: "bg-red-100",
    text: "text-red-600",
  },
];


export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  const inputCls =
    "w-full border-2 border-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all bg-bg focus:bg-card text-text";
  const labelCls =
    "block text-xs font-bold text-text/50 uppercase tracking-wider mb-1.5";

  return (
    <div className="font-sans bg-bg min-h-screen">
      {/* ── PAGE HERO ── */}
      <div className="bg-bg py-16 px-6 text-center">
        <p className="text-violet-400 text-sm mb-3">
          Home ›{" "}
          <span className="text-violet-600 font-semibold">Contact Us</span>
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-text mb-4">
          Get in Touch
        </h1>
        <p className="text-text/70 text-base max-w-xl mx-auto leading-relaxed">
          Have a question, want to book an appointment, or just need directions?
          We're here 24/7.
        </p>
        <button
          onClick={() => navigate("/user/appointment")}
          className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-bold px-7 py-3 rounded-full text-sm shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5"
        >
          📅 Book an Appointment
        </button>
      </div>

      {/* ── INFO CARDS ── */}
      <section className="py-14 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {INFO_CARDS.map((c) => (
              <div
                key={c.title}
                className="bg-card border border-secondary rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 transition-all"
              >
                <div
                  className={`w-14 h-14 ${c.bg} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}
                >
                  {c.i}
                </div>
                <p
                  className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-1.5`}
                >
                  {c.title}
                </p>
                <p className="font-extrabold text-text text-sm mb-1">
                  {c.value}
                </p>
                <p className="text-text/50 text-xs">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* ── FORM + MAP ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                Send a Message
              </span>
              <h2 className="text-3xl font-black text-text mb-6">
                We'd Love to Hear from You
              </h2>
              {sent && (
                <div className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3 text-sm font-semibold">
                  ✅ Message sent! We'll get back to you within 2 hours.
                </div>
              )}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input
                      className={inputCls}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input
                      className={inputCls}
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input
                    className={inputCls}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Subject</label>
                  <input
                    className={inputCls}
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Message *</label>
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={5}
                    placeholder="Write your message..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSend}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl text-sm transition-all"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={() => navigate("/user/appointment")}
                    className="flex-1 border-2 border-violet-300 text-violet-600 font-bold py-3 rounded-xl text-sm hover:bg-violet-50 transition-colors"
                  >
                    📅 Book Appointment
                  </button>
                </div>
              </div>
            </div>

            {/* Map + Hours */}
            <div>
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                Find Us
              </span>
              <h2 className="text-3xl font-black text-text mb-6">
                Our Location
              </h2>
              {/* SVG Map */}
              <div className=" rounded-2xl overflow-hidden shadow-lg mb-7 border border-violet-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.54120601241!2d78.7166397750042!3d12.937182615632082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad75bf74e64415%3A0x58251231fc5de87f!2sColan%20Infotech%20(Java%2C%20.Net%2C%20PHP%2C%20Mobile%20App%20Development%20Company)!5e0!3m2!1sen!2sin!4v1776084171053!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
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
            <h3 className="font-extrabold text-red-700 text-xl mb-3">
              Emergency Line
            </h3>
            <p className="text-red-600 text-sm leading-relaxed mb-5">
              For life-threatening emergencies, call our 24/7 emergency line
              immediately.
            </p>
            <div className="text-2xl font-black text-red-700">
              1800-MED-HELP
            </div>
          </div>
          <div className="bg-card border border-secondary rounded-2xl p-7">
            <div className="text-4xl mb-4">📲</div>
            <h3 className="font-extrabold text-text text-xl mb-3">Follow Us</h3>
            <p className="text-text/70 text-sm leading-relaxed mb-5">
              Stay updated with health tips, news, and announcements from MedLab
              Hospital.
            </p>
            <div className="flex gap-3">
              {[
                { n: "F", bg: "bg-blue-600" },
                { n: "IG", bg: "bg-pink-500" },
                { n: "X", bg: "bg-gray-800" },
                { n: "YT", bg: "bg-red-600" },
              ].map((s) => (
                <button
                  key={s.n}
                  className={`w-10 h-10 ${s.bg} text-white rounded-xl flex items-center justify-center text-xs font-extrabold hover:opacity-80 transition-opacity`}
                >
                  {s.n}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200 rounded-2xl p-7">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-extrabold text-violet-700 text-xl mb-3">
              MedLab App
            </h3>
            <p className="text-violet-600 text-sm leading-relaxed mb-5">
              Book appointments, view lab results, chat with your doctor — all
              from your phone.
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
    </div>
  );
}

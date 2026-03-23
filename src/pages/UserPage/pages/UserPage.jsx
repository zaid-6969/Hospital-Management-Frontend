import { useState } from "react";
const SERVICES = [
  {
    icon: "🩺",
    title: "General Checkup",
    desc: "Comprehensive health assessments by experienced physicians with personalised care plans.",
  },
  {
    icon: "🧬",
    title: "Lab Diagnostics",
    desc: "Advanced laboratory testing and imaging with fast, precise results delivered online.",
  },
  {
    icon: "💊",
    title: "Pharmacy",
    desc: "In-house pharmacy stocked with all prescribed medications, open 7 days a week.",
  },
];

const DOCTORS = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    exp: "12 yrs experience",
    icon: "👩‍⚕️",
  },
  {
    name: "Dr. Arjun Mehta",
    specialty: "Neurologist",
    exp: "9 yrs experience",
    icon: "👨‍⚕️",
  },
  {
    name: "Dr. Lakshmi Nair",
    specialty: "Pediatrician",
    exp: "15 yrs experience",
    icon: "👩‍⚕️",
  },
];

const TESTIMONIALS = [
  {
    name: "Ravi Kumar",
    text: "The online booking was so easy and the doctor was incredibly thorough. Highly recommend MedLab Hospital!",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    text: "Got my lab results online within hours. The staff was professional and the facilities are world-class.",
    rating: 5,
  },
  {
    name: "Mohammed Farhan",
    text: "My kids love coming here. The pediatrics team is amazing — patient, kind, and extremely knowledgeable.",
    rating: 5,
  },
];


export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
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
    <div className="font-sans bg-gray-50 min-h-screen">
        {/* ── HERO ── */}
        <section className="bg-gradient-to-br from-violet-50 via-white to-purple-50 py-10 px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                ✦ Trusted Healthcare
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                We help people to{" "}
                <span className="text-violet-600">get appointment</span> in
                online
              </h1>
              <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                MedLab Hospital is a full-service healthcare provider offering
                innovative solutions that deliver the right level of care. We
                strive to build a trusted community around your health, refining
                your treatment plan and improving your long-term wellbeing.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-violet-300 transition-all hover:-translate-y-0.5">
                  Book Appointment
                </button>
                <button className="border-2 border-violet-300 text-violet-600 font-bold px-7 py-3.5 rounded-full hover:bg-violet-50 transition-colors">
                  Our Services
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-10 pt-8 border-t border-gray-200">
                {[
                  { v: "12K+", l: "Happy Patients" },
                  { v: "95%", l: "Success Rate" },
                  { v: "50+", l: "Specialists" },
                  { v: "15yrs", l: "Experience" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-black text-violet-600">
                      {s.v}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image placeholder */}
            <div className="flex-1 flex justify-center w-full">
              <div className="w-full max-w-sm lg:max-w-md h-80 lg:h-96 bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-dashed border-violet-300 rounded-3xl flex flex-col items-center justify-center">
                <span className="text-7xl mb-3">🏥</span>
                <span className="text-violet-500 font-semibold text-sm">
                  Hero Illustration
                </span>
                <span className="text-violet-300 text-xs mt-1">
                  Replace with your image
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOOKING BAR ── */}
        <section className="bg-violet-600 py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-violet-200 text-center text-xs font-bold uppercase tracking-widest mb-5">
              ✦ Quick Appointment Booking
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <select
                  value={form.dept}
                  onChange={(e) => setForm({ ...form, dept: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all bg-gray-50 focus:bg-white text-gray-600"
                >
                  <option value="">Select dept.</option>
                  {[
                    "Cardiology",
                    "Neurology",
                    "Pediatrics",
                    "Orthopedics",
                    "General Medicine",
                  ].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleBook}
                className={`${booked ? "bg-green-500" : "bg-violet-600 hover:bg-violet-700"} text-white font-bold py-2.5 px-5 rounded-xl transition-all text-sm shadow-lg shadow-violet-200 sm:col-span-2 lg:col-span-1`}
              >
                {booked ? "✓ Booked!" : "Book Now →"}
              </button>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Our Core Services
              </h2>
              <p className="text-gray-400 mt-3 max-w-md mx-auto text-sm">
                From diagnostics to surgery, we cover all your healthcare needs
                under one roof.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-2xl mb-5">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {s.desc}
                  </p>
                  <button className="text-violet-600 font-bold text-sm group-hover:underline">
                    Learn more →
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="border-2 border-violet-300 text-violet-600 font-bold px-7 py-3 rounded-full hover:bg-violet-50 transition-colors text-sm">
                View All 9 Services →
              </button>
            </div>
          </div>
        </section>

        {/* ── WHO WE ARE ── */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            {/* Image grid */}
            <div className="w-full lg:flex-1 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-dashed border-violet-300 rounded-2xl h-52 flex flex-col items-center justify-center">
                <span className="text-4xl">👨‍⚕️</span>
                <span className="text-xs text-violet-400 mt-2">
                  Doctor Image
                </span>
              </div>
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-dashed border-violet-300 rounded-2xl h-52 flex flex-col items-center justify-center mt-7">
                <span className="text-4xl">🏨</span>
                <span className="text-xs text-violet-400 mt-2">
                  Hospital Image
                </span>
              </div>
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-dashed border-violet-300 rounded-2xl h-36 flex flex-col items-center justify-center col-span-2">
                <span className="text-4xl">💉</span>
                <span className="text-xs text-violet-400 mt-2">
                  Medical Illustration
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="w-full lg:flex-1">
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                Biography
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5">
                Who We Are
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                MedLab Hospital is a full-service healthcare provider offering
                innovative medical solutions that deliver the right level of
                care. We strive to build a caring community around your health,
                polishing your treatment plan and improving your long-term
                wellbeing.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Our hospital is one of the most trusted healthcare institutions
                in the region, with the ability to connect patients with top
                specialists in real time.
              </p>
              <p className="text-violet-600 font-bold text-sm mb-1">
                Since 2010: time to heal and thrive.
              </p>
              <p className="text-gray-400 text-xs italic mb-8">
                We are your Social Healthcare Partner.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { i: "🏅", l: "ISO Certified" },
                  { i: "🕐", l: "24/7 Emergency" },
                  { i: "🌐", l: "Online Booking" },
                ].map((b) => (
                  <div
                    key={b.l}
                    className="flex items-center gap-2 bg-violet-100 text-violet-700 font-semibold text-sm px-4 py-2 rounded-full"
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
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                Meet the Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Our Specialist Doctors
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DOCTORS.map((doc) => (
                <div
                  key={doc.name}
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 transition-all"
                >
                  <div className="bg-gradient-to-br from-violet-100 to-purple-100 border-b-2 border-dashed border-violet-200 h-52 flex flex-col items-center justify-center">
                    <span className="text-5xl">{doc.icon}</span>
                    <span className="text-xs text-violet-400 mt-2">
                      Doctor Photo
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-gray-900 text-lg">
                      {doc.name}
                    </h3>
                    <p className="text-violet-600 font-semibold text-sm mt-0.5">
                      {doc.specialty}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 mb-5">{doc.exp}</p>
                    <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all">
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                Patient Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                What Our Patients Say
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-violet-50 transition-all"
                >
                  <div className="text-yellow-400 text-sm mb-3">
                    {"★".repeat(t.rating)}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed italic mb-5">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-lg">
                      👤
                    </div>
                    <span className="font-bold text-gray-800 text-sm">
                      {t.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="bg-gradient-to-r from-violet-600 to-purple-500 py-20 px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Book Your Appointment?
          </h2>
          <p className="text-violet-200 text-base mb-8 max-w-md mx-auto">
            Join over 12,000 patients who trust MedLab Hospital for their
            healthcare needs.
          </p>
          <button className="bg-white text-violet-600 font-black px-8 py-4 rounded-full text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5">
            Get Started Today →
          </button>
        </section>
    </div>
  );
}

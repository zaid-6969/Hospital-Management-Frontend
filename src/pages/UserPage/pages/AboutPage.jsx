import { useState } from "react";

const DOCTORS = [
  { name: "Dr. Priya Sharma",   specialty: "Cardiologist",    exp: "12 yrs", bio: "Trained at AIIMS Delhi, Dr. Sharma specialises in interventional cardiology and heart failure management.", icon: "👩‍⚕️" },
  { name: "Dr. Arjun Mehta",    specialty: "Neurologist",     exp: "9 yrs",  bio: "A fellow of the American Academy of Neurology with expertise in epilepsy, stroke, and movement disorders.", icon: "👨‍⚕️" },
  { name: "Dr. Lakshmi Nair",   specialty: "Pediatrician",    exp: "15 yrs", bio: "Passionate about child health, Dr. Nair is known for her gentle approach and expertise in neonatal care.", icon: "👩‍⚕️" },
  { name: "Dr. Ramesh Iyer",    specialty: "Orthopedic Surg", exp: "11 yrs", bio: "Specialises in minimally invasive joint replacement and sports injury rehabilitation.", icon: "👨‍⚕️" },
  { name: "Dr. Kavitha Menon",  specialty: "Ophthalmologist", exp: "8 yrs",  bio: "Pioneer in advanced LASIK and retinal surgery with over 3,000 successful procedures.", icon: "👩‍⚕️" },
  { name: "Dr. Suresh Kumar",   specialty: "Dental Surgeon",  exp: "10 yrs", bio: "Expert in cosmetic and restorative dentistry, offering treatments from implants to smile makeovers.", icon: "👨‍⚕️" },
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
  { i: "💜", t: "Compassion",    d: "We treat every patient with kindness, empathy, and genuine care." },
  { i: "🔬", t: "Excellence",    d: "We pursue the highest medical standards in every procedure and interaction." },
  { i: "🤝", t: "Integrity",     d: "Honest, transparent communication with patients and families always." },
  { i: "⚡", t: "Innovation",    d: "Continuously adopting the latest medical technology and best practices." },
];

export default function AboutPage() {
  const [activePage, setActivePage] = useState("About Us");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">

      {/* ── PAGE HERO ── */}
      <div className="bg-gradient-to-br from-violet-50 via-white to-purple-50 py-16 px-6 text-center">
        <p className="text-violet-400 text-sm mb-3">Home › <span className="text-violet-600 font-semibold">About Us</span></p>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">About MedLab Hospital</h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          Since 2010, we've been Chennai's most trusted healthcare partner —
          combining compassionate care with cutting-edge medicine.
        </p>
      </div>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Image grid */}
          <div className="w-full lg:flex-1 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-dashed border-violet-300 rounded-2xl h-52 flex flex-col items-center justify-center">
              <span className="text-4xl">🏥</span>
              <span className="text-xs text-violet-400 mt-2">Hospital Front</span>
            </div>
            <div className="bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-dashed border-violet-300 rounded-2xl h-52 flex flex-col items-center justify-center mt-7">
              <span className="text-4xl">🔬</span>
              <span className="text-xs text-violet-400 mt-2">Lab Room</span>
            </div>
            <div className="bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-dashed border-violet-300 rounded-2xl h-36 flex flex-col items-center justify-center col-span-2">
              <span className="text-4xl">👥</span>
              <span className="text-xs text-violet-400 mt-2">Our Team</span>
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:flex-1">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5">Who We Are</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Founded in 2010 by Dr. R. Venkatesh, MedLab Hospital started as a small diagnostic
              centre in Anna Nagar with a vision to make quality healthcare accessible to all.
              Over the years, we've grown into a full-service, multi-specialty hospital trusted by
              over 12,000 patients across Tamil Nadu.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Our team of 50+ specialists, 200+ support staff, and state-of-the-art infrastructure
              make us one of the leading healthcare institutions in the region. We combine empathy,
              expertise, and technology to deliver outcomes that transform lives.
            </p>

            {/* Stats badges */}
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

      {/* ── OUR VALUES ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.t} className="bg-white border border-gray-200 rounded-2xl p-7 text-center hover:shadow-lg hover:shadow-violet-100 hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{v.i}</div>
                <h3 className="font-extrabold text-gray-900 text-lg mb-2">{v.t}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-violet-200" />
            <div className="flex flex-col gap-8">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="relative z-10 flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-lg shadow-violet-300">
                      {m.year.slice(2)}
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex-1 hover:border-violet-200 hover:shadow-md transition-all">
                    <span className="text-violet-600 font-extrabold text-sm">{m.year}</span>
                    <p className="text-gray-700 text-sm leading-relaxed mt-1">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Our Specialist Doctors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.map(doc => (
              <div key={doc.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-100 hover:-translate-y-1 transition-all">
                <div className="bg-gradient-to-br from-violet-100 to-purple-100 border-b-2 border-dashed border-violet-200 h-44 flex flex-col items-center justify-center">
                  <span className="text-5xl">{doc.icon}</span>
                  <span className="text-xs text-violet-400 mt-2">Doctor Photo</span>
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-gray-900 text-lg">{doc.name}</h3>
                  <p className="text-violet-600 font-semibold text-sm mt-0.5">{doc.specialty}</p>
                  <p className="text-gray-400 text-xs mt-0.5 mb-3">{doc.exp} experience</p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-5">{doc.bio}</p>
                  <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section className="py-14 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Certifications</span>
            <h2 className="text-2xl font-black text-gray-900">Accreditations & Awards</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { i: "🏥", t: "NABH Accredited" },
              { i: "🏅", t: "ISO 9001:2015" },
              { i: "⭐", t: "4.9 / 5 Rating" },
              { i: "🔬", t: "JCI Certified Lab" },
              { i: "🤝", t: "PMJAY Partner" },
              { i: "🎖️", t: "Best Hospital 2023" },
            ].map(b => (
              <div key={b.t} className="flex items-center gap-3 bg-violet-50 border border-violet-100 px-5 py-3 rounded-full">
                <span className="text-xl">{b.i}</span>
                <span className="font-bold text-sm text-violet-700">{b.t}</span>
              </div>
            ))}
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
    
    </div>
  );
}
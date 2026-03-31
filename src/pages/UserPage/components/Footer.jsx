import React from "react";

const Footer = () => {
  const QUICK_LINKS = [
    "Home",
    "Appointment",
    "Services",
    "About Us",
    "Contact Us",
  ];

  const HOURS = [
  { day: "Monday", time: "9:00 – 18:00" },
  { day: "Tuesday", time: "9:00 – 19:00" },
  { day: "Wednesday", time: "9:00 – 18:00" },
  { day: "Thursday", time: "9:00 – 20:00" },
  { day: "Friday", time: "9:00 – 18:00" },
];

  return (
    <>
      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
                <span className=" font-extrabold">M</span>
              </div>
              <span className=" font-extrabold text-base">
                MedLab Hospital
              </span>
            </div>
            <p className="text-sm text-text/60 leading-relaxed">
              Providing compassionate, world-class healthcare in Chennai, Tamil
              Nadu since 2010.
            </p>
          </div>
          <div>
            <h4 className="bg-card  font-bold text-xs uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-text/60 hover:text-violet-400 text-sm transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className=" font-bold text-xs uppercase tracking-widest mb-5">
              Hours
            </h4>
            <div className="flex flex-col gap-2.5">
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <span className="text-gray-400">{h.day}</span>
                  <span className="text-text/60">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className=" font-bold text-xs uppercase tracking-widest mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { i: "📞", t: "044-2345-6789" },
                { i: "✉️", t: "info@medlab.com" },
                { i: "📍", t: "Anna Nagar, Chennai, TN" },
              ].map((c) => (
                <div key={c.t} className="flex gap-2 items-start">
                  <span className="text-sm">{c.i}</span>
                  <span className="text-text/60 text-sm">{c.t}</span>
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
    </>
  );
};

export default Footer;

import { UserPlus, Siren, Clock, CheckCircle2 } from "lucide-react";

const DOCTORS = [
  { name: "Dr. Julian", time: "11:30 AM", available: false },
  { name: "Dr. Sarah", time: "Now", available: true },
  { name: "Dr. Priya", time: "2:00 PM", available: false },
];

const RightPanel = () => {
  return (
    <div className="space-y-4">

      {/* Quick Actions */}
      <div className="bg-card border border-violet-100 rounded-2xl p-4 shadow-sm">
        <h3 className="text-sm font-bold text-violet-700 mb-3">Quick Actions</h3>

        <button className="w-full mb-2 flex items-center gap-3 p-3 bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 rounded-xl text-sm font-semibold transition-colors">
          <UserPlus size={16} className="text-violet-500" />
          Register Patient
        </button>

        <button className="w-full flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl text-sm font-semibold transition-colors">
          <Siren size={16} />
          Emergency Entry
        </button>
      </div>

      {/* Doctor Availability */}
      <div className="bg-card border border-violet-100 rounded-2xl p-4 shadow-sm">
        <h3 className="text-sm font-bold text-violet-700 mb-3">Doctor Availability</h3>

        <ul className="space-y-2.5">
          {DOCTORS.map((doc) => (
            <li
              key={doc.name}
              className="flex items-center justify-between text-sm bg-violet-50/50 rounded-xl px-3 py-2"
            >
              <div className="flex items-center gap-2">
                {doc.available ? (
                  <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                ) : (
                  <Clock size={14} className="text-violet-300 shrink-0" />
                )}
                <span className="text-text font-medium text-xs">{doc.name}</span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  doc.available
                    ? "bg-green-100 text-green-600"
                    : "bg-violet-100 text-violet-500"
                }`}
              >
                {doc.available ? "Available" : doc.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Today Stats */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-500 rounded-2xl p-4 shadow-lg shadow-violet-200">
        <p className="text-violet-200 text-xs font-bold uppercase tracking-widest mb-3">
          ✦ Today's Summary
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Total", value: "24" },
            { label: "Pending", value: "8" },
            { label: "Accepted", value: "13" },
            { label: "Rejected", value: "3" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border border-border/15 rounded-xl p-3 text-center">
              <div className="bg-card  font-text text-xl">{s.value}</div>
              <div className="text-violet-200 text-[10px] font-semibold mt-0.5 uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default RightPanel;
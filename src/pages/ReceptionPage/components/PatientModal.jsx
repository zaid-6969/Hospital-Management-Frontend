import { useState } from "react";
import { X } from "lucide-react";

const PatientModal = ({ onClose }) => {
  const [data, setData] = useState({ name: "", phone: "" });

  return (
    <div className="fixed inset-0 bg-violet-950/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-card border border-violet-100 rounded-2xl w-full max-w-md shadow-2xl shadow-violet-100">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-violet-100 bg-violet-50/50 rounded-t-2xl">
          <div>
            <h2 className="text-base font-bold text-violet-700">New Patient</h2>
            <p className="text-xs text-violet-400 mt-0.5">Fill in the patient details below</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-100 text-violet-400 hover:bg-violet-200 hover:text-violet-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-violet-500 uppercase tracking-wide mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Arjun Mehta"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full border border-violet-200 rounded-xl px-3 py-2.5 text-sm bg-violet-50/50 text-text placeholder:text-violet-300 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-violet-500 uppercase tracking-wide mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="w-full border border-violet-200 rounded-xl px-3 py-2.5 text-sm bg-violet-50/50 text-text placeholder:text-violet-300 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-violet-100 bg-violet-50/30 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl border border-violet-200 text-violet-500 hover:bg-violet-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-5 py-2 text-sm font-bold rounded-xl bg-violet-600 hover:bg-violet-700 bg-card border-r border border-border border border-border transition-colors shadow-md shadow-violet-200">
            Save Patient
          </button>
        </div>

      </div>
    </div>
  );
};

export default PatientModal;
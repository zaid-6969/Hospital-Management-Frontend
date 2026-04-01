// import { useState } from "react";
// import { X, User, Phone } from "lucide-react";

// const PatientModal = ({ onClose }) => {
//   const [data, setData] = useState({ name: "", phone: "" });

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
//       <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
//         style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

//         {/* Purple accent line */}
//         <div className="h-0.5 w-full"
//           style={{ background: "linear-gradient(90deg,#6a5acd,#8b5cf6)" }} />

//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4"
//           style={{ borderBottom: "1px solid var(--border)" }}>
//           <div>
//             <h2 className="text-sm font-bold" style={{ color: "var(--text)" }}>New Patient</h2>
//             <p className="text-xs mt-0.5" style={{ color: "var(--text)", opacity: .4 }}>Fill in the patient details below</p>
//           </div>
//           <button onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg transition"
//             style={{ background: "rgba(106,90,205,.12)", color: "#6a5acd" }}>
//             <X size={15} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-6 py-5 space-y-4">
//           <div>
//             <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
//               style={{ color: "var(--text)", opacity: .4 }}>Full Name</label>
//             <div className="relative">
//               <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8b5cf6" }} />
//               <input
//                 type="text"
//                 placeholder="e.g. Arjun Mehta"
//                 value={data.name}
//                 onChange={(e) => setData({ ...data, name: e.target.value })}
//                 className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
//                 style={{
//                   background: "var(--bg)",
//                   border: "1px solid var(--border)",
//                   color: "var(--text)"
//                 }}
//                 onFocus={e => { e.target.style.borderColor = "#8b5cf6"; e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.08)"; }}
//                 onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
//               style={{ color: "var(--text)", opacity: .4 }}>Phone Number</label>
//             <div className="relative">
//               <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8b5cf6" }} />
//               <input
//                 type="tel"
//                 placeholder="+91 98765 43210"
//                 value={data.phone}
//                 onChange={(e) => setData({ ...data, phone: e.target.value })}
//                 className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
//                 style={{
//                   background: "var(--bg)",
//                   border: "1px solid var(--border)",
//                   color: "var(--text)"
//                 }}
//                 onFocus={e => { e.target.style.borderColor = "#8b5cf6"; e.target.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.08)"; }}
//                 onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 px-6 py-4"
//           style={{ borderTop: "1px solid var(--border)" }}>
//           <button onClick={onClose}
//             className="px-4 py-2 text-xs font-semibold rounded-xl transition"
//             style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}>
//             Cancel
//           </button>
//           <button
//             className="px-5 py-2 text-xs font-bold rounded-xl text-white transition"
//             style={{ background: "linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow: "0 4px 12px rgba(106,90,205,.30)" }}>
//             Save Patient
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PatientModal;

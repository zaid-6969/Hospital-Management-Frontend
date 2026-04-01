// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getDoctorById, createAppointment } from "../services/api";
// import { Calendar, Clock, CheckCircle } from "lucide-react";

// const ReceptionDoctorDetails = () => {
//   const { id } = useParams();
//   const [doctor, setDoctor]           = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   useEffect(() => { fetchDoctor(); }, []);

//   const fetchDoctor = async () => {
//     const res = await getDoctorById(id);
//     setDoctor(res.data);
//   };

//   if (!doctor) return (
//     <div className="flex items-center justify-center min-h-screen" style={{ background:"var(--bg)" }}>
//       <p className="text-sm animate-pulse" style={{ color:"var(--text)", opacity:.4 }}>Loading…</p>
//     </div>
//   );

//   const handleBook = async () => {
//     try {
//       await createAppointment({ doctorId: doctor._id, day: selectedDay.day, start: selectedSlot.start, end: selectedSlot.end });
//       alert("Appointment booked ✅");
//     } catch (err) { alert(err.response?.data?.message || "Error"); }
//   };

//   const pillActive  = { background:"linear-gradient(135deg,#6a5acd,#8b5cf6)", color:"white", border:"1px solid transparent", boxShadow:"0 4px 10px rgba(106,90,205,.25)" };
//   const pillInactive= { background:"rgba(106,90,205,0.08)", color:"#6a5acd", border:"1px solid rgba(106,90,205,.2)" };

//   return (
//     <div className="min-h-screen p-6 sm:p-10" style={{ background:"var(--bg)" }}>
//       <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

//         {/* Doctor image */}
//         <img src={doctor.image?.url} alt={doctor.name}
//           className="rounded-2xl w-full object-cover shadow-lg"
//           style={{ border:"1px solid var(--border)" }} />

//         {/* Doctor info */}
//         <div className="flex flex-col justify-center gap-3">
//           <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
//             style={{ background:"linear-gradient(135deg,#6a5acd,#8b5cf6)" }}>
//             {doctor.name?.[0]?.toUpperCase()}
//           </div>
//           <h1 className="text-2xl font-extrabold" style={{ color:"var(--text)" }}>{doctor.name}</h1>
//           <p className="text-sm" style={{ color:"var(--text)", opacity:.5 }}>{doctor.specialization}</p>
//         </div>

//         {/* Booking card */}
//         <div className="rounded-2xl p-5 space-y-5"
//           style={{ background:"var(--card)", border:"1px solid var(--border)" }}>
//           {/* Accent line */}
//           <div className="h-0.5 w-full rounded-full" style={{ background:"linear-gradient(90deg,#6a5acd,#8b5cf6)" }} />

//           <h3 className="text-sm font-bold" style={{ color:"var(--text)" }}>Reserve a Session</h3>

//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color:"#8b5cf6" }}>
//               <Calendar size={11}/> Select Day
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {doctor.availability.map((dayObj) => (
//                 <button key={dayObj.day}
//                   onClick={() => { setSelectedDay(dayObj); setSelectedSlot(null); }}
//                   className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
//                   style={selectedDay?.day === dayObj.day ? pillActive : pillInactive}>
//                   {dayObj.day.slice(0,3)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {selectedDay && (
//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color:"#8b5cf6" }}>
//                 <Clock size={11}/> Select Time
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {selectedDay.slots.map((slot, i) => (
//                   <button key={i} onClick={() => setSelectedSlot(slot)}
//                     className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
//                     style={selectedSlot === slot ? pillActive : pillInactive}>
//                     {slot.start} – {slot.end}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {selectedSlot && (
//             <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
//               style={{ background:"rgba(106,90,205,0.08)", border:"1px solid rgba(106,90,205,.2)" }}>
//               <CheckCircle size={13} style={{ color:"#6a5acd" }} />
//               <p className="text-xs font-medium" style={{ color:"#6a5acd" }}>
//                 {selectedDay.day} · {selectedSlot.start}–{selectedSlot.end}
//               </p>
//             </div>
//           )}

//           <button onClick={handleBook} disabled={!selectedSlot}
//             className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition disabled:opacity-40"
//             style={{ background:"linear-gradient(135deg,#6a5acd,#8b5cf6)", boxShadow:"0 4px 12px rgba(106,90,205,.25)" }}>
//             Book Appointment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReceptionDoctorDetails;

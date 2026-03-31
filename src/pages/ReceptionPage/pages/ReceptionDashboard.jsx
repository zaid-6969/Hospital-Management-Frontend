import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AppointmentTable from "../components/AppointmentTable";
import PatientModal from "../components/PatientModal";
import RightPanel from "../components/RightPanel";

const ReceptionDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-bg min-h-screen">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Navbar onOpen={() => setOpen(true)} />

        <div className="p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
          <div className="xl:col-span-9">
            <AppointmentTable />
          </div>
          <div className="xl:col-span-3">
            <RightPanel />
          </div>
        </div>
      </div>

      {open && <PatientModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ReceptionDashboard;

// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import AppointmentTable from "../components/AppointmentTable";
// import PatientModal from "../components/PatientModal";
// import RightPanel from "../components/RightPanel";
// import BookingModal from "../components/BookingModal"; // ✅ NEW

// const ReceptionDashboard = () => {
//   const [open, setOpen] = useState(false);           // PatientModal (add patient)
//   const [bookingOpen, setBookingOpen] = useState(false); // ✅ BookingModal

//   return (
//     <div className="flex bg-bg min-h-screen">
//       <Sidebar />

//       <div className="flex-1 min-w-0">
//         {/* ✅ Pass onBookAppointment so Navbar can open the booking modal */}
//         <Navbar
//           onOpen={() => setOpen(true)}
//           onBookAppointment={() => setBookingOpen(true)}
//         />

//         <div className="p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
//           <div className="xl:col-span-9">
//             <AppointmentTable />
//           </div>
//           <div className="xl:col-span-3">
//             <RightPanel />
//           </div>
//         </div>
//       </div>

//       {open && <PatientModal onClose={() => setOpen(false)} />}

//       {/* ✅ Booking Modal */}
//       {bookingOpen && (
//         <BookingModal
//           onClose={() => setBookingOpen(false)}
//           onSuccess={() => {
//             setBookingOpen(false);
//             // AppointmentTable will refetch on its own useEffect cycle.
//             // If you want to force a refresh, lift state up or use a context/event.
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ReceptionDashboard;
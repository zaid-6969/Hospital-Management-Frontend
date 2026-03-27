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
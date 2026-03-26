import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AppointmentTable from "../components/AppointmentTable";
import PatientModal from "../components/PatientModal";
import RightPanel from "../components/RightPanel";

const ReceptionDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-[#f8f9fb] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar onOpen={() => setOpen(true)} />

        <div className="p-6 grid grid-cols-12 gap-6">
          <div className="col-span-9">
            <AppointmentTable />
          </div>

          <div className="col-span-3">
            <RightPanel />
          </div>
        </div>
      </div>

      {open && <PatientModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ReceptionDashboard;

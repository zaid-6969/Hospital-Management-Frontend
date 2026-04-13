import AppointmentTable from "../components/AppointmentTable";
import RightPanel from "../components/RightPanel";

const ReceptionIndex = () => (
  <div className="p-4 sm:p-6">
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
      <div className="xl:col-span-9">
        <AppointmentTable />
      </div>
      <div className="xl:col-span-3">
        <RightPanel />
      </div>
    </div>
  </div>
);

export default ReceptionIndex;
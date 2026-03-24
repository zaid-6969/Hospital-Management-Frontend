import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";

const Dashboard = () => {
  return (
        <main className="p-6 grid grid-cols-4 gap-4">
          {/* SAME DESIGN */}
          <StatCard title="Doctors" value="24" />
          <StatCard title="Tools" value="18" />
          <StatCard title="Appointments" value="142" />
          <StatCard title="Patients" value="389" />
        </main>
  );
};

export default Dashboard;
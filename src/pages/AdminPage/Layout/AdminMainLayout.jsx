import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ThemeToggle from "../../../components/ThemeToggle";

const MainLayout = ({ children, active, title }) => {
  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <ThemeToggle />
      <Sidebar active={active} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* <Topbar title={title} /> */}
        <main className="flex-1 p-6 overflow-y-auto">
         <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
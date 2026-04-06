import SharedSidebar from "../../../components/shared/SharedSidebar";
import { LayoutDashboard, CalendarCheck, Stethoscope, Settings } from "lucide-react";

const mainNav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/doctor",          exact: true },
  { label: "Schedule",  icon: CalendarCheck,   path: "/doctor/calendar"              },
  { label: "Overview",  icon: Stethoscope,     path: "/doctor/overview"              },
];

const systemNav = [
  { label: "Settings", icon: Settings, path: "/doctor/settings" },
];

const Sidebar = ({ onClose }) => (
  <SharedSidebar
    logo={{ icon: Stethoscope, label: "MedDoctor", sub: "Doctor Portal" }}
    mainNav={mainNav}
    systemNav={systemNav}
    onClose={onClose}
  />
);

export default Sidebar;

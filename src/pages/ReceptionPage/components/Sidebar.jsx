import SharedSidebar from "../../../components/shared/SharedSidebar";
import { LayoutDashboard, Users, BedDouble, CalendarCheck, ClipboardList, Stethoscope } from "lucide-react";

const mainNav = [
  { label: "Dashboard",   icon: LayoutDashboard, path: "/reception",          exact: true },
  { label: "Doctors",     icon: Stethoscope,     path: "/reception/doctors"               },
];

// const systemNav = [
//   { label: "Rooms", icon: BedDouble,    path: "/reception/rooms" },
//   { label: "Queue", icon: ClipboardList, path: "/reception/queue" },
// ];

const Sidebar = ({ onClose }) => (
  <SharedSidebar
    logo={{ icon: ClipboardList, label: "MedReception", sub: "Reception Desk" }}
    mainNav={mainNav}
    // systemNav={systemNav}
    onClose={onClose}
  />
);

export default Sidebar;
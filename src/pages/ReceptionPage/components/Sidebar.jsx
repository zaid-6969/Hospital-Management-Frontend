import SharedSidebar from "../../../components/shared/SharedSidebar";
import { LayoutDashboard, Users, BedDouble, CalendarCheck, ClipboardList } from "lucide-react";

const mainNav = [
  { label: "Dashboard",    icon: LayoutDashboard, path: "/reception",              exact: true },
  // { label: "Appointments", icon: CalendarCheck,   path: "/reception/appointments"              },
  // { label: "Patients",     icon: Users,           path: "/reception/patients"                  },
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

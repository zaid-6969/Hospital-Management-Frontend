import SharedSidebar from "../../../components/shared/SharedSidebar";
import { LayoutDashboard, Users, Wrench, Shield } from "lucide-react";

const mainNav = [
  { label: "Dashboard",     icon: LayoutDashboard, path: "/admin",      exact: true },
  { label: "Doctors",       icon: Users,           path: "/admin/list"              },
  { label: "Medical Tools", icon: Wrench,          path: "/admin/tools"             },
];

const Sidebar = ({ onClose }) => (
  <SharedSidebar
    logo={{ icon: Shield, label: "MedAdmin", sub: "Healthcare Portal" }}
    mainNav={mainNav}
    onClose={onClose}
  />
);

export default Sidebar;

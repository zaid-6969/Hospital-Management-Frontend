import { useLocation } from "react-router-dom";
import SharedTopbar from "../../../components/shared/SharedTopbar";

const PAGE_TITLES = {
  "/admin":       { title: "Dashboard",    sub: "Welcome back, Admin 👋" },
  "/admin/list":  { title: "Doctors",       sub: "Manage your medical staff" },
  "/admin/tools": { title: "Medical Tools", sub: "Track equipment & devices" },
};

const Topbar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const info = PAGE_TITLES[pathname] || { title: "Admin", sub: "Hospital Management" };
  return <SharedTopbar onMenuClick={onMenuClick} title={info.title} sub={info.sub} />;
};

export default Topbar;

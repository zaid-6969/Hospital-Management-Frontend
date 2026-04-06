import { useLocation } from "react-router-dom";
import SharedTopbar from "../../../components/shared/SharedTopbar";

const PAGE_TITLES = {
  "/doctor":          { title: "Dashboard", sub: "Welcome back, Doctor 👋" },
  "/doctor/overview": { title: "Overview",  sub: "Your profile & performance" },
  "/doctor/calendar": { title: "Schedule",  sub: "Manage your appointments" },
  "/doctor/settings": { title: "Settings",  sub: "Account & preferences" },
};

const Topbar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const info = PAGE_TITLES[pathname] || { title: "Doctor", sub: "Doctor Portal" };
  return <SharedTopbar onMenuClick={onMenuClick} title={info.title} sub={info.sub} />;
};

export default Topbar;

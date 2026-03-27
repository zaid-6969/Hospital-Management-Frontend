import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeToggle from "../../../components/ThemeToggle";

const UserMainLayout = () => {
  return (
    <>
      <Navbar />
      <ThemeToggle />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserMainLayout;
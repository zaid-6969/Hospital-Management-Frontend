import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 w-full bg-card flex justify-around py-3 md:hidden shadow">
      <button onClick={() => navigate("/doctor")}>
        📅 Schedule
      </button>

      <button onClick={() => navigate("/doctor/overview")}>
        📊 Insights
      </button>
    </nav>
  );
};

export default BottomNav;
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/Slices/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 rounded-xl bg-primary text-white"
    >
      {mode === "dark" ? "Light ☀️" : "Dark 🌙"}
    </button>
  );
};

export default ThemeToggle;
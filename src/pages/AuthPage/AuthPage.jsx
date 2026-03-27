import React, { useState, useEffect } from "react";
import Image1 from "../../assets/Login_image.png";
import Image2 from "../../assets/Login_image_desk.png";
import Logo from "../../assets/Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/Slices/authSlice";
import { Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase().includes("email")
        ? "email"
        : e.target.placeholder.toLowerCase().includes("user")
          ? "username"
          : "password"]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/login",
          {
            email: formData.email || formData.username,
            password: formData.password,
          },
          { withCredentials: true },
        );

        const user = res.data.user;

        dispatch(loginSuccess(user));
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "ADMIN") navigate("/admin");
        else if (user.role === "DOCTOR") navigate("/doctor");
        else if (user.role === "RECEPTIONIST") navigate("/reception");
        else navigate("/user");
      } else {
        await axios.post("http://localhost:5000/api/v1/auth/register", {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: "PATIENT",
        });

        alert("Registered Successfully");
        setIsLogin(true);
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f8f9fb] flex-col lg:flex-row">
      {/* LEFT PANEL (UNCHANGED IMAGE SECTION) */}
      <div className="hidden sm:flex lg:flex flex-col items-center justify-center p-6 order-1 lg:order-none flex-1">
        <div className="w-full max-w-[500px] text-center">
          <img
            src={isDesktop ? Image2 : Image1}
            alt="banner"
            className="w-full max-h-[60vh] lg:max-h-[85vh] object-cover rounded-3xl shadow-xl"
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center bg-card px-6 py-8 order-2 lg:order-none">
        <div className="w-full max-w-[420px] flex flex-col">
          {/* LOGO */}
          <div className="flex justify-end mb-6">
            <img src={Logo} alt="Logo" className="h-25 object-contain" />
          </div>
          {/* TITLE */}
          <p className="text-sm text-gray-500 mb-2">
            Welcome to your Hospital Management System
          </p>

          {/* TOGGLE (PURPLE THEME SAME AS BEFORE) */}
          <div className="relative flex bg-bg rounded-full p-1 mb-6 w-full">
            <div
              className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#6a5acd] to-[#8e84c6] transition ${
                !isLogin ? "translate-x-full" : ""
              }`}
            />

            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-full relative z-10 text-sm ${
                isLogin ? "text-white" : "text-gray-600"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-full relative z-10 text-sm ${
                !isLogin ? "text-white" : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Manage appointments, doctors, and patient records seamlessly with
            our secure and efficient hospital management system.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* EMAIL (REGISTER ONLY) */}
            {!isLogin && (
              <div>
                <label className="text-sm text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 rounded-full border border-gray-300 outline-none focus:border-[#6a5acd] focus:ring-2 focus:ring-[#6a5acd]/20"
                />
              </div>
            )}

            {/* USERNAME */}
            <div>
              <label className="text-sm text-gray-600">User name</label>
              <input
                type="text"
                placeholder="Enter your User name"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-full border border-gray-300 outline-none focus:border-[#6a5acd] focus:ring-2 focus:ring-[#6a5acd]/20"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 outline-none focus:border-[#6a5acd] focus:ring-2 focus:ring-[#6a5acd]/20 tracking-widest"
                />

                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
              </div>
            </div>

            {/* OPTIONS */}
            {isLogin && (
              <div className="flex justify-between text-xs text-gray-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-4 py-2 rounded-full bg-gradient-to-r from-[#6a5acd] to-[#8e84c6] text-white font-medium hover:opacity-90 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

import React, { useState, useEffect } from "react";
import Image1 from "../../assets/Login_image.png";
import Image2 from "../../assets/Login_image_desk.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/Slices/authSlice";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase().includes("email")
        ? "email"
        : e.target.placeholder.toLowerCase().includes("username")
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

        if (user.role === "ADMIN") {
          navigate("/admin");
        } else if (user.role === "DOCTOR") {
          navigate("/doctor");
        } else if (user.role === "RECEPTIONIST") {
          navigate("/reception");
        } else {
          navigate("/user");
        }
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
    <div className="flex min-h-screen w-full bg-[#f8f9fb] flex-col md:flex-row">
      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-1 items-center justify-center p-5">
        <div className="w-full max-w-125 text-center">
          <img
            src={isDesktop ? Image2 : Image1}
            alt="banner"
            className="w-full max-h-[90vh] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center bg-white p-5">
        <div className="w-full max-w-137.5 p-6 md:p-8 rounded-2xl flex flex-col">
          <h3 className="text-right mb-6 text-gray-800 font-semibold">
            Your Logo
          </h3>

          {/* TOGGLE */}
          <div
            className={`relative flex bg-gray-100 rounded-full p-1 mb-10 w-[65%] overflow-hidden`}
          >
            {/* Sliding Background */}
            <div
              className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-linear-to-r from-[#6a5acd] to-[#8e84c6] transition-all duration-300 ${
                !isLogin ? "translate-x-full" : ""
              }`}
            ></div>

            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-full relative z-10 font-medium ${
                isLogin ? "text-white" : "text-gray-600"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-full relative z-10 font-medium ${
                !isLogin ? "text-white" : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[90%]">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 rounded-full border border-gray-300 outline-none focus:border-[#6a5acd] focus:ring-2 focus:ring-[#6a5acd]/20"
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-3 rounded-full border border-gray-300 outline-none focus:border-[#6a5acd] focus:ring-2 focus:ring-[#6a5acd]/20"
            />

            {isLogin && (
              <div className="flex justify-between text-sm text-gray-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
            )}

            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="px-4 py-3 rounded-full border border-gray-300 outline-none focus:border-[#6a5acd] focus:ring-2 focus:ring-[#6a5acd]/20"
              />
            )}

            <button
              type="submit"
              className="py-3 rounded-full bg-linear-to-r from-[#6a5acd] to-[#8e84c6] text-white font-semibold w-[60%] transition hover:-translate-y-1 hover:shadow-lg"
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

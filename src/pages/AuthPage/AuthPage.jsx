import React, { useState, useEffect } from "react";
import Image1 from "../../assets/Login_image.png";
import Logo from "../../assets/Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/Slices/authSlice";
import { Eye, EyeOff, Mail, User, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

/* ─── Google SVG Icon ─── */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

/* ─── Floating label Input ─── */
const FloatingInput = ({ label, type = "text", value, onChange, icon: Icon, rightElement }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative">
      <div
        className="relative flex items-center rounded-xl border transition-all duration-200"
        style={{
          borderColor: focused ? "var(--primary)" : "var(--border)",
          background: "var(--bg)",
          boxShadow: focused ? "0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)" : "none",
        }}
      >
        {/* Left Icon */}
        {Icon && (
          <div className="pl-4 pr-1 flex-shrink-0">
            <Icon
              size={16}
              style={{ color: focused ? "var(--primary)" : "var(--secondary)", transition: "color 0.2s" }}
            />
          </div>
        )}

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className="peer w-full px-3 pt-5 pb-2 bg-transparent outline-none text-sm"
          style={{ color: "var(--text)" }}
        />

        {/* Floating Label */}
        <label
          className="absolute pointer-events-none transition-all duration-200 font-medium"
          style={{
            left: Icon ? "44px" : "14px",
            color: focused ? "var(--primary)" : "var(--secondary)",
            fontSize: focused || hasValue ? "10px" : "13px",
            top: focused || hasValue ? "7px" : "50%",
            transform: focused || hasValue ? "none" : "translateY(-50%)",
          }}
        >
          {label}
        </label>

        {/* Right Element */}
        {rightElement && <div className="pr-3 flex-shrink-0">{rightElement}</div>}
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const res = await axios.post(
          "https://hospital-management-backend-eosin.vercel.app/api/v1/auth/login",
          { email: formData.email || formData.username, password: formData.password },
          { withCredentials: true }
        );
        const user = res.data.user;
        dispatch(loginSuccess(user));
        if (user.role === "ADMIN") navigate("/admin");
        else if (user.role === "DOCTOR") navigate("/doctor");
        else if (user.role === "RECEPTIONIST") navigate("/reception");
        else navigate("/user");
      } else {
        await axios.post("https://hospital-management-backend-eosin.vercel.app/api/v1/auth/register", {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          role: "PATIENT",
        });
        toast.success("Registered successfully! Please login.");
        setIsLogin(true);
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "https://hospital-management-backend-eosin.vercel.app/api/v1/auth/google",
          { token: tokenResponse.access_token },
          { withCredentials: true }
        );
        const user = res.data.user;
        dispatch(loginSuccess(user));
        toast.success("Google login successful");
        if (user.role === "ADMIN") navigate("/admin");
        else if (user.role === "DOCTOR") navigate("/doctor");
        else if (user.role === "RECEPTIONIST") navigate("/reception");
        else navigate("/user");
      } catch (error) {
        toast.error(error.response?.data?.message || "Google login failed");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error("Google login failed"),
  });

  const switchTab = (login) => {
    setIsLogin(login);
    setFormData({ username: "", email: "", password: "" });
    setShowPassword(false);
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col lg:flex-row"
      style={{ background: "var(--bg)" }}
    >
      {/* ── LEFT: Illustration Panel ── */}
      <div
        className="hidden lg:flex flex-col items-center justify-center p-10 flex-1 relative overflow-hidden"
        style={{ background: "var(--card)" }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "var(--primary)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "#8b5cf6" }}
        />

        <div className="relative z-10 w-full max-w-[520px] flex flex-col items-center text-center">
          <img
            src={Image1 }
            alt="Hospital Management"
            className="w-full max-h-[72vh] object-cover rounded-2xl"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
          />

          {/* Caption below image */}
          <div className="mt-8 space-y-2">
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Streamlined Healthcare Operations
            </h2>
            <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: "var(--secondary)" }}>
              Manage appointments, staff schedules, and patient records — all in one place.
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex items-center gap-6">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "50k+", label: "Patients" },
              { value: "HIPAA", label: "Compliant" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center">
                <span
                  className="text-base font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {b.value}
                </span>
                <span className="text-xs" style={{ color: "var(--secondary)" }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Auth Form Panel ── */}
      <div
        className="flex flex-1 items-center justify-center px-6 py-10"
        style={{ background: "var(--bg)" }}
      >
        <div className="w-full max-w-[420px]">

          {/* Logo */}
          <div className="flex justify-end gap-3 mb-8">
            <img  src={Logo} alt="Logo" className="h-16 object-contain" />
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1
              className="text-2xl font-bold tracking-tight leading-tight mb-1"
              style={{ color: "var(--text)" }}
            >
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-sm" style={{ color: "var(--secondary)" }}>
              {isLogin
                ? "Sign in to your hospital management account"
                : "Join the platform to manage your healthcare"}
            </p>
          </div>

          {/* Tab Toggle */}
          <div
            className="relative flex p-1 rounded-xl mb-7"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Sliding pill */}
            <div
              className="absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg transition-transform duration-250 ease-in-out"
              style={{
                background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
                transform: isLogin ? "translateX(0)" : "translateX(calc(100% + 4px))",
                left: "4px",
                boxShadow: "0 2px 8px rgba(106,90,205,0.35)",
              }}
            />
            <button
              onClick={() => switchTab(true)}
              className="flex-1 py-2 rounded-lg relative z-10 text-sm font-semibold transition-colors duration-200"
              style={{ color: isLogin ? "#fff" : "var(--secondary)" }}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab(false)}
              className="flex-1 py-2 rounded-lg relative z-10 text-sm font-semibold transition-colors duration-200"
              style={{ color: !isLogin ? "#fff" : "var(--secondary)" }}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name (register only) */}
            {!isLogin && (
              <FloatingInput
                label="Full Name"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                icon={User}
              />
            )}

            {/* Email/Username */}
            <FloatingInput
              label={isLogin ? "Email or Username" : "Email Address"}
              type={isLogin ? "text" : "email"}
              value={isLogin ? formData.username : formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [isLogin ? "username" : "email"]: e.target.value,
                })
              }
              icon={isLogin ? User : Mail}
            />

            {/* Password */}
            <FloatingInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              icon={Lock}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 rounded-md transition-opacity hover:opacity-70"
                  style={{ color: "var(--secondary)" }}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              }
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
                boxShadow: "0 4px 16px rgba(106,90,205,0.35)",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {isLogin ? "Signing in…" : "Creating account…"}
                </span>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center my-1">
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span
                className="px-3 text-xs font-medium"
                style={{ color: "var(--secondary)" }}
              >
                or continue with
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            {/* Custom Google Button */}
            <button
              type="button"
              onClick={() => googleLogin()}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60"
              style={{
                background: "var(--card)",
                border: "1.5px solid var(--border)",
                color: "var(--text)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs mt-7" style={{ color: "var(--secondary)" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => switchTab(!isLogin)}
              className="font-semibold hover:underline"
              style={{ color: "var(--primary)" }}
            >
              {isLogin ? "Register here" : "Sign in"}
            </button>
          </p>

          <p className="text-center text-xs mt-4" style={{ color: "var(--secondary)", opacity: 0.6 }}>
            By continuing, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
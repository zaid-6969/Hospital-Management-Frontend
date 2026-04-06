import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// ── Logout ────────────────────────────────────────────────────
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await API.post("/auth/logout");
    } catch {
    }
    dispatch(logout());
    toast.success("Logged out successfully");
    window.location.href = "/";
  }
);

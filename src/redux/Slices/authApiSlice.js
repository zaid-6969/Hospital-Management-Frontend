import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const API = axios.create({
  baseURL: "https://hospital-management-backend-eosin.vercel.app/api/v1",
  withCredentials: true,
});

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await API.post("/auth/logout");
    } catch {}
    dispatch(logout());
    toast.success("Logged out successfully");
    window.location.href = "/";
  },
);


export const googleLogin = createAsyncThunk(
  "/api/v1/auth/google",
  async (credentialResponse, thunkAPI) => {
    try {
      const token = credentialResponse.credential;

      const res = await API.post("/auth/google", { token });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Google login failed"
      );
    }
  }
);

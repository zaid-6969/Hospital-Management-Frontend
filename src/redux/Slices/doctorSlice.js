import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// ── Thunks ──────────────────────────────────────────────────
export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/doctors");
      return Array.isArray(res.data)
        ? res.data
        : (res.data?.doctors ?? res.data?.data ?? []);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load doctors",
      );
    }
  },
);

export const fetchMyDoctorProfile = createAsyncThunk(
  "doctors/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/doctors/me");
      const raw = res.data;
      return raw?.name ? raw : (raw?.doctor ?? raw?.data ?? raw);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load profile",
      );
    }
  },
);

export const toggleDoctorAvailability = createAsyncThunk(
  "doctors/toggleAvailability",
  async ({ doctorId, isAvailable }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/doctors/${doctorId}/availability`, {
        isAvailable,
      });
      toast.success(
        isAvailable
          ? "You are now marked as Available"
          : "You are now marked as Unavailable",
      );
      return res.data;
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to update availability";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

// ── Slice ────────────────────────────────────────────────────
const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    list: [],
    myProfile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDoctors.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchAllDoctors.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(fetchMyDoctorProfile.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchMyDoctorProfile.fulfilled, (s, a) => {
        s.loading = false;
        s.myProfile = a.payload;
      })
      .addCase(fetchMyDoctorProfile.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(toggleDoctorAvailability.fulfilled, (s, a) => {
        s.myProfile = { ...s.myProfile, ...a.payload };
        const idx = s.list.findIndex((d) => d._id === a.payload._id);
        if (idx !== -1) s.list[idx] = { ...s.list[idx], ...a.payload };
      });
  },
});

export default doctorSlice.reducer;

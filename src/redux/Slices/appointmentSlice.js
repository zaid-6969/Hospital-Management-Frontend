import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "https://hospital-management-backend-bg8yivi7s.vercel.app/api/v1",
  withCredentials: true,
});

export const fetchMyAppointments = createAsyncThunk(
  "appointments/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/appointments/my/patient");
      return Array.isArray(res.data)
        ? res.data
        : (res.data?.appointments ?? res.data?.data ?? []);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load appointments",
      );
    }
  },
);

export const fetchDoctorAppointments = createAsyncThunk(
  "appointments/fetchDoctorMy",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/appointments/my");
      return Array.isArray(res.data)
        ? res.data
        : (res.data?.appointments ?? res.data?.data ?? []);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load appointments",
      );
    }
  },
);

export const fetchAllAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async ({ page = 1, limit = 8 } = {}, { rejectWithValue }) => {
    try {
      const res = await API.get(`/appointments?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load appointments",
      );
    }
  },
);

export const createAppointmentThunk = createAsyncThunk(
  "appointments/create",
  async ({ doctorId, date, time }, { rejectWithValue }) => {
    try {
      const all = await API.get(`/appointments/my/patient`);
      const list = Array.isArray(all.data)
        ? all.data
        : (all.data?.appointments ?? []);
      const conflict = list.find(
        (a) =>
          a.doctorId?._id === doctorId &&
          a.date === date &&
          a.time === time &&
          a.status !== "REJECTED",
      );

      if (conflict) {
        toast.error(
          "This slot is already booked! Please choose a different time.",
        );
        return rejectWithValue("Slot already booked");
      }

      const res = await API.post("/appointments", { doctorId, date, time });
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to book appointment";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const updateAppointmentStatusThunk = createAsyncThunk(
  "appointments/updateStatus",
  async ({ id, status, rejectionReason = "" }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/appointments/status/${id}`, {
        status,
        rejectionReason,
      });
      if (status === "ACCEPTED") toast.success("Appointment accepted!");
      if (status === "REJECTED") toast.error("Appointment rejected.");
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update status";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const deleteMyAppointmentThunk = createAsyncThunk(
  "appointments/deleteMy",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/appointments/my/${id}`);
      toast.success("Appointment cancelled.");
      return id;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to cancel appointment";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const deleteAppointmentThunk = createAsyncThunk(
  "appointments/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/appointments/${id}`);
      toast.success("Appointment deleted.");
      return id;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete appointment";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
    total: 0,
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearAppointments: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
   
  //  patient data fetching

    builder
      .addCase(fetchMyAppointments.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchMyAppointments.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchMyAppointments.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // fetch doctor appointments

      .addCase(fetchDoctorAppointments.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // fetch all reception and admin

      .addCase(fetchAllAppointments.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload.data ?? a.payload;
        s.total = a.payload.total ?? 0;
        s.page = a.payload.page ?? 1;
        s.totalPages = a.payload.totalPages ?? 1;
      })
      .addCase(fetchAllAppointments.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // create
      .addCase(createAppointmentThunk.fulfilled, (s, a) => {
        s.list.unshift(a.payload);
      })

      // update status
      .addCase(updateAppointmentStatusThunk.fulfilled, (s, a) => {
        const idx = s.list.findIndex((x) => x._id === a.payload._id);
        if (idx !== -1) s.list[idx] = { ...s.list[idx], ...a.payload };
      })

      // delete my
      .addCase(deleteMyAppointmentThunk.fulfilled, (s, a) => {
        s.list = s.list.filter((x) => x._id !== a.payload);
      })

      // delete (admin/reception)
      .addCase(deleteAppointmentThunk.fulfilled, (s, a) => {
        s.list = s.list.filter((x) => x._id !== a.payload);
      });
  },
});

export const { clearAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;

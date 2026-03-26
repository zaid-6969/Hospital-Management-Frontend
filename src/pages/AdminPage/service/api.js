import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// 🔥 ADMIN
export const getAdminStats = () =>
  API.get("/appointments/admin/stats");

export const getAllAppointments = (page = 1, limit = 8) =>
  API.get(`/appointments?page=${page}&limit=${limit}`);

export const updateAppointmentStatus = (id, data) =>
  API.put(`/appointments/status/${id}`, data);

// 🔥 DOCTORS
export const getDoctors = () => API.get("/doctors");

export const getDoctorById = (id) =>
  API.get(`/doctors/${id}`);

export const getDoctorStats = (id) =>
  API.get(`/doctors/stats/${id}`);

// 🔥 DOCTOR PANEL
export const getMyAppointments = () =>
  API.get("/appointments/my");
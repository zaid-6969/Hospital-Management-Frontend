import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-management-backend-kohl.vercel.app/api/v1",
  withCredentials: true,
});

export const getAdminStats = () =>
  API.get("/appointments/admin/stats");

export const getAllAppointments = (page = 1, limit = 8) =>
  API.get(`/appointments?page=${page}&limit=${limit}`);

export const updateAppointmentStatus = (id, data) =>
  API.put(`/appointments/status/${id}`, data);

export const getDoctors = () => API.get("/doctors");

export const getDoctorById = (id) =>
  API.get(`/doctors/${id}`);

export const getDoctorStats = (id) =>
  API.get(`/doctors/stats/${id}`);

export const getMyAppointments = () =>
  API.get("/appointments/my");

export const createDoctor = (data) =>
  API.post("/doctors", data);

export const updateDoctor = (id, data) =>
  API.put(`/doctors/${id}`, data);

export const deleteDoctor = (id) =>
  API.delete(`/doctors/${id}`);

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const getUsers = (role) =>
  API.get("/auth/users", { params: role ? { role } : {} });
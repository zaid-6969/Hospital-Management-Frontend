import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-management-backend-bg8yivi7s.vercel.app/api/v1",
  withCredentials: true,
});

export const getDoctors = () => API.get("/doctors");

export const getDoctorById = (id) => API.get(`/doctors/${id}`);

export const createAppointment = (data) => API.post("/appointments", data);

export const getAllAppointments = (page = 1, limit = 8) =>
  API.get(`/appointments?page=${page}&limit=${limit}`);

export const assignDoctor = (id, doctorId) =>
  API.put(`/appointments/assign/${id}`, { doctorId });

export const updateAppointmentStatus = (id, data) =>
  API.put(`/appointments/status/${id}`, data);

export const deleteAppointment = (id) =>
  API.delete(`/appointments/${id}`);

export default API;
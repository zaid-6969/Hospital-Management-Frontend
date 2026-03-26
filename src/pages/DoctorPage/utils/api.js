import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const getDoctors = () => API.get("/doctors");

export const getMyDoctor = () => API.get("/doctors/me");

export const getMyAppointments = () => API.get("/appointments/my");

export const acceptAppointment = (id) =>
  API.patch(`/appointments/${id}/accept`);

export const rejectAppointment = (id, reason) =>
  API.patch(`/appointments/${id}/reject`, { reason });

export const updateAppointmentStatus = (id, data) =>
  API.put(`/appointments/status/${id}`, data);

export default API;

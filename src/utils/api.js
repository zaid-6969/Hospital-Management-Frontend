import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-management-backend-eosin.vercel.app/api/v1",
  withCredentials: true,
});

export const getDoctors = () => API.get("/doctors");

export const getMyDoctor = () => API.get("/doctors/me");

export const getMyAppointments = () => API.get("/appointments/my");

export const acceptAppointment = (id) =>
  API.patch(`/appointments/${id}/accept`);

export const rejectAppointment = (id, reason) =>
  API.patch(`/appointments/${id}/reject`, { reason });

export default API;

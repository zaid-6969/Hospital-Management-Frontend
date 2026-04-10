import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-management-backend-bg8yivi7s.vercel.app/api/v1",
  withCredentials: true,
});

// Doctors
export const getDoctors = () => API.get("/doctors");

export const getDoctorById = (id) => API.get(`/doctors/${id}`);

// Appointments
export const createAppointment = (data) => API.post("/appointments", data);

// Patient Details
export const savePatientDetails = (appointmentId, data) =>
  API.put(`/patient-details/appointment/${appointmentId}`, data);

export const getPatientDetails = (appointmentId) =>
  API.get(`/patient-details/appointment/${appointmentId}`);

export const logout = () => API.post("/auth/logout");

export const getMyAppointments = () => API.get("/appointments/my/patient");

export const deleteMyAppointment = (id) => API.delete(`/appointments/my/${id}`);

export default API;

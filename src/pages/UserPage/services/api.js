import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const getDoctors = () => API.get("/doctors");

export const getDoctorById = (id) =>
  API.get(`/doctors/${id}`);

export const createAppointment = (data) =>
  API.post("/appointments", data);

export default API;
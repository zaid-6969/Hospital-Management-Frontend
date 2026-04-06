import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import themeReducer from "./Slices/themeSlice";
import appointmentReducer from "./Slices/appointmentSlice";
import doctorReducer from "./Slices/doctorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
  },
});
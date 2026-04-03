import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import themeReducer from "./Slices/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});
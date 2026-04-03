import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (() => {
    try {
      const data = sessionStorage.getItem("user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })(),
  isAuthenticated: !!sessionStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { googleLogin } from "./authApiSlice";

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
  loading: false,
  error: null,
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

  // 🔥 ADD THIS PART
  extraReducers: (builder) => {
    builder

      // GOOGLE LOGIN
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        // store in session
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

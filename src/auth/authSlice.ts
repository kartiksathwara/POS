import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialToken = localStorage.getItem("token");
const expiry = localStorage.getItem("tokenExpiry");
// const loginTime = localStorage.getItem("tokenLoginTime");

const isTokenValid = expiry ? new Date().getTime() < parseInt(expiry) : false;

if (!isTokenValid) {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("tokenLoginTime");
}

const initialState: AuthState = {
  isAuthenticated: Boolean(initialToken && isTokenValid),
  token: isTokenValid ? initialToken : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      const loginTime = new Date().getTime();
      const expiryTime = loginTime + 24 * 60 * 60 * 1000;

      localStorage.setItem("token", token);
      localStorage.setItem("tokenLoginTime", loginTime.toString());
      localStorage.setItem("tokenExpiry", expiryTime.toString());

      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("tokenLoginTime");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

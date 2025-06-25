// import { createSlice } from "@reduxjs/toolkit";
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     loading: false,
//     user: null,
//   },
//   reducers: {
//     //action
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });
// export const { setLoading, setUser } = authSlice.actions;
// export default authSlice.reducer;

// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch {}
    },
    logout: (state) => {
      state.user = null;
      try {
        localStorage.removeItem("user");
      } catch {}
    },
  },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

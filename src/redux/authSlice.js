import { createSlice } from "@reduxjs/toolkit";

// 🔽 Recuperar datos del almacenamiento
const tokenFromStorage =
  localStorage.getItem("token") || sessionStorage.getItem("token") || null;

const firstNameFromStorage =
  localStorage.getItem("firstName") || sessionStorage.getItem("firstName") || null;

const customerFromStorage =
  localStorage.getItem("customer") || sessionStorage.getItem("customer") || null;

// 🔽 Estado inicial corregido
const initialState = {
  token: tokenFromStorage,
  firstName: firstNameFromStorage,
  customer: customerFromStorage ? JSON.parse(customerFromStorage) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, firstName, customer, rememberMe } = action.payload;
      state.token = token;
      state.firstName = firstName;
      state.customer = customer;

      const storage = rememberMe ? localStorage : sessionStorage;
      const other = rememberMe ? sessionStorage : localStorage;

      storage.setItem("token", token);
      storage.setItem("firstName", firstName);
      storage.setItem("customer", JSON.stringify(customer));

      // Limpieza del otro storage
      other.removeItem("token");
      other.removeItem("firstName");
      other.removeItem("customer");
    },

    logout: (state) => {
      state.token = null;
      state.firstName = null;
      state.customer = null;

      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("customer");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("firstName");
      sessionStorage.removeItem("customer");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

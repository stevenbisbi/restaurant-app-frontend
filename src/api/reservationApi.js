import axiosClient from "./axiosClient";

// Base para endpoints relacionados con reservas
const reservationApi = axiosClient;

// ✅ RESERVATIONS CRUD
export const getAllReservations = () =>
  reservationApi.get("/reservations/reservation/");

export const getReservation = (id) =>
  reservationApi.get(`/reservations/reservation/${id}/`);

export const createReservation = (reservation) =>
  reservationApi.post("/reservations/reservation/", reservation);

export const deleteReservation = (id) =>
  reservationApi.delete(`/reservations/reservation/${id}/`);

export const updateReservation = (id, reservation) =>
  reservationApi.put(`/reservations/reservation/${id}/`, reservation);


export const getAllTables = () => axiosClient.get("/tables/");
export const getRestaurantHours = () => axiosClient.get("/restaurants/");

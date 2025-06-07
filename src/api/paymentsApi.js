import axiosClient from "./axiosClient";

export const getAllPayments = () => axiosClient.get("/");

export const getPayment = (id) => axiosClient.get(`/${id}/`);

export const createPayment = (payment) => axiosClient.post("/", payment);

export const deletePayment = (id) => axiosClient.delete(`/${id}/`);

export const updatePayment = (id, payment) =>
  axiosClient.put(`/${id}/`, payment);

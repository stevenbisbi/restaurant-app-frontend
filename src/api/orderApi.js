import axiosClient from "./axiosClient";

export const getAllOrders = () => axiosClient.get("/orders/order");

export const getOrder = (id) => axiosClient.get(`/orders/order/${id}/`);

export const createOrder = (order) => axiosClient.post("/orders/order/", order);

export const deleteOrder = (id) => axiosClient.delete(`/orders/order/${id}/`);

export const updateOrder = (id, order) =>
  axiosClient.put(`/orders/order/${id}/`, order);

import axiosClient from "./axiosClient";

export const getAllTables = () => axiosClient.get("/tables/");

export const getTable = (id) => axiosClient.get(`/tables/${id}/`);

export const createTable = (table) => axiosClient.post("/tables/", table);

export const deleteTable = (id) => axiosClient.delete(`/tables/${id}/`);

export const updateTable = (id, table) =>
  axiosClient.put(`/tables/${id}/`, table);

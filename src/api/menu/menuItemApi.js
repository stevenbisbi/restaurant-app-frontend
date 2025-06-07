import axiosClient from "../axiosClient";

export const getAllMenuItems = () => axiosClient.get("/menu/items/");

export const getMenuItem = (id) => axiosClient.get(`/menu/items/${id}/`);

export const createMenuItem = (formData) =>
  axiosClient.post("/menu/items/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateMenuItem = (id, formData) =>
  axiosClient.patch(`/menu/items/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteMenuItem = (id) => axiosClient.delete(`/menu/items/${id}/`);

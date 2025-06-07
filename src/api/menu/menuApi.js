import axiosClient from "../axiosClient";

export const getAllMenus = () => axiosClient.get("/menu/menus/");

export const getMenu = (id) => axiosClient.get(`/menu/menus/${id}/`);

export const createMenu = (menu) => axiosClient.post("/menu/menus/", menu);

export const deleteMenu = (id) => axiosClient.delete(`/menu/menus/${id}/`);

export const updateMenu = (id, menu) =>
  axiosClient.put(`/menu/menus/${id}/`, menu);

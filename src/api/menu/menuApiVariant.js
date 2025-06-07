import axiosClient from "../axiosClient";

export const getAllmenuVariants = () => axiosClient.get("/menu_Variants/");

export const getmenu_Variant = (id) => axiosClient.get(`/menu_Variant/${id}/`);

export const createmenu_Variant = (menu_Variant) =>
  axiosClient.post("/menu_Variant/", menu_Variant);

export const deletemenu_Variant = (id) =>
  axiosClient.delete(`/menu_Variant/${id}/`);

export const updatemenu_Variant = (id, menu_Variant) =>
  axiosClient.put(`/menu_Variant/${id}/`, menu_Variant);

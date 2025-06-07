import axiosClient from "../axiosClient";

export const getAllCategories = () => axiosClient.get("/menu/categories/");

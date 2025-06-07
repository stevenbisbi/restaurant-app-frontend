import axiosClient from "./axiosClient";

export const getAllRestaurants = () => axiosClient.get("/restaurants/");

export const getresRaurant = (id) => axiosClient.get(`/restaurants/${id}/`);

export const createRestaurant = (restaurant) =>
  axiosClient.post("/restaurants/", restaurant);

export const deleteRestaurant = (id) =>
  axiosClient.delete(`/restaurants/${id}/`);

export const updateRestaurant = (id, restaurant) =>
  axiosClient.put(`/restaurants/${id}/`, restaurant);

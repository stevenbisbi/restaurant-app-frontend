import axios from "axios";

const userCustomerApi = axios.create({
  baseURL: "http://localhost:8000/api/v1/customers",
});

export const getAllCustomers = () => userCustomerApi.get("/");

export const getCustomer = (id) => userCustomerApi.get(`/${id}/`);

export const createCustomer = (customer) => userCustomerApi.post("/register/", customer);

export const loginCustomer = (customer) => userCustomerApi.post("/login/", customer);

export const deleteCustomer = (id) => userCustomerApi.delete(`/${id}/`);

export const updateCustomer = (id, customer) => userCustomerApi.put(`/${id}/`, customer);

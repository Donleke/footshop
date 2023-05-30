import { instance } from "../config/baseURL";

export const getCategories = async () => {
  const res = await instance.get("/api/categories");
  return res;
};
export const getAllProducts = async () => {
  const res = await instance.get("/api/products");
  return res;
};
export const getFeaturedProducts = async () => {
  const res = await instance.get("/api/products/featured");
  return res;
};
export const getProductsByCategory = async (params) => {
  const res = await instance.get(`/api/products/category/${params}`);
  return res;
};
export const getSingleProduct = async (params) => {
  const res = await instance.get(`/api/products/${params}`);
  return res;
};

export const getProductBySearch = async (searchParams) => {
  const res = await instance.get(`/api/catalog/search/?q=${searchParams}`);
  return res;
};

export const placeOrder = async (order, config) => {
  const res = await instance.post("/api/orders", order, config);
  return res;
};

export const paypalOrder = async (orderId, order, config) => {
  const res = await instance.put(
    `/api/orders/${orderId}/paypal`,
    order,
    config
  );
  return res;
};
export const getAllOrders = async (config) => {
  const res = await instance.get("/api/orders", config);
  return res;
};
export const getUserOrder = async (config) => {
  const res = await instance.get("/api/orders/user", config);
  return res;
};
export const getOrderDetail = async (params, config) => {
  const res = await instance.get(`/api/orders/${params}`, config);
  return res;
};

export const getUserProfile = async (params, config) => {
  const res = await instance.get(`/api/auth/profile/${params}`, config);
  return res;
};
export const updateUserProfile = async (profile, config) => {
  const res = await instance.put("/api/auth/profile/", profile, config);
  return res;
};

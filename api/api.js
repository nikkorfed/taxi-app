import axios from "axios";

import authStorage from "../auth/storage";

const api = axios.create({ baseURL: "http://10.66.80.88:1123/api" });
// const api = axios.create({ baseURL: "http://taxi.adboard.online/api" });
api.interceptors.request.use(async (config) => {
  const token = await authStorage.getToken();
  if (token) config.headers["X-Auth-Token"] = token;
  return config;
});

export default api;

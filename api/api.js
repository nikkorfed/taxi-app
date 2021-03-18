import axios from "axios";

import authStorage from "../auth/storage";

// const api = axios.create({ baseURL: "http://taxi.adboard.online/api" });
const api = axios.create({ baseURL: "http://10.66.80.88:1123/api" });
api.interceptors.request.use(async (config) => {
  config.headers["X-Auth-Token"] = await authStorage.getToken();
  return config;
});

export default api;

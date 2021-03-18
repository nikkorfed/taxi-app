import axios from "axios";
import Config from "react-native-config";

import authStorage from "../auth/storage";

const api = axios.create({ baseURL: Config.API_URL });
api.interceptors.request.use(async (config) => {
  const token = await authStorage.getToken();
  if (token) config.headers["X-Auth-Token"] = token;
  return config;
});

export default api;

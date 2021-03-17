import axios from "axios";

import authStorage from "../auth/storage";

let api;

(async () => {
  // api = axios.create({ baseURL: "http://taxi.adboard.online/api" });
  api = axios.create({ baseURL: "http://10.66.80.88:1123/api" });
  api.defaults.headers.common["X-Auth-Token"] = await authStorage.getToken();
})();

export default api;

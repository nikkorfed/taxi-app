import api from "./api";

export const auth = (body) => api.post("/users/auth", body);
export const authConfirm = (body) => api.post("/users/auth/confirm", body);
export const register = (body, token) => api.post("/users", body, { headers: { "X-Auth-Token": token } });

export const me = () => api.get("/users/me");

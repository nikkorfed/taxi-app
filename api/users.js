import api from "./api";

export const register = (body) => api.post("/users", body);
export const auth = (body) => api.post("/users/auth", body);

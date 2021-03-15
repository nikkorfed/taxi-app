import api from "./api";

export const getAll = () => api.get("/users");
export const auth = (body) => api.post("/users/auth", body);

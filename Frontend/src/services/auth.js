import api from "./api.js";

export function registerUser(userData) {
  return api.post("/register", userData);
}

export function loginUser(credentials) {
  return api.post("/login", credentials);
}

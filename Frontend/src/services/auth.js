import api from "./api.js";

export function registerUser(userData) {
  return api.post("/auth/register", userData);
}

export function loginUser(credentials) {
  return api.post("/auth/login", credentials);
}

export function logoutUser() {
  return api.post("/auth/logout");
}

export function sendResetLink(email) {
  return api.post("/auth/forgot-password", { email });
}

export function resetPassword(passwordData) {
  return api.post("/auth/reset-password", passwordData);
}

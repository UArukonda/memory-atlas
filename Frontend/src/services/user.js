import api from "./api";

export function getUser() {
  return api.get("/users/me", { withCredentials: true });
}

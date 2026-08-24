import api from "./api";

export function getUser() {
  return api.get("/users/me");
}

export function deleteUser() {
  return api.delete("/users/me");
}

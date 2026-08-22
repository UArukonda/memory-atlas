import api from "./api";

export function createProfile(profileData) {
  return api.post("/profile", profileData);
}

export function updateProfile(profileData) {
  return api.patch("/profile", profileData);
}

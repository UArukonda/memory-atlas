import api from "./api";

export function createProfile(profileData) {
  return api.post("/profile", profileData);
}

export function updateProfile(profileData) {
  return api.patch("/profile", profileData);
}

export function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file);
  return api.patch("/profile", formData, {
    headers: { "Content-Type": undefined },
  });
}

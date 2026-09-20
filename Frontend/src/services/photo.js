import api from "./api";

export function getPhotos() {
  return api.get("/photo");
}

export function deletePhoto(id) {
  return api.delete(`/photo/${id}`);
}

export function createPhoto(photos) {
  const formData = new FormData();
  photos.forEach((file) => formData.append("photo", file));
  return api.post("/photo", formData, {
    headers: { "Content-Type": undefined },
  });
}

export function updatePhoto(id, data) {
  return api.patch(`/photo/${id}`, data);
}

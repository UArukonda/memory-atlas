import api from "./api";

export function createMemory(memoryData) {
  const formData = buildMemoryFormData(memoryData);
  return api.post("/memory", formData, {
    headers: { "Content-Type": undefined },
  });
}

export function getMemories() {
  return api.get("/memory");
}

export function getMemoryById(id) {
  return api.get(`/memory/${id}`);
}

export function updateMemory(id, memoryData) {
  const formData = buildMemoryFormData(memoryData);
  return api.patch(`/memory/${id}`, formData, {
    headers: { "Content-Type": undefined },
  });
}

export function deleteMemory(id) {
  return api.delete(`/memory/${id}`);
}

function buildMemoryFormData(memoryData) {
  const formData = new FormData();
  formData.append("title", memoryData.title);
  formData.append("place", memoryData.place);
  formData.append("description", memoryData.description);
  formData.append("date", memoryData.date);
  memoryData.photos.forEach((file) => formData.append("photo", file));
  return formData;
}

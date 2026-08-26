import api from "./api";

export function createLetter(letterData) {
  return api.post("/letter", letterData);
}

export function getLetters() {
  return api.get("/letter");
}

export function getLetterById(id) {
  return api.get(`/letter/${id}`);
}

export function updateLetter(id, letterData) {
  return api.patch(`/letter/${id}`, letterData);
}

export function deleteLetter(id) {
  return api.delete(`/letter/${id}`);
}

import api from "./api";

export function createJournal(journalData) {
  return api.post("/journal", journalData);
}

export function getJournals() {
  return api.get("/journal");
}

export function getJournalById(id) {
  return api.get(`/journal/${id}`);
}

export function updateJournal(id, journalData) {
  return api.patch(`/journal/${id}`, journalData);
}

export function deleteJournal(id) {
  return api.delete(`/journal/${id}`);
}

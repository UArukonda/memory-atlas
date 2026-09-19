import api from "./api";

export const getMessages = () => {
  return api.get("/message");
};

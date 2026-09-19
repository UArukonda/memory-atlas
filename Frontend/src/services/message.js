import api from "./api";

export const getMessages = () => {
  return api.get("/message");
};

export const getUnreadCount = () => {
  return api.get("/message/unread-count");
};

export const markMessagesRead = () => {
  return api.patch("/message/read");
};

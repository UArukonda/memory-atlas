import api from "./api";

export const connectRelationship = (relationshipCode) => {
  return api.post("/relationship", { relationshipCode });
};

export const getRelationship = () => {
  return api.get("/relationship");
};

export const updateRelationship = (relationshipData) => {
  return api.patch("/relationship", relationshipData);
};

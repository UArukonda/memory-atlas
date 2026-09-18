import api from "./api";

export const connectRelationship = (relationshipCode) => {
  return api.post("/relationship", { relationshipCode });
};

export const getRelationship = () => {
  return api.get("/relationship");
};

export const updateRelationship = (relationshipData) => {
  const formData = new FormData();
  formData.append(
    "relationshipStartDate",
    relationshipData.relationshipStartDate,
  );
  formData.append("coupleNickname", relationshipData.coupleNickname);
  formData.append(
    "relationshipDescription",
    relationshipData.relationshipDescription,
  );
  if (relationshipData.coverPhoto) {
    formData.append("coverPhoto", relationshipData.coverPhoto);
  }
  if (relationshipData.couplePhoto) {
    formData.append("couplePhoto", relationshipData.couplePhoto);
  }
  return api.patch("/relationship", formData, {
    headers: { "Content-Type": undefined },
  });
};

export const endRelationship = () => {
  return api.delete("/relationship");
};

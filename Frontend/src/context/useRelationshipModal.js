import { useContext } from "react";
import { RelationshipModalContext } from "./RelationshipModalContext";

export const useRelationshipModal = () => {
  return useContext(RelationshipModalContext);
};

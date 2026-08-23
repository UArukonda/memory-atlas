import { RelationshipModalContext } from "./RelationshipModalContext";
import { useState } from "react";

export const RelationshipModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [relation, setRelation] = useState(false);
  return (
    <>
      <RelationshipModalContext.Provider
        value={{ isOpen, setIsOpen, relation, setRelation }}
      >
        {children}
      </RelationshipModalContext.Provider>
    </>
  );
};

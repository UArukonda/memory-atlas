import { RelationshipModalContext } from "./RelationshipModalContext";
import { useState } from "react";

export const RelationshipModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <RelationshipModalContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </RelationshipModalContext.Provider>
    </>
  );
};

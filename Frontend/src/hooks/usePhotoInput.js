import { useRef, useState } from "react";

export function usePhotoInput() {
  const photoInputRef = useRef(null);
  const [photoInput, setPhotoInput] = useState([]);

  const handleFileChange = (e) => {
    setPhotoInput(Array.from(e.target.files));
  };

  return { photoInputRef, photoInput, setPhotoInput, handleFileChange };
}

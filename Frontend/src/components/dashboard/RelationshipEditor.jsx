import { useEffect, useRef, useState } from "react";
import { updateRelationship } from "../../services/relationship";
import Input from "../Input";

const RelationshipEditor = ({ relationship, onClose, onSaved }) => {
  const [startDateInput, setStartDateInput] = useState("");
  const [coupleNicknameInput, setCoupleNicknameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [coverPhotoInput, setCoverPhotoInput] = useState(null);
  const [couplePhotoInput, setCouplePhotoInput] = useState(null);
  const coverPhotoInputRef = useRef(null);
  const couplePhotoInputRef = useRef(null);

  useEffect(() => {
    setStartDateInput(relationship?.relationshipStartDate?.slice(0, 10) || "");
    setCoupleNicknameInput(relationship?.coupleNickname || "");
    setDescriptionInput(relationship?.relationshipDescription || "");
    setCoverPhotoInput(null);
    setCouplePhotoInput(null);
  }, [relationship]);

  const handleSaveRelationshipDetails = async () => {
    try {
      await updateRelationship({
        relationshipStartDate: startDateInput,
        coupleNickname: coupleNicknameInput,
        relationshipDescription: descriptionInput,
        coverPhoto: coverPhotoInput,
        couplePhoto: couplePhotoInput,
      });

      await onSaved();
      onClose();
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-2xl">
        <h2 className="font-display text-2xl font-medium text-heading">
          Edit relationship details
        </h2>

        <div className="mt-5 flex flex-col gap-4">
          <Input
            label="Start date"
            value={startDateInput}
            onChange={(e) => setStartDateInput(e.target.value)}
            type="date"
          />

          <Input
            label="Couple nickname"
            value={coupleNicknameInput}
            onChange={(e) => setCoupleNicknameInput(e.target.value)}
            type="text"
            placeholder="e.g. The Uppi & Divya Diaries"
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="relationship-description"
              className="text-sm font-medium text-heading"
            >
              Description
            </label>

            <textarea
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              id="relationship-description"
              className="resize-none rounded-xl border border-border px-4 py-2.5 text-sm text-body outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            ref={coverPhotoInputRef}
            onChange={(e) => setCoverPhotoInput(e.target.files[0])}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => coverPhotoInputRef.current.click()}
            className="rounded-lg border border-dashed border-border px-4 py-2.5 text-sm font-medium text-body transition hover:border-primary hover:bg-primary/5"
          >
            {coverPhotoInput
              ? coverPhotoInput.name
              : relationship?.coverPhoto
                ? "Update cover photo"
                : "Choose cover photo"}
          </button>

          <input
            type="file"
            accept="image/*"
            ref={couplePhotoInputRef}
            onChange={(e) => setCouplePhotoInput(e.target.files[0])}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => couplePhotoInputRef.current.click()}
            className="rounded-lg border border-dashed border-border px-4 py-2.5 text-sm font-medium text-body transition hover:border-primary hover:bg-primary/5"
          >
            {couplePhotoInput
              ? couplePhotoInput.name
              : relationship?.couplePhoto
                ? "Update couple photo"
                : "Choose couple photo"}
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/10"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveRelationshipDetails}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-ink transition hover:bg-primary-hover"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelationshipEditor;

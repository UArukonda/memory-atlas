import Input from "./Input";
import { useState } from "react";

const JournalForm = ({ title, formOpen, formState, dispatch, onSave }) => {
  const [formError, setFormError] = useState("");

  const handleSaveClick = () => {
    if (!formState.description) {
      setFormError("Description is required.");
      return;
    }
    setFormError("");
    onSave();
  };

  return (
    <div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="bg-surface w-full max-w-md rounded-xl p-6 shadow-xl">
        <h2 className="font-semibold text-heading text-xl">{title} Journal</h2>
        <div className="mt-4 flex flex-col gap-4">
          <Input
            label="Title"
            id="title"
            name="title"
            value={formState.title}
            onChange={(e) => {
              dispatch({
                type: "SET_FIELD",
                field: "title",
                value: e.target.value,
              });
            }}
            placeholder="Title"
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              required
              value={formState.description}
              onChange={(e) => {
                dispatch({
                  type: "SET_FIELD",
                  field: "description",
                  value: e.target.value,
                });
              }}
              className="resize-none rounded-md border border-border px-3 py-2 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {formError && <p className="text-sm text-danger">{formError}</p>}
          <Input
            label="Date"
            id="date"
            type="date"
            value={formState.date}
            onChange={(e) => {
              dispatch({
                type: "SET_FIELD",
                field: "date",
                value: e.target.value,
              });
            }}
            name="date"
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => formOpen(false)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveClick}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;

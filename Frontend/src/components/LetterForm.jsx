import Input from "./Input";
import { useState } from "react";

const LetterForm = ({ title, formOpen, formState, dispatch, onSave }) => {
  const [formError, setFormError] = useState("");

  const handleSaveClick = () => {
    if (!formState.message) {
      setFormError("Message is required.");
      return;
    }
    setFormError("");
    onSave();
  };

  return (
    <div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="bg-surface flex h-[600px] w-full max-w-xl flex-col rounded-xl p-6 shadow-xl">
        <h2 className="font-semibold text-heading text-xl">{title} Letter</h2>

        <div className="mt-4 flex flex-col gap-3 border-b border-border pb-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="To"
              id="to"
              name="to"
              value={formState.to}
              onChange={(e) => {
                dispatch({
                  type: "SET_FIELD",
                  field: "to",
                  value: e.target.value,
                });
              }}
              placeholder="To"
            />
            <Input
              label="From"
              id="from"
              name="from"
              value={formState.from}
              onChange={(e) => {
                dispatch({
                  type: "SET_FIELD",
                  field: "from",
                  value: e.target.value,
                });
              }}
              placeholder="From"
            />
          </div>
          <div className="grid grid-cols-[1fr,auto] gap-3">
            <Input
              label="Subject"
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
              className="w-36"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-2">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            required
            value={formState.message}
            onChange={(e) => {
              dispatch({
                type: "SET_FIELD",
                field: "message",
                value: e.target.value,
              });
            }}
            className="flex-1 resize-none rounded-md border border-border px-3 py-2 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {formError && <p className="mt-2 text-sm text-danger">{formError}</p>}

        <div className="mt-4 flex justify-end gap-3">
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

export default LetterForm;

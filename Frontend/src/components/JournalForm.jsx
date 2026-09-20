import Input from "./Input";
import { useState } from "react";
import { BookOpen, X, Save } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border bg-white/[0.03] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <BookOpen size={20} />
            </div>

            <div>
              <p className="eyebrow">Your Journal</p>
              <h2 className="font-display text-2xl font-medium text-heading">
                {title} Journal
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => formOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-white/5 hover:text-heading"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto px-6 py-6">
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
            placeholder="Give this day a name..."
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-heading"
            >
              Description
            </label>

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
              placeholder="Write about your day..."
              className="min-h-64 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 text-body outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
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

        <div className="flex justify-end gap-3 border-t border-border bg-background/60 px-6 py-4">
          <button
            type="button"
            onClick={() => formOpen(false)}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-body transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveClick}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-primary-hover"
          >
            <Save size={17} />
            Save Journal
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;

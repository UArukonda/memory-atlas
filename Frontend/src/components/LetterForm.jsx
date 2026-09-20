import Input from "./Input";
import { useState } from "react";
import { Mail, X, Send } from "lucide-react";

const LetterForm = ({ title, formOpen, formState, dispatch, onSave }) => {
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveClick = async () => {
    if (!formState.message) {
      setFormError("Message is required.");
      return;
    }

    setFormError("");
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border bg-white/[0.03] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail size={20} />
            </div>

            <div>
              <p className="eyebrow">Love Letter</p>
              <h2 className="font-display text-2xl font-medium text-heading">
                {title} Letter
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

        <div className="flex flex-col gap-4 border-b border-border px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
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
              className="w-full sm:w-36"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-6 py-5">
          <label htmlFor="message" className="text-sm font-medium text-heading">
            Message
          </label>

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
            placeholder="Write something from the heart..."
            className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 font-display text-base leading-7 text-body outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {formError && <p className="px-6 text-sm text-danger">{formError}</p>}

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
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={17} />
            {isSaving ? "Sending..." : "Send Letter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterForm;

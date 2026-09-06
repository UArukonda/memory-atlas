import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { getLetterById, deleteLetter } from "../services/letters";
import { Mail, CalendarDays, Trash2 } from "lucide-react";

const LetterDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [letter, setLetter] = useState(null);
  const [error, setError] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getLetterById(id)
      .then((response) => setLetter(response.data.letter))
      .catch((err) => {
        console.log(err);
        setError(
          `${err.response?.status} Failed to fetch letter. Please try again.`,
        );
      });
  }, [id]);

  const handleDelete = () => {
    deleteLetter(id)
      .then(() => navigate("/letters"))
      .catch((err) => console.log(err));
  };

  const isSent = letter?.createdBy === user?.id;

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="border-b border-border bg-primary/5 px-6 py-6 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">
                    Love Letter
                  </p>

                  <h1 className="mt-1 text-xl font-semibold text-heading">
                    {letter?.title}
                  </h1>

                  <p className="mt-1 text-sm text-muted">
                    To {letter?.to} · From {letter?.from}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                  isSent
                    ? "bg-primary/10 text-primary"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {isSent ? "Sent" : "Received"}
              </span>
            </div>
          </div>

          {letter?.date && (
            <div className="flex items-center gap-2 px-6 pt-6 text-sm text-muted sm:px-8">
              <CalendarDays size={16} />
              <span>
                {new Date(letter.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <p className="whitespace-pre-line text-base leading-8 text-body">
              {letter?.message}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4">
          <p className="flex items-center gap-2 text-xs text-muted">
            <CalendarDays size={14} />
            <span>
              Written on{" "}
              {letter?.date &&
                new Date(letter.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </span>
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-danger transition hover:bg-danger/5"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-heading">
              Delete Letter
            </h2>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LetterDetails;

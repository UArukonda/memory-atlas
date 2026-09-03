import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { getLetterById, deleteLetter } from "../services/letters"; // updateLetter

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
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl">
                💌
              </div>
              <div>
                <h1 className="text-xl font-semibold text-heading">
                  {letter?.title}
                </h1>
                <p className="mt-1 text-sm text-primary">
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

          {letter?.date && (
            <p className="mt-4 text-xs text-muted">
              {new Date(letter.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <p className="mt-6 whitespace-pre-line text-base leading-7 text-body">
            {letter?.message}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-3">
          <p className="text-xs text-muted">
            Written on{" "}
            {letter?.date &&
              new Date(letter.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              className="text-sm font-medium text-danger hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {isDeleteOpen && (
        <div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="bg-surface w-full max-w-md rounded-xl p-6 shadow-xl">
            <h2 className="font-semibold text-heading text-xl">
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

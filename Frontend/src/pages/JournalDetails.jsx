import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getJournalById,
  deleteJournal,
  updateJournal,
} from "../services/journal";
import JournalForm from "../components/JournalForm";
import { useJournalForm } from "../hooks/useJournalForm";
import { BookOpen, CalendarDays, Pencil, Trash2 } from "lucide-react";

const JournalDetails = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [error, setError] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, dispatch] = useJournalForm();
  const navigate = useNavigate();

  useEffect(() => {
    getJournalById(id)
      .then((response) => setJournal(response.data.journal))
      .catch((err) => {
        console.log(err);
        setError(
          `${err.response?.status} Failed to fetch journal. Please try again.`,
        );
      });
  }, [id]);

  useEffect(() => {
    if (journal) dispatch({ type: "RESET", payload: journal });
  }, [journal, dispatch, isEditing]);

  const handleDelete = () => {
    deleteJournal(id)
      .then(() => navigate("/journals"))
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    updateJournal(id, formState)
      .then(() => {
        return getJournalById(id);
      })
      .then((res) => {
        setJournal(res.data.journal);
        setIsEditing(!isEditing);
      })
      .catch((err) => {
        console.log(err);
        setError(
          `${err.response?.status} Failed to update Journal. Please try again.`,
        );
      });
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="border-b border-border bg-primary/5 px-6 py-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  Journal
                </p>

                <h1 className="mt-1 text-xl font-semibold text-heading">
                  {journal?.title}
                </h1>

                {journal?.date && (
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                    <CalendarDays size={15} />
                    <span>
                      {new Date(journal.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-body transition hover:bg-primary/5 hover:text-primary"
                aria-label="Edit journal entry"
              >
                <Pencil size={15} />
                <span className="hidden sm:inline">Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-danger/30 px-3 py-2 text-sm font-medium text-danger transition hover:bg-danger/5"
                aria-label="Delete journal entry"
              >
                <Trash2 size={15} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-7 sm:px-8 sm:py-8">
          <p className="whitespace-pre-line text-base leading-8 text-body">
            {journal?.description}
          </p>
        </div>
      </div>

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-heading">
              Delete Journal Entry
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              This journal entry will be permanently deleted. This action cannot
              be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:bg-danger/90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <JournalForm
          title="Edit"
          formState={formState}
          dispatch={dispatch}
          formOpen={setIsEditing}
          onSave={handleEdit}
        />
      )}
    </>
  );
};

export default JournalDetails;

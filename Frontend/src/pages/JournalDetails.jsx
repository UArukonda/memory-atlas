import { useParams, useNavigate, Link } from "react-router-dom";
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
      <Link
        to="/journals"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-hover"
      >
        <span className="text-lg">←</span>
        Back to Journals
      </Link>
      <div className="panel mx-auto max-w-4xl overflow-hidden rounded-2xl border border-t-2 border-border border-t-accent/60">
        <div className="border-b border-border bg-white/[0.03] px-6 py-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <BookOpen size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Journal
                </p>

                <h1 className="mt-1 font-display text-3xl font-medium text-heading">
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
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-body transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                aria-label="Edit journal entry"
              >
                <Pencil size={15} />
                <span className="hidden sm:inline">Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-danger/30 px-3 py-2 text-sm font-medium text-danger transition hover:bg-danger/10"
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
          {journal?.createdBy?.username && (
            <p className="mt-6 text-right font-display text-sm italic text-muted">
              Written by {journal.createdBy.username}
            </p>
          )}
        </div>
      </div>

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-2xl">
            <h2 className="font-display text-2xl font-medium text-heading">
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
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
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

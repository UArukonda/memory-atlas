import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getJournalById,
  deleteJournal,
  updateJournal,
} from "../services/journal";
import JournalForm from "../components/JournalForm";
import { useJournalForm } from "../hooks/useJournalForm";

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
      {/* <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-heading">
              {journal?.title}
            </h1>
            {journal?.date && (
              <p className="mt-1 text-xs text-muted">
                {new Date(journal.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
            <p className="mt-4 text-sm leading-6 text-body">
              {journal?.description}
            </p>
          </div>
          <div className="flex h-fit gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex px-2 py-1 items-center justify-center rounded-md bg-primary text-sm text-white shadow-lg transition hover:bg-primary-hover cursor-pointer"
              aria-label="Edit journal entry"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              className="flex px-2 py-1 items-center justify-center rounded-md bg-primary text-sm text-white shadow-lg transition hover:bg-primary-hover cursor-pointer"
              aria-label="Delete journal entry"
            >
              Delete
            </button>
          </div>
        </div>
      </div> */}
      <div className="mx-auto max-w-4xl rounded-xl border border-border bg-surface p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-heading">
              {journal?.title}
            </h1>
            {journal?.date && (
              <p className="mt-1 text-xs text-muted">
                {new Date(journal.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          <div className="flex h-fit shrink-0 gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex px-2 py-1 items-center justify-center rounded-md bg-primary text-sm text-white shadow-lg transition hover:bg-primary-hover cursor-pointer"
              aria-label="Edit journal entry"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              className="flex px-2 py-1 items-center justify-center rounded-md bg-primary text-sm text-white shadow-lg transition hover:bg-primary-hover cursor-pointer"
              aria-label="Delete journal entry"
            >
              Delete
            </button>
          </div>
        </div>

        <p className="text-base leading-7 text-body">{journal?.description}</p>
      </div>

      {isDeleteOpen && (
        <div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="bg-surface w-full max-w-md rounded-xl p-6 shadow-xl">
            <h2 className="font-semibold text-heading text-xl">
              Delete Journal Entry
            </h2>
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
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
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

import { useState, useEffect, useCallback } from "react";
import JournalForm from "../components/JournalForm";
import { useJournalForm } from "../hooks/useJournalForm";
import { createJournal, getJournals } from "../services/journal.js";
import JournalCard from "../components/JournalCard.jsx";
import { Link } from "react-router-dom";
import { BookOpen, Plus } from "lucide-react";

const Journals = () => {
  const [isAddJournalOpen, setIsAddJournalOpen] = useState(false);
  const [formState, dispatch] = useJournalForm();
  const [journals, setJournals] = useState([]);

  const fetchJournals = useCallback(async () => {
    try {
      const response = await getJournals();
      setJournals(response.data.journals);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const handleCreate = async () => {
    try {
      await createJournal({ ...formState });
      await fetchJournals();
      setIsAddJournalOpen(!isAddJournalOpen);
      dispatch({ type: "RESET" });
    } catch (err) {
      console.log(err?.response?.status);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
              <BookOpen size={18} />
              <span>Your journal</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-heading">
              Journals
            </h1>

            <p className="mt-2 text-sm text-muted">
              Your private thoughts, together
            </p>
          </div>
        </div>

        {journals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary">
              <BookOpen size={26} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-heading">
              Your story starts here
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              Some days deserve to be remembered even without a photograph.
              Write them down and keep them here.
            </p>

            <button
              type="button"
              onClick={() => setIsAddJournalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary-hover"
            >
              <Plus size={18} />
              Add your first journal
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {journals.map((journal) => (
              <Link
                key={journal._id}
                to={`/journals/${journal._id}`}
                className="block"
              >
                <JournalCard journal={journal} />
              </Link>
            ))}
          </div>
        )}
      </div>

      {journals.length > 0 && (
        <button
          type="button"
          onClick={() => setIsAddJournalOpen(true)}
          className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-hover"
          aria-label="Add journal entry"
        >
          <Plus size={24} />
        </button>
      )}

      {isAddJournalOpen && (
        <JournalForm
          title="Add"
          formState={formState}
          dispatch={dispatch}
          formOpen={setIsAddJournalOpen}
          onSave={handleCreate}
        />
      )}
    </>
  );
};

export default Journals;

import { useState, useEffect, useCallback } from "react";
import JournalForm from "../components/JournalForm";
import { useJournalForm } from "../hooks/useJournalForm";
import { createJournal, getJournals } from "../services/journal.js";
import JournalCard from "../components/JournalCard.jsx";
import { Link } from "react-router-dom";

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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-heading">Journals</h1>
        <p className="mt-1 text-sm text-muted">
          Your private thoughts, together
        </p>
      </div>
      {journals.length === 0 ? (
        <p className="text-sm text-muted">
          No journal entries yet — add your first one.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {journals.map((journal) => (
            <Link key={journal._id} to={`/journals/${journal._id}`}>
              <JournalCard journal={journal} />
            </Link>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsAddJournalOpen(true)}
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-3xl text-white shadow-lg transition hover:bg-primary-hover"
        aria-label="Add journal entry"
      >
        +
      </button>
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

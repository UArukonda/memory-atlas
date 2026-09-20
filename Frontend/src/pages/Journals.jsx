import { useState, useEffect, useCallback } from "react";
import JournalForm from "../components/JournalForm";
import { useJournalForm } from "../hooks/useJournalForm";
import { createJournal, getJournals } from "../services/journal.js";
import JournalCard from "../components/JournalCard.jsx";
import { Link } from "react-router-dom";
import { BookOpen, Plus, Search, ArrowUpDown } from "lucide-react";
import Spinner from "../components/Spinner.jsx";

const Journals = () => {
  const [isAddJournalOpen, setIsAddJournalOpen] = useState(false);
  const [formState, dispatch] = useJournalForm();
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchJournals = useCallback(async () => {
    try {
      const response = await getJournals();
      setJournals(response.data.journals);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
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

  const matchesSearch = (journal) =>
    [journal.title, journal.description]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()));

  const visibleJournals = journals
    .filter(matchesSearch)
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date),
    );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <BookOpen size={18} />
              <span>Your journal</span>
            </div>

            <h1 className="font-display text-4xl font-medium tracking-tight text-heading">
              Journals
            </h1>

            <p className="mt-2 font-display italic text-muted">
              Your private thoughts, together
            </p>
          </div>
        </div>

        {journals.length > 0 && (
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search journals"
                className="w-full rounded-lg border border-border bg-raised py-2 pl-9 pr-3 text-sm text-body outline-none placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setSortOrder((prev) =>
                  prev === "newest" ? "oldest" : "newest",
                )
              }
              className="flex items-center gap-1.5 rounded-lg border border-border bg-raised px-3 py-2 text-sm text-body transition hover:border-primary/40 hover:bg-white/5"
            >
              <ArrowUpDown size={15} />
              {sortOrder === "newest" ? "Newest first" : "Oldest first"}
            </button>
          </div>
        )}

        {journals.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <BookOpen size={26} />
            </div>

            <h2 className="mt-5 font-display text-2xl font-medium text-heading">
              Your story starts here
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              Some days deserve to be remembered even without a photograph.
              Write them down and keep them here.
            </p>

            <button
              type="button"
              onClick={() => setIsAddJournalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-primary-hover"
            >
              <Plus size={18} />
              Add your first journal
            </button>
          </div>
        ) : visibleJournals.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-14 text-center">
            <p className="text-sm font-medium text-heading">
              No journals match your search
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleJournals.map((journal) => (
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
          className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-ink shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-hover"
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

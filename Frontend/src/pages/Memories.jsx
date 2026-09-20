import { createMemory, getMemories } from "../services/memories";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMemoryForm } from "../hooks/useMemoryForm";
import { usePhotoInput } from "../hooks/usePhotoInput";
import MemoryCard from "../components/MemoryCard";
import MemoryForm from "../components/MemoryForm";
import { Plus, Search, ArrowUpDown } from "lucide-react";
import Spinner from "../components/Spinner";

const Memories = () => {
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [memories, setMemories] = useState([]);
  const { photoInputRef, photoInput, setPhotoInput, handleFileChange } =
    usePhotoInput();
  const [formState, dispatch] = useMemoryForm();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchMemories = useCallback(async () => {
    try {
      const response = await getMemories();
      setMemories(response.data.memories);
      setIsLoading(false);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const handleCreate = async () => {
    try {
      await createMemory({
        ...formState,
        photos: photoInput,
      });
      await fetchMemories();
      setIsAddMemoryOpen(!isAddMemoryOpen);
      dispatch({ type: "RESET" });
      setPhotoInput([]);
    } catch (err) {
      console.log(err?.response?.status);
    }
  };

  const matchesSearch = (memory) =>
    [memory.title, memory.place, memory.description]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()));

  const visibleMemories = memories
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
      <div className="mb-8">
        <h1 className="font-display text-4xl font-medium tracking-tight text-heading">
          Memories
        </h1>
        <p className="mt-1 font-display italic text-muted">
          Everything you've shared together
        </p>
      </div>

      {memories.length > 0 && (
        <div className="mb-8 flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories"
              className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-body outline-none placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
            }
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-body transition hover:border-primary/40 hover:bg-white/5"
          >
            <ArrowUpDown size={15} />
            {sortOrder === "newest" ? "Newest first" : "Oldest first"}
          </button>
        </div>
      )}

      {memories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-medium text-heading">
            No memories yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Start preserving the little moments you never want to forget.
          </p>
          <button
            type="button"
            onClick={() => setIsAddMemoryOpen(true)}
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-primary-hover"
          >
            Add your first memory
          </button>
        </div>
      ) : visibleMemories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
          <p className="text-sm font-medium text-heading">
            No memories match your search
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 px-1 sm:grid-cols-2 lg:grid-cols-3">
          {visibleMemories.map((memory) => (
            <Link
              key={memory._id}
              to={`/memories/${memory._id}`}
              className="group polaroid tape block"
            >
              <MemoryCard memory={memory} />
            </Link>
          ))}
        </div>
      )}

      {memories.length > 0 && (
        <button
          type="button"
          onClick={() => setIsAddMemoryOpen(true)}
          className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-ink shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl"
          aria-label="Add memory"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      )}

      {isAddMemoryOpen && (
        <MemoryForm
          title="Add"
          formOpen={setIsAddMemoryOpen}
          formState={formState}
          dispatch={dispatch}
          onSave={handleCreate}
          photoInputRef={photoInputRef}
          onFileChange={handleFileChange}
        />
      )}
    </>
  );
};

export default Memories;

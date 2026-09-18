import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { createLetter, getLetters } from "../services/letters";
import { useLetterForm } from "../hooks/useLetterForm";
import LetterForm from "../components/LetterForm";
import LetterCard from "../components/LetterCard";
import { Mail, MailOpen, Search } from "lucide-react";
import Spinner from "../components/Spinner";

const Letters = () => {
  const { user } = useAuth();
  const [isAddLetterOpen, setIsAddLetterOpen] = useState(false);
  const [letters, setLetters] = useState([]);
  const [formState, dispatch] = useLetterForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "sent";
  const setActiveTab = (tab) => setSearchParams({ tab });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [readFilter, setReadFilter] = useState("all");

  const fetchLetters = useCallback(async () => {
    try {
      const response = await getLetters();
      setLetters(response.data.letters);
      setIsLoading(false);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  const handleCreate = async () => {
    try {
      await createLetter({ ...formState });
      await fetchLetters();
      setIsAddLetterOpen(!isAddLetterOpen);
      dispatch({ type: "RESET" });
    } catch (err) {
      console.log(err?.response?.status);
    }
  };

  const handleOpenAddLetter = () => {
    dispatch({
      type: "RESET",
      payload: {
        title: "",
        message: "",
        date: new Date().toISOString().slice(0, 10),
        to: user?.partner?.username,
        from: user?.username,
      },
    });
    setIsAddLetterOpen(true);
  };

  const sentLetters = letters.filter((letter) => letter.createdBy === user?.id);
  const receivedLetters = letters.filter(
    (letter) => letter.createdBy !== user?.id,
  );

  const matchesSearch = (letter) =>
    letter.title.toLowerCase().includes(searchQuery.toLowerCase());

  const visibleSentLetters = sentLetters.filter(matchesSearch);

  const visibleReceivedLetters = receivedLetters
    .filter(matchesSearch)
    .filter((letter) => {
      if (readFilter === "unread") return !letter.isRead;
      if (readFilter === "read") return letter.isRead;
      return true;
    });

  const toggleReadFilter = (value) =>
    setReadFilter((prev) => (prev === value ? "all" : value));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-heading">Letters</h1>
        <p className="mt-1 text-sm text-muted">Words written for each other</p>
      </div>

      <div className="mb-8">
        <div className="flex gap-1 border-b border-border">
          <button
            onClick={() => setActiveTab("sent")}
            className={`relative px-4 py-3 text-sm font-medium transition ${
              activeTab === "sent"
                ? "text-primary"
                : "text-muted hover:text-body"
            }`}
          >
            Sent
            {activeTab === "sent" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("received")}
            className={`relative px-4 py-3 text-sm font-medium transition ${
              activeTab === "received"
                ? "text-primary"
                : "text-muted hover:text-body"
            }`}
          >
            Received
            {activeTab === "received" && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
            )}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject"
              className="w-full rounded-lg border border-border py-2 pl-9 pr-3 text-sm text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {activeTab === "received" && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => toggleReadFilter("unread")}
                aria-label="Show unread letters"
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                  readFilter === "unread"
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border text-muted hover:bg-primary/5"
                }`}
              >
                <Mail size={16} />
              </button>

              <button
                type="button"
                onClick={() => toggleReadFilter("read")}
                aria-label="Show read letters"
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                  readFilter === "read"
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border text-muted hover:bg-primary/5"
                }`}
              >
                <MailOpen size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-6">
          {activeTab === "sent" ? (
            visibleSentLetters.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail size={22} />
                </div>
                <p className="mt-4 text-sm font-medium text-heading">
                  No letters yet
                </p>
                <p className="mt-1 text-sm text-muted">
                  Write something your partner will want to remember.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {visibleSentLetters.map((letter) => (
                  <Link
                    key={letter._id}
                    to={`/letters/${letter._id}`}
                    className="block"
                  >
                    <LetterCard letter={letter} />
                  </Link>
                ))}
              </div>
            )
          ) : visibleReceivedLetters.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail size={22} />
              </div>
              <p className="mt-4 text-sm font-medium text-heading">
                No letters yet
              </p>
              <p className="mt-1 text-sm text-muted">
                Letters from your partner will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {visibleReceivedLetters.map((letter) => (
                <Link
                  key={letter._id}
                  to={`/letters/${letter._id}`}
                  className="block"
                >
                  <LetterCard letter={letter} isReceived />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleOpenAddLetter}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl"
        aria-label="Write a letter"
      >
        <Mail size={22} strokeWidth={2} />
      </button>

      {isAddLetterOpen && (
        <LetterForm
          title="Write"
          formState={formState}
          dispatch={dispatch}
          formOpen={setIsAddLetterOpen}
          onSave={handleCreate}
        />
      )}
    </>
  );
};

export default Letters;

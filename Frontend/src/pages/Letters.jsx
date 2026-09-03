import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { createLetter, getLetters } from "../services/letters";
import { useLetterForm } from "../hooks/useLetterForm";
import LetterForm from "../components/LetterForm";
import LetterCard from "../components/LetterCard";

const Letters = () => {
  const { user } = useAuth();
  const [isAddLetterOpen, setIsAddLetterOpen] = useState(false);
  const [letters, setLetters] = useState([]);
  const [formState, dispatch] = useLetterForm();
  const [activeTab, setActiveTab] = useState("sent");

  const fetchLetters = useCallback(async () => {
    try {
      const response = await getLetters();
      setLetters(response.data.letters);
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

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-heading">Letters</h1>
        <p className="mt-1 text-sm text-muted">Words written for each other</p>
      </div>
      <div className="mb-8">
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "sent"
                ? "border-b-2 border-primary text-primary"
                : "text-muted hover:text-body"
            }`}
          >
            Sent
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "received"
                ? "border-b-2 border-primary text-primary"
                : "text-muted hover:text-body"
            }`}
          >
            Received
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "sent" ? (
            sentLetters.length === 0 ? (
              <p className="text-sm text-muted">
                You haven't sent any letters yet.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {sentLetters.map((letter) => (
                  <Link key={letter._id} to={`/letters/${letter._id}`}>
                    <LetterCard letter={letter} />
                  </Link>
                ))}
              </div>
            )
          ) : receivedLetters.length === 0 ? (
            <p className="text-sm text-muted">
              No letters from your partner yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4 ">
              {receivedLetters.map((letter) => (
                <Link key={letter._id} to={`/letters/${letter._id}`}>
                  <LetterCard letter={letter} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={handleOpenAddLetter}
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-3xl text-white shadow-lg transition hover:bg-primary-hover"
        aria-label="Write a letter"
      >
        +
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

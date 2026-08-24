import { useAuth } from "../context/useAuth";
import { useState, useEffect } from "react";
import { updateRelationship } from "../services/relationship";
import Input from "../components/Input";

const Dashboard = () => {
  const { user, reFetchUser } = useAuth();
  const [daysTogether, setDaysTogether] = useState(null);
  const [startDateInput, setStartDateInput] = useState("");
  const [coupleNicknameInput, setCoupleNicknameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [coverPhotoInput, setCoverPhotoInput] = useState("");
  const [isEditRelationshipOpen, setIsEditRelationshipOpen] = useState(false);

  const handleSaveRelationshipDetails = async () => {
    try {
      await updateRelationship({
        relationshipStartDate: startDateInput,
        coupleNickname: coupleNicknameInput,
        relationshipDescription: descriptionInput,
        coverPhoto: coverPhotoInput,
      });
      reFetchUser();
      setIsEditRelationshipOpen(!isEditRelationshipOpen);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (user?.relationship?.relationshipStartDate) {
      setDaysTogether(
        Math.floor(
          (Date.now() - new Date(user.relationship.relationshipStartDate)) /
            (1000 * 60 * 60 * 24),
        ),
      );
    }
  }, [user.relationship.relationshipStartDate]);

  return (
    <>
      <main>
        <section className="mb-8">
          <div className=" flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
            <div
              id="img"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary"
            >
              {user?.username?.[0].toUpperCase()}+
              {user?.partner?.username?.[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-heading">
                Good Morning, {user?.username}
              </h1>
              <p className="mt-1 text-sm text-body">
                Welcome back to your little corner of memories
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                {user?.partner && (
                  <span className="flex items-center gap-1 text-primary">
                    ❤️ Your story with{" "}
                    {user?.partner?.username?.[0]?.toUpperCase() +
                      user?.partner?.username?.slice(1)}
                  </span>
                )}
                <span className="text-muted">
                  {new Date().toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {!user?.relationship && (
          <section className="mb-8">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-sm font-medium text-primary">One step left</p>
              <h2 className="mt-1 text-xl font-semibold text-heading">
                Connect with your partner
              </h2>
              <p className="mt-2 text-sm text-body">
                Share your code or enter theirs to start building your story
                together.
              </p>
              <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover">
                Connect Now
              </button>
            </div>
          </section>
        )}

        {user?.relationship && (
          <section className="mb-8">
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="text-2xl">❤️</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditRelationshipOpen(!isEditRelationshipOpen);
                  }}
                  className="rounded-md p-1 text-muted transition hover:bg-primary/5 hover:text-primary"
                  aria-label="Edit relationship details"
                >
                  ✏️
                </button>
              </div>
              {daysTogether !== null ? (
                <>
                  <p className="mt-3 text-2xl font-semibold text-heading">
                    {daysTogether}
                  </p>
                  <p className="mt-1 text-sm text-muted">Days Together</p>
                </>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-muted">
                    When did your story begin?
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="date"
                      value={startDateInput}
                      onChange={(e) => setStartDateInput(e.target.value)}
                      className="w-full rounded-md border border-border px-3 py-2 text-sm text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      onClick={handleSaveRelationshipDetails}
                      className="shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
            {isEditRelationshipOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-xl">
                  <h2 className="text-xl font-semibold text-heading">
                    Edit relationship details
                  </h2>

                  <div className="mt-4 flex flex-col gap-4">
                    <Input
                      label="Start date"
                      value={startDateInput}
                      onChange={(e) => setStartDateInput(e.target.value)}
                      type="date"
                    />
                    <Input
                      label="Couple nickname"
                      value={coupleNicknameInput}
                      onChange={(e) => {
                        setCoupleNicknameInput(e.target.value);
                      }}
                      type="text"
                      placeholder="e.g. The Uppi & Divya Diaries"
                    />
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="relationship-description"
                        className="font-medium"
                      >
                        Description
                      </label>
                      <textarea
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                        id="relationship-description"
                        className="resize-none rounded-md border border-border px-3 py-2 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <Input
                      label="Cover photo URL"
                      value={coverPhotoInput}
                      onChange={(e) => setCoverPhotoInput(e.target.value)}
                      type="text"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditRelationshipOpen(!isEditRelationshipOpen);
                      }}
                      className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveRelationshipDetails}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default Dashboard;

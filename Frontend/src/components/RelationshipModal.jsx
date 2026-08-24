import { useRelationshipModal } from "../context/useRelationshipModal";
import { useState } from "react";
import Input from "./Input";
import { useAuth } from "../context/useAuth";
import { connectRelationship } from "../services/relationship";

const RelationshipModal = () => {
  const { isOpen, setIsOpen } = useRelationshipModal();
  const [activeTab, setActiveTab] = useState("enter");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { user, reFetchUser } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      await connectRelationship(code);
      await reFetchUser();
      setIsOpen(false);
    } catch (err) {
      setError(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-xl">
          <div className="mt-4 flex gap-2 border-b border-border">
            <button
              onClick={() => {
                setActiveTab("enter");
              }}
              className={`px-4 py-2 text-sm font-medium ${activeTab === "enter" ? "border-b-2 border-primary text-primary" : "text-muted hover:text-body"}`}
            >
              Enter a Code
            </button>
            <button
              onClick={() => {
                setActiveTab("share");
              }}
              className={`px-4 py-2 text-sm font-medium ${activeTab === "share" ? "border-b-2 border-primary text-primary" : "text-muted hover:text-body"}`}
            >
              Share My Code
            </button>
          </div>
          <div className="mt-4">
            {activeTab === "enter" ? (
              <div>
                {error && (
                  <p className="mb-3 rounded-lg bg-danger/5 px-3 py-2 text-sm text-danger">
                    {error}
                  </p>
                )}
                <Input
                  label="Relationship Code"
                  placeholder="Enter your partner's code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
                  onClick={handleSubmit}
                >
                  Connect
                </button>
              </div>
            ) : (
              <div>
                <Input
                  label="Your Code"
                  value={user?.relationshipCode || "Loading..."}
                  readOnly
                />
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="mt-6 rounded-lg border border-border px-4 py-2 text-sm font-medium text-body hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default RelationshipModal;

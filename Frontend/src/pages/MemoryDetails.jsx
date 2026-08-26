import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePhotoInput } from "../hooks/usePhotoInput";
import { useMemoryForm } from "../hooks/useMemoryForm";
import {
  getMemoryById,
  updateMemory,
  deleteMemory,
} from "../services/memories";
import MemoryForm from "../components/MemoryForm";

const MemoryDetails = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const { photoInputRef, photoInput, setPhotoInput, handleFileChange } =
    usePhotoInput();

  const [formState, dispatch] = useMemoryForm();

  const handleDelete = () => {
    deleteMemory(id)
      .then(() => {
        navigate("/memories");
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = async () => {
    updateMemory(id, { ...formState, photos: photoInput })
      .then(() => {
        return getMemoryById(id);
      })
      .then((response) => {
        setMemory(response.data.memory);
        setIsEditing(false);
        dispatch({ type: "RESET" });
        setPhotoInput([]);
      })
      .catch((err) => {
        console.log(err);
        setError(
          `${err.response?.status} Failed to update Memory. Please try again.`,
        );
      });
  };

  useEffect(() => {
    getMemoryById(id)
      .then((response) => {
        setMemory(response.data.memory);
      })
      .catch((err) => {
        console.log(err);
        setError(
          `${err.response?.status} Failed to fetch Memory. Please try again.`,
        );
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="mx-auto max-w-3xl max-w-screen">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-heading">
              {memory?.title}
            </h1>
            {memory?.place && (
              <p className="mt-1 text-sm text-muted">📍 {memory.place}</p>
            )}
            {memory?.date && (
              <p className="mt-1 text-xs text-muted">
                {new Date(memory.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
            <p className="mt-4 text-sm leading-6 text-body">
              {memory?.description}
            </p>
          </div>
          <div className="flex h-fit gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex px-2 py-1 items-center justify-center rounded-md bg-primary text-sm text-white shadow-lg transition hover:bg-primary-hover cursor-pointer"
              aria-label="Edit memory"
            >
              Edit Memory
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              className="flex px-2 py-1 items-center justify-center rounded-md bg-primary text-sm text-white shadow-lg transition hover:bg-primary-hover cursor-pointer"
              aria-label="Delete memory"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 ">
          {memory?.photos?.map((photo) => (
            <img
              key={photo}
              src={`http://localhost:4000${photo}`}
              onClick={() => {
                setSelectedPhoto(photo);
              }}
              alt={memory.title}
              className="h-40 w-full rounded-md object-cover hover:-translate-y-0.5 hover:shadow-sm"
            />
          ))}
        </div>
      </div>
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
        >
          <img
            src={`http://localhost:4000${selectedPhoto}`}
            alt={memory.title}
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
          />
        </div>
      )}
      {isDeleteOpen && (
        <div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="bg-surface w-full max-w-md rounded-xl p-6 shadow-xl">
            <h2 className="font-semibold text-heading text-xl">
              Delete Memory
            </h2>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
              >
                Cancel
              </button>{" "}
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
        <MemoryForm
          title="Edit"
          formOpen={setIsEditing}
          formState={formState}
          dispatch={dispatch}
          onSave={handleEdit}
          photoInputRef={photoInputRef}
          onFileChange={handleFileChange}
        />
      )}
    </>
  );
};

export default MemoryDetails;

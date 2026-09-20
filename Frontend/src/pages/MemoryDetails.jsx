import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { usePhotoInput } from "../hooks/usePhotoInput";
import { useMemoryForm } from "../hooks/useMemoryForm";
import {
  getMemoryById,
  updateMemory,
  deleteMemory,
} from "../services/memories";
import MemoryForm from "../components/MemoryForm";
import { Pencil, Trash2, MapPin, CalendarDays } from "lucide-react";
import Spinner from "../components/Spinner";
import PhotoViewer from "../components/PhotoViewer";

const MemoryDetails = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    if (memory) {
      dispatch({ type: "RESET", payload: memory });
    }
  }, [memory, dispatch, isEditing]);

  const handleEdit = async () => {
    updateMemory(id, { ...formState, photos: photoInput })
      .then(() => {
        return getMemoryById(id);
      })
      .then((response) => {
        setMemory(response.data.memory);
        setIsEditing(false);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(
          `${err.response?.status} Failed to fetch Memory. Please try again.`,
        );
      });
  }, [id]);

  const handlePhotoUpdated = (updated) => {
    setMemory((prev) => ({
      ...prev,
      photos: prev.photos.map((photo) =>
        photo._id === updated._id ? updated : photo,
      ),
    }));
    setSelectedPhoto(updated);
  };

  const handlePhotoDeleted = (photoId) => {
    setMemory((prev) => ({
      ...prev,
      photos: prev.photos.filter((photo) => photo._id !== photoId),
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) return <p className="p-6 text-danger">{error}</p>;

  return (
    <>
      {/* Back */}
      <Link
        to="/memories"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-hover"
      >
        <span className="text-lg">←</span>
        Back to Memories
      </Link>

      {/* Main Memory */}
      <article className="panel mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border">
        {/* Header */}
        <div className="px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {/* Memory information */}
            <div className="min-w-0">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Memory
              </p>

              <h1 className="font-display text-4xl font-medium tracking-tight text-heading sm:text-5xl">
                {memory?.title}
              </h1>

              {/* Metadata */}
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                {memory?.date && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary">
                      <CalendarDays size={16} />
                    </span>
                    <span>
                      {new Date(memory.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {memory?.place && (
                  <div className="flex items-center gap-2">
                    <span className="text-primary">
                      <MapPin size={16} />
                    </span>
                    <span>{memory.place}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-body transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                aria-label="Edit memory"
              >
                <Pencil size={17} strokeWidth={2} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/5 px-4 py-2 text-sm font-medium text-danger transition hover:bg-danger/10"
                aria-label="Delete memory"
              >
                <Trash2 size={17} strokeWidth={2} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-border sm:mx-10" />

        {/* Description */}
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {memory?.description && (
            <div className="max-w-3xl">
              <p className="whitespace-pre-line text-lg leading-8 text-body">
                {memory.description}
              </p>
            </div>
          )}

          {/* Photos */}
          {memory?.photos?.length > 0 ? (
            <section className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-medium text-heading">
                  Photos
                  <span className="ml-2 text-sm font-normal text-muted">
                    {memory.photos.length}
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {memory.photos.map((photo) => (
                  <button
                    key={photo._id}
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative overflow-hidden rounded-sm bg-paper p-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <img
                      src={photo.url}
                      alt={memory.title}
                      className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <div className="mt-10 rounded-lg border border-dashed border-border bg-white/5 px-6 py-8 text-center">
              <p className="text-sm text-muted">No photos yet.</p>

              <p className="mt-1 text-xs text-muted">
                Edit this memory to add some.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-white/5 px-6 py-5 sm:px-10">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted">Part of your story ❤️</p>

            {memory?.createdAt && (
              <p className="text-xs text-muted">
                Added{" "}
                {new Date(memory.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </article>

      {/* Photo Viewer */}
      {selectedPhoto && (
        <PhotoViewer
          key={selectedPhoto._id}
          photos={memory.photos}
          selectedPhoto={selectedPhoto}
          onSelect={setSelectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onUpdate={handlePhotoUpdated}
          onDelete={handlePhotoDeleted}
          showMemoryLink={false}
        />
      )}

      {/* Delete Confirmation */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-2xl">
            <h2 className="font-display text-2xl font-medium text-heading">
              Delete this memory?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              This will permanently remove this memory and its associated
              photos. This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Trash2 size={17} />
                Delete Memory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form */}
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

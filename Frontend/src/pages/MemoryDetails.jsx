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
      })
      .catch((err) => {
        console.log(err);
        setError(
          `${err.response?.status} Failed to fetch Memory. Please try again.`,
        );
      });
  }, [id]);

  // if (error) return <p>{error}</p>;
  // return (
  //   <>
  //     <Link
  //       to="/memories"
  //       className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
  //     >
  //       ← Back to Memories
  //     </Link>
  //     <div className="mx-auto max-w-4xl rounded-xl border border-border bg-surface p-8">
  //       <div className="mb-6 flex items-start justify-between">
  //         <div>
  //           <h1 className="text-2xl font-semibold text-heading">
  //             {memory?.title}
  //           </h1>
  //           {memory?.place && (
  //             <p className="mt-1 text-sm text-muted">📍 {memory.place}</p>
  //           )}
  //           {memory?.date && (
  //             <p className="mt-1 text-xs text-muted">
  //               {new Date(memory.date).toLocaleDateString("en-GB", {
  //                 day: "numeric",
  //                 month: "long",
  //                 year: "numeric",
  //               })}
  //             </p>
  //           )}
  //         </div>
  //         <div className="flex h-fit shrink-0 gap-4">
  //           <button
  //             type="button"
  //             onClick={() => setIsEditing(!isEditing)}
  //             className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 cursor-pointer"
  //             aria-label="Edit memory"
  //           >
  //             <Pencil size={18} />
  //             Edit
  //           </button>
  //           <button
  //             type="button"
  //             onClick={() => setIsDeleteOpen(!isDeleteOpen)}
  //             className="inline-flex items-center gap-1.5 rounded-full bg-danger/10 px-3 py-1.5 text-sm font-medium text-danger hover:bg-danger/20 cursor-pointer"
  //             aria-label="Delete memory"
  //           >
  //             <Trash2 size={18} />
  //             Delete
  //           </button>
  //         </div>
  //       </div>

  //       <p className="text-base leading-7 text-body">{memory?.description}</p>

  //       {memory?.photos?.length > 0 ? (
  //         <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
  //           {memory.photos.map((photo) => (
  //             <img
  //               key={photo}
  //               src={`${photo}`}
  //               onClick={() => setSelectedPhoto(photo)}
  //               alt={memory.title}
  //               className="aspect-square w-full cursor-pointer rounded-md object-cover object-top transition hover:opacity-90"
  //             />
  //           ))}
  //         </div>
  //       ) : (
  //         <p className="mt-8 text-sm text-muted">
  //           No photos yet — edit this memory to add some.
  //         </p>
  //       )}
  //     </div>
  //     {selectedPhoto && (
  //       <div
  //         onClick={() => setSelectedPhoto(null)}
  //         className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
  //       >
  //         <img
  //           src={`${selectedPhoto}`}
  //           alt={memory.title}
  //           className="max-h-[90vh] max-w-full rounded-lg object-contain"
  //         />
  //       </div>
  //     )}
  //     {isDeleteOpen && (
  //       <div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center px-4">
  //         <div className="bg-surface w-full max-w-md rounded-xl p-6 shadow-xl">
  //           <h2 className="font-semibold text-heading text-xl">
  //             Delete Memory
  //           </h2>
  //           <div className="mt-6 flex justify-end gap-3">
  //             <button
  //               type="button"
  //               onClick={() => setIsDeleteOpen(false)}
  //               className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
  //             >
  //               Cancel
  //             </button>{" "}
  //             <button
  //               type="button"
  //               onClick={handleDelete}
  //               className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     {isEditing && (
  //       <MemoryForm
  //         title="Edit"
  //         formOpen={setIsEditing}
  //         formState={formState}
  //         dispatch={dispatch}
  //         onSave={handleEdit}
  //         photoInputRef={photoInputRef}
  //         onFileChange={handleFileChange}
  //       />
  //     )}
  //   </>
  // );

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
      <article className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {/* Header */}
        <div className="px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {/* Memory information */}
            <div className="min-w-0">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
                Memory
              </p>

              <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
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
                className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-body transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                aria-label="Edit memory"
              >
                <Pencil size={17} strokeWidth={2} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                className="flex items-center gap-2 rounded-lg border border-danger/20 bg-danger/5 px-4 py-2 text-sm font-medium text-danger transition hover:bg-danger/10"
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
                <h2 className="text-lg font-semibold text-heading">
                  Photos
                  <span className="ml-2 text-sm font-normal text-muted">
                    {memory.photos.length}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {memory.photos.map((photo) => (
                  <button
                    key={photo}
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative overflow-hidden rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <img
                      src={photo}
                      alt={memory.title}
                      className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-border bg-background px-6 py-8 text-center">
              <p className="text-sm text-muted">No photos yet.</p>

              <p className="mt-1 text-xs text-muted">
                Edit this memory to add some.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-background px-6 py-5 sm:px-10">
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

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-5 top-5 text-2xl text-white/80 transition hover:text-white"
            aria-label="Close photo"
          >
            ×
          </button>

          <img
            src={selectedPhoto}
            alt={memory?.title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-heading">
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
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-background"
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

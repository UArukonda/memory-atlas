import { useState, useEffect } from "react";
import { Trash2, X, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { deletePhoto, updatePhoto } from "../services/photo";

const PhotoViewer = ({
  photos,
  selectedPhoto,
  onSelect,
  onClose,
  onUpdate,
  onDelete,
  showMemoryLink = true,
}) => {
  const { user } = useAuth();
  const [captionInput, setCaptionInput] = useState(selectedPhoto.caption || "");
  const [isEditingCaption, setIsEditingCaption] = useState(false);

  const currentIndex = photos.findIndex(
    (photo) => photo._id === selectedPhoto._id,
  );
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < photos.length - 1;
  const addedBy =
    selectedPhoto.uploadedBy === user?.id ? "you" : user?.partner?.username;

  const goPrev = () => {
    if (hasPrev) onSelect(photos[currentIndex - 1]);
  };

  const goNext = () => {
    if (hasNext) onSelect(photos[currentIndex + 1]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onSelect(photos[currentIndex - 1]);
      }
      if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
        onSelect(photos[currentIndex + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, photos, onSelect, onClose]);

  const handleSaveCaption = async () => {
    try {
      const response = await updatePhoto(selectedPhoto._id, {
        caption: captionInput,
      });
      const updated = response.data.photo;
      onUpdate(updated);
      setCaptionInput(updated.caption || "");
      setIsEditingCaption(false);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePhoto(selectedPhoto._id);
      onDelete(selectedPhoto._id);
      onClose();
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-2xl md:flex-row"
      >
        <div className="relative flex flex-1 items-center justify-center bg-[#0f1725]">
          <img
            src={selectedPhoto.url}
            alt=""
            className="max-h-[60vh] w-full object-contain md:max-h-[90vh]"
          />

          {hasPrev && (
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        <aside className="flex w-full flex-col border-t border-border md:w-80 md:border-l md:border-t-0">
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                Added by {addedBy}
              </p>
              <p className="mt-1 text-sm text-body">
                {new Date(selectedPhoto.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">
                {currentIndex + 1} of {photos.length}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close photo"
                className="rounded-lg p-1.5 text-muted transition hover:bg-white/5 hover:text-heading"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {isEditingCaption ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveCaption();
                }}
                className="flex flex-col gap-2"
              >
                <textarea
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  maxLength={300}
                  rows={4}
                  placeholder="Write a caption..."
                  autoFocus
                  className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-body outline-none placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCaptionInput(selectedPhoto.caption || "");
                      setIsEditingCaption(false);
                    }}
                    className="rounded-lg border border-border px-3 py-1.5 text-sm text-body transition hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-ink transition hover:bg-primary-hover"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div>
                {selectedPhoto.caption ? (
                  <p className="whitespace-pre-line font-display text-base leading-7 text-heading">
                    {selectedPhoto.caption}
                  </p>
                ) : (
                  <p className="text-sm italic text-muted">No caption yet.</p>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditingCaption(true)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-body transition hover:border-primary/40 hover:text-primary"
                >
                  <Pencil size={14} />
                  {selectedPhoto.caption ? "Edit caption" : "Add a caption"}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
            {showMemoryLink && selectedPhoto.memoryId ? (
              <Link
                to={`/memories/${selectedPhoto.memoryId}`}
                className="text-sm font-medium text-primary transition hover:text-primary-hover"
              >
                Go to Memory
              </Link>
            ) : (
              <span className="text-xs text-muted">Esc to close</span>
            )}

            <button
              type="button"
              onClick={handleDelete}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-danger/30 text-danger transition hover:bg-danger/10"
              aria-label="Delete photo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PhotoViewer;

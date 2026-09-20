import { useState, useEffect } from "react";
import {
  getPhotos,
  deletePhoto,
  createPhoto,
  updatePhoto,
} from "../services/photo";
import {
  Images,
  Trash2,
  X,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePhotoInput } from "../hooks/usePhotoInput";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/useAuth";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [captionInput, setCaptionInput] = useState("");
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const { user } = useAuth();

  const { photoInputRef, photoInput, setPhotoInput, handleFileChange } =
    usePhotoInput();

  useEffect(() => {
    if (photoInput.length > 0) {
      createPhoto(photoInput)
        .then((response) => {
          setPhotos((prev) => [...prev, ...response.data.photos]);
          setPhotoInput([]);
        })
        .catch((err) => console.log(err?.response?.data?.message));
    }
  }, [photoInput]);

  useEffect(() => {
    getPhotos()
      .then((response) => {
        setPhotos(response.data.photos);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setCaptionInput(selectedPhoto?.caption || "");
    setIsEditingCaption(false);
  }, [selectedPhoto]);

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      const index = photos.findIndex(
        (photo) => photo._id === selectedPhoto._id,
      );

      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowLeft" && index > 0) {
        setSelectedPhoto(photos[index - 1]);
      }
      if (e.key === "ArrowRight" && index < photos.length - 1) {
        setSelectedPhoto(photos[index + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, photos]);

  const handleDelete = async () => {
    try {
      await deletePhoto(selectedPhoto._id);
      setPhotos((prev) =>
        prev.filter((photo) => photo._id !== selectedPhoto._id),
      );
      setSelectedPhoto(null);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleSaveCaption = async () => {
    try {
      const response = await updatePhoto(selectedPhoto._id, {
        caption: captionInput,
      });
      const updated = response.data.photo;
      setPhotos((prev) =>
        prev.map((photo) => (photo._id === updated._id ? updated : photo)),
      );
      setSelectedPhoto(updated);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const currentIndex = photos.findIndex(
    (photo) => photo._id === selectedPhoto?._id,
  );
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < photos.length - 1;
  const addedBy =
    selectedPhoto?.uploadedBy === user?.id ? "you" : user?.partner?.username;

  const goPrev = () => {
    if (hasPrev) setSelectedPhoto(photos[currentIndex - 1]);
  };

  const goNext = () => {
    if (hasNext) setSelectedPhoto(photos[currentIndex + 1]);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-heading">Gallery</h1>
      </div>

      {photos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Images size={22} />
          </div>
          <p className="mt-4 text-sm font-medium text-heading">No photos yet</p>
          <p className="mt-1 text-sm text-muted">
            Photos you add to memories will show up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
          {photos.map((photo) => (
            <img
              key={photo._id}
              src={photo.url}
              onClick={() => setSelectedPhoto(photo)}
              alt=""
              className="aspect-square w-full cursor-pointer rounded-lg object-cover object-top transition hover:opacity-90"
            />
          ))}
        </div>
      )}

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
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
                    {new Date(selectedPhoto.createdAt).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" },
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted">
                    {currentIndex + 1} of {photos.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
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
                          setCaptionInput(selectedPhoto?.caption || "");
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
                      <p className="text-sm italic text-muted">
                        No caption yet.
                      </p>
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

                {/* likes and comments go here next */}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
                {selectedPhoto?.memoryId ? (
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
      )}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={photoInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => photoInputRef.current.click()}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-ink shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl"
        aria-label="Add photos"
      >
        +
      </button>
    </>
  );
};

export default Gallery;

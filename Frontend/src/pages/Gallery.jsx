import { useState, useEffect } from "react";
import { getPhotos, deletePhoto, createPhoto } from "../services/photo";
import { Images, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePhotoInput } from "../hooks/usePhotoInput";
import Spinner from "../components/Spinner";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-heading">Gallery</h1>
        {/* <p className="mt-1 text-sm text-muted">Every photo, in order</p> */}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
        >
          <img
            src={selectedPhoto.url}
            alt=""
            className="max-h-[75vh] max-w-full rounded-lg object-contain"
          />
          {selectedPhoto?.memoryId && (
            <Link
              to={`/memories/${selectedPhoto.memoryId}`}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Go to Memory
            </Link>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-danger/80"
            aria-label="Delete photo"
          >
            <Trash2 size={20} />
          </button>
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
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl"
        aria-label="Add photos"
      >
        +
      </button>
    </>
  );
};

export default Gallery;

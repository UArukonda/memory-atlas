import { useState, useEffect } from "react";
import { getPhotos, createPhoto } from "../services/photo";
import { Images } from "lucide-react";
import { usePhotoInput } from "../hooks/usePhotoInput";
import Spinner from "../components/Spinner";
import PhotoViewer from "../components/PhotoViewer";

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

  const handlePhotoUpdated = (updated) => {
    setPhotos((prev) =>
      prev.map((photo) => (photo._id === updated._id ? updated : photo)),
    );
    setSelectedPhoto(updated);
  };

  const handlePhotoDeleted = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo._id !== id));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-display text-4xl font-medium tracking-tight text-heading">
          Gallery
        </h1>
        <p className="mt-1 font-display italic text-muted">
          Every photo, in order
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Images size={22} />
          </div>
          <p className="mt-4 text-sm font-medium text-heading">No photos yet</p>
          <p className="mt-1 text-sm text-muted">
            Photos you add to memories will show up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6 px-1">
          {photos.map((photo) => (
            <img
              key={photo._id}
              src={photo.url}
              onClick={() => setSelectedPhoto(photo)}
              alt=""
              className="polaroid aspect-square w-full cursor-pointer object-cover object-top"
            />
          ))}
        </div>
      )}

      {selectedPhoto && (
        <PhotoViewer
          key={selectedPhoto._id}
          photos={photos}
          selectedPhoto={selectedPhoto}
          onSelect={setSelectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onUpdate={handlePhotoUpdated}
          onDelete={handlePhotoDeleted}
        />
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

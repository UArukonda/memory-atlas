const MemoryCard = ({ memory }) => {
  return (
    <>
      <div className="rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
        <h3 className="font-medium text-heading">{memory.title}</h3>
        {memory.place && (
          <p className="mt-1 text-sm text-muted">📍 {memory.place}</p>
        )}
        <p className="mt-2 text-sm text-body line-clamp-2">
          {memory.description}
        </p>
        {memory.photos?.length > 0 && (
          <img
            src={`http://localhost:4000${memory.photos[0]}`}
            alt={memory.title}
            className="mt-2 h-32 w-full rounded-md object-cover"
          />
        )}
        <p className="mt-3 text-xs text-muted">
          {new Date(memory.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </>
  );
};

export default MemoryCard;

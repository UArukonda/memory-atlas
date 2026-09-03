const LetterCard = ({ letter }) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className="min-w-0 flex-1">
        <h3 className="font-medium text-heading">{letter.title}</h3>
        <p className="mt-1 truncate text-sm text-muted">{letter.message}</p>
      </div>
      <p className="shrink-0 text-xs text-muted">
        {new Date(letter.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default LetterCard;

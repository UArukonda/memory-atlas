const JournalCard = ({ journal }) => {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
      <h3 className="font-medium text-heading">{journal.title}</h3>
      <p className="mt-2 text-sm text-body line-clamp-3">
        {journal.description}
      </p>
      <p className="mt-3 text-xs text-muted">
        {new Date(journal.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default JournalCard;

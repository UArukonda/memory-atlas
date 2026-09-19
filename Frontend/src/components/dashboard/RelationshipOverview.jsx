import { Heart, Images, Pencil, BookOpen, Mail } from "lucide-react";

const RelationshipOverview = ({
  memoryCount,
  journalCount,
  letterCount,
  daysTogether,
  onEdit,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Heart size={20} />
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-2 text-muted transition hover:bg-primary/5 hover:text-primary"
            aria-label="Edit relationship details"
          >
            <Pencil size={16} />
          </button>
        </div>

        {daysTogether !== null ? (
          <>
            <p className="mt-4 text-3xl font-semibold text-heading">
              {daysTogether}
            </p>

            <p className="mt-1 text-sm text-muted">Days Together</p>
          </>
        ) : (
          <div className="mt-4">
            <p className="text-sm text-muted">When did your story begin?</p>

            <button
              type="button"
              onClick={onEdit}
              className="shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              Add start date
            </button>
          </div>
        )}
      </div>

      <StatCard
        icon={<Images size={20} />}
        label="Memories"
        value={memoryCount}
      />
      <StatCard
        icon={<BookOpen size={20} />}
        label="Journals"
        value={journalCount}
      />
      <StatCard icon={<Mail size={20} />} label="Letters" value={letterCount} />
    </div>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div className="rounded-2xl border border-border bg-surface p-5">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <p className="mt-4 text-3xl font-semibold text-heading">{value}</p>
    <p className="mt-1 text-sm text-muted">{label}</p>
  </div>
);

export default RelationshipOverview;

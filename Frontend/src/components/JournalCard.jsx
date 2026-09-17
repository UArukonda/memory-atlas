import { BookOpen, CalendarDays, User } from "lucide-react";

const JournalCard = ({ journal }) => {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-border bg-surface px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition group-hover:bg-primary/10">
        <BookOpen size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-heading">{journal.title}</h3>

        <p className="mt-1 line-clamp-3 text-sm leading-6 text-body">
          {journal.description}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-2">
            <CalendarDays size={15} />
            <span>
              {new Date(journal.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </span>

          {journal.createdBy?.username && (
            <span className="flex items-center gap-2">
              <User size={15} />
              <span>{journal.createdBy.username}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalCard;

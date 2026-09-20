import { BookOpen, CalendarDays, User } from "lucide-react";

const JournalCard = ({ journal }) => {
  return (
    <div className="panel group flex items-start gap-4 rounded-xl border border-t-2 border-border border-t-accent/60 px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:border-t-accent">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent/15">
        <BookOpen size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-lg font-medium text-heading">
          {journal.title}
        </h3>

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

import { Mail, CalendarDays } from "lucide-react";

const LetterCard = ({ letter }) => {
  return (
    <div className="group flex items-center justify-between gap-5 rounded-2xl border border-border bg-surface px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition group-hover:bg-primary/10">
          <Mail size={20} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-heading">
            {letter.title}
          </h3>

          <p className="mt-1 truncate text-sm leading-6 text-muted">
            {letter.message}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-xs text-muted">
        <CalendarDays size={15} />

        <span>
          {new Date(letter.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default LetterCard;

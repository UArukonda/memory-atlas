import { Mail, CalendarDays } from "lucide-react";

const LetterCard = ({ letter, isReceived }) => {
  const isUnread = isReceived && !letter.isRead;

  return (
    <div
      className={`group flex items-center justify-between gap-5 rounded-xl border border-t-2 border-t-primary/50 px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-t-primary ${
        isUnread
          ? "border-primary/30 bg-raised shadow-lg hover:border-primary/50"
          : "border-border bg-surface hover:border-border"
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition ${
            isUnread ? "bg-primary/15 text-primary" : "bg-white/5 text-muted"
          }`}
        >
          <Mail size={20} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            {isUnread && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
            )}

            <h3
              className={`truncate font-display text-lg ${
                isUnread
                  ? "font-semibold text-heading"
                  : "font-medium text-muted"
              }`}
            >
              {letter.title}
            </h3>
          </div>

          <p className="mt-1 truncate text-sm leading-6 text-muted">
            {letter.message}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-xs text-muted">
        <CalendarDays size={15} strokeWidth={1.8} />

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

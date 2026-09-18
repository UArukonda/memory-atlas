import { Mail, CalendarDays } from "lucide-react";

const LetterCard = ({ letter, isReceived }) => {
  const isUnread = isReceived && !letter.isRead;

  return (
    <div
      className={`group flex items-center justify-between gap-5 rounded-2xl border px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isUnread
          ? "border-primary/20 bg-primary/5 hover:border-primary/30"
          : "border-border bg-surface hover:border-primary/10"
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
            isUnread
              ? "bg-primary/10 text-primary"
              : "bg-primary/5 text-primary/70"
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
              className={`truncate text-base ${
                isUnread
                  ? "font-semibold text-heading"
                  : "font-medium text-heading"
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

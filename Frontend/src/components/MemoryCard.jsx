import { MapPin, CalendarDays } from "lucide-react";

const MemoryCard = ({ memory }) => {
  return (
    <div className="panel rounded-xl border border-border transition-all duration-200 hover:-translate-y-1 hover:border-primary/40">
      <div className="px-5 pt-7">
        <div className="polaroid ">
          {memory.photos?.length > 0 ? (
            <img
              src={memory?.photos?.[0]?.url}
              alt={memory.title}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center bg-ink/10 text-sm text-ink-soft">
              <span>No photo yet</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-medium text-heading">
            {memory.title}
          </h3>
        </div>

        {memory.place && (
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={14} strokeWidth={1.8} className="text-accent" />
            <span>{memory.place}</span>
          </div>
        )}

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-body">
          {memory.description}
        </p>

        <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted">
          <CalendarDays size={14} strokeWidth={1.8} />
          <span>
            {new Date(memory.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;

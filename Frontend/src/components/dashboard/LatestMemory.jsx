import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Images } from "lucide-react";

const LatestMemory = ({ memory }) => {
  const photo = memory?.photos?.[0]?.url;

  return (
    <section className="panel rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium text-heading">
          Latest Memory
        </h2>
        <Link
          to="/memories"
          className="flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-primary-hover"
        >
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      {memory ? (
        <Link
          to={`/memories/${memory._id}`}
          className="group mt-5 grid gap-6 md:grid-cols-2"
        >
          <div className="relative overflow-hidden rounded-xl bg-raised">
            {photo ? (
              <img
                src={photo}
                alt={memory.title}
                className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center text-muted">
                <Images size={32} />
              </div>
            )}
            <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
              {new Date(memory.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-display text-3xl font-medium text-heading">
              {memory.title}
            </h3>

            {memory.place && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={14} className="text-accent" />
                <span>{memory.place}</span>
              </div>
            )}

            <p className="mt-4 line-clamp-4 text-sm leading-7 text-body">
              {memory.description}
            </p>

            <span className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-ink">
              <ArrowRight size={18} />
            </span>
          </div>
        </Link>
      ) : (
        <p className="mt-5 text-sm text-muted">
          No memories yet. Add your first one from the Memories page.
        </p>
      )}
    </section>
  );
};

export default LatestMemory;

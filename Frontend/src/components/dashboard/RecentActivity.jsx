import { Link } from "react-router-dom";
import { Images, BookOpen, Mail } from "lucide-react";

const typeStyles = {
  memory: {
    label: "Memory",
    icon: Images,
    dot: "bg-primary",
    chip: "bg-primary/10 text-primary",
  },
  journal: {
    label: "Journal",
    icon: BookOpen,
    dot: "bg-accent",
    chip: "bg-accent/10 text-accent",
  },
  letter: {
    label: "Letter",
    icon: Mail,
    dot: "bg-success",
    chip: "bg-success/10 text-success",
  },
};

const RecentActivity = ({ items }) => {
  return (
    <section className="panel rounded-2xl border border-border p-6">
      <h2 className="font-display text-2xl font-medium text-heading">
        Recent Activity
      </h2>

      {items.length === 0 ? (
        <p className="mt-5 text-sm text-muted">
          Nothing here yet. Your memories, journals and letters will appear
          here.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const { label, icon: Icon, dot, chip } = typeStyles[item.type];

            return (
              <Link
                key={item.id}
                to={item.link}
                className="group flex items-center gap-4 rounded-xl p-2 transition hover:bg-white/5"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-raised text-muted">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Icon size={22} />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className={`h-2 w-2 rounded-full ${dot}`} />
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <p className="mt-1 truncate font-display text-base font-medium text-heading">
                    {item.title}
                  </p>
                  <span
                    className={`mt-1.5 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${chip}`}
                  >
                    <Icon size={12} />
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentActivity;

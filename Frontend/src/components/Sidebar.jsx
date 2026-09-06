import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useRelationshipModal } from "../context/useRelationshipModal";
import {
  CalendarDays,
  Heart,
  Home,
  Images,
  BookOpen,
  Mail,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const { setIsOpen } = useRelationshipModal();
  const { user } = useAuth();

  const handleConnect = () => {
    setIsOpen(true);
  };

  const sidebarContent = (
    <>
      <div>
        <button
          onClick={handleConnect}
          className="mb-6 flex w-full items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-left transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm"
        >
          {/* <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {user?.username?.[0]?.toUpperCase()}
            {user?.partner && `+${user.partner.username[0].toUpperCase()}`}
          </span> */}

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-heading">
              {user?.partner
                ? `${user.username} & ${user.partner.username}`
                : "Connect with your partner"}
            </p>

            {user?.relationship?.relationshipStartDate && (
              <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted">
                <CalendarDays size={13} />
                <span>
                  Together since{" "}
                  {new Date(
                    user.relationship.relationshipStartDate,
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
            )}
          </div>
        </button>

        <nav className="flex flex-col gap-1">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-body transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <Home size={19} strokeWidth={1.8} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/memories"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-body transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <Images size={19} strokeWidth={1.8} />
            <span>Memories</span>
          </Link>

          <Link
            to="/journals"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-body transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <BookOpen size={19} strokeWidth={1.8} />
            <span>Journals</span>
          </Link>

          <Link
            to="/letters"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-body transition-all duration-200 hover:bg-primary/10 hover:text-primary"
          >
            <Mail size={19} strokeWidth={1.8} />
            <span>Letters</span>
          </Link>
        </nav>
      </div>

      <div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-xs leading-5 text-muted">
          <Heart size={15} className="shrink-0 text-primary" />
          <span>Every memory begins with a moment.</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden h-full w-64 flex-col justify-between overflow-y-auto border-r border-border bg-surface p-6 md:flex">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-64 flex-col justify-between overflow-y-auto bg-surface p-6"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;

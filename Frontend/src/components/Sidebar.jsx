import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useRelationshipModal } from "../context/useRelationshipModal";
import {
  CalendarDays,
  Heart,
  Home,
  LayoutGrid,
  Images,
  BookOpen,
  Mail,
  MessageCircle,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const { setIsOpen } = useRelationshipModal();
  const { user } = useAuth();

  const handleConnect = () => {
    setIsOpen(true);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div>
        <div className="mb-9 px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Heart size={19} fill="currentColor" />
            </div>

            <div>
              <p className="text-lg font-semibold tracking-tight text-heading">
                Memory Atlas
              </p>
              <p className="mt-0.5 text-xs text-muted">Your story, together</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConnect}
          disabled={!!user?.relationship}
          className="mb-8 w-full rounded-2xl border border-border bg-background p-4 text-left transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm disabled:cursor-default disabled:hover:border-border disabled:hover:bg-background disabled:hover:shadow-none"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-lg font-medium text-primary">
              {user?.relationship?.couplePhoto ? (
                <img
                  src={user.relationship.couplePhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  {user?.username?.[0]?.toUpperCase()}
                  {user?.partner &&
                    `+${user.partner.username[0].toUpperCase()}`}
                </>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-heading">
                {user?.partner
                  ? `${user.username} & ${user.partner.username}`
                  : "Connect with your partner"}
              </p>

              {user?.relationship?.relationshipStartDate && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <CalendarDays size={13} className="shrink-0" />

                  <span>
                    Together since{" "}
                    {new Date(
                      user.relationship.relationshipStartDate,
                    ).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </button>

        <nav className="flex flex-col gap-1.5">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-body hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <Home size={19} strokeWidth={1.9} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/memories"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-body hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <Images size={19} strokeWidth={1.9} />
            <span>Memories</span>
          </NavLink>

          <NavLink
            to="/journals"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-body hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <BookOpen size={19} strokeWidth={1.9} />
            <span>Journals</span>
          </NavLink>

          <NavLink
            to="/letters"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-body hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <Mail size={19} strokeWidth={1.9} />
            <span>Letters</span>
          </NavLink>

          <NavLink
            to="/gallery"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-body hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <LayoutGrid size={19} strokeWidth={1.8} />
            <span>Gallery</span>
          </NavLink>
          <NavLink
            to="/chat"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-body hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <MessageCircle size={19} strokeWidth={1.9} />
            <span>Chat</span>
          </NavLink>
        </nav>
      </div>

      <div className="mt-1 px-2 pb-1">
        <div className="rounded-2xl bg-primary/5 px-4 py-5">
          <Heart size={17} className="mb-3 text-primary" fill="currentColor" />
          <p className="text-sm leading-6 text-body">
            Every memory begins with a moment.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 border-r border-border bg-surface px-5 py-7 md:flex">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-72 flex-col border-r border-border bg-surface px-5 py-7"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;

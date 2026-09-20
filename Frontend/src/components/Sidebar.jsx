import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useRelationshipModal } from "../context/useRelationshipModal";
import { useSocket } from "../context/useSocket";
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
  const { unreadCount } = useSocket();
  const { user } = useAuth();

  const handleConnect = () => {
    setIsOpen(true);
  };

  const sidebarContent = (
    <div className="flex h-full min-h-fit flex-col">
      <div>
        <div className="mb-9 px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 -rotate-0 items-center justify-center rounded-lg bg-primary text-ink shadow-sm">
              <Heart size={19} fill="currentColor" />
            </div>

            <div>
              <p className="font-display text-xl font-medium tracking-tight text-heading">
                Memory Atlas
              </p>
              <p className="mt-0.5 font-display text-xs italic text-muted">
                Your story, together
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConnect}
          disabled={!!user?.relationship}
          className="panel mb-8 w-full -rotate-0 rounded-lg p-3 text-left transition-transform duration-200 hover:rotate-0 disabled:cursor-default disabled:hover:-rotate-1"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-lg font-medium text-primary ring-2 ring-paper">
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
              <p className="truncate font-display text-sm font-semibold text-heading">
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
          <SidebarLink
            to="/dashboard"
            icon={Home}
            label="Dashboard"
            onClick={onClose}
          />
          <SidebarLink
            to="/memories"
            icon={Images}
            label="Memories"
            onClick={onClose}
          />
          <SidebarLink
            to="/journals"
            icon={BookOpen}
            label="Journals"
            onClick={onClose}
          />
          <SidebarLink
            to="/letters"
            icon={Mail}
            label="Letters"
            onClick={onClose}
          />
          <SidebarLink
            to="/gallery"
            icon={LayoutGrid}
            label="Gallery"
            strokeWidth={1.8}
            onClick={onClose}
          />
          <SidebarLink
            to="/chat"
            icon={MessageCircle}
            label="Chat"
            onClick={onClose}
          >
            {unreadCount > 0 && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-ink">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </SidebarLink>
        </nav>
      </div>

      <div className="mt-auto hidden px-2 pb-1 pt-6 [@media(min-height:820px)]:block">
        <div className="rounded-md border border-dashed border-accent/30 bg-accent/5 px-4 py-5">
          <Heart size={17} className="mb-3 text-accent" fill="currentColor" />
          <p className="font-display text-sm italic leading-6 text-body">
            Every memory begins with a moment.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-border bg-[#0e1420] px-5 py-7 md:flex">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 md:hidden"
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-72 flex-col overflow-y-auto border-r border-border bg-[#0e1420] px-5 py-7"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

const SidebarLink = ({
  to,
  icon: Icon,
  label,
  onClick,
  strokeWidth = 1.9,
  children,
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md border-l-2 px-4 py-3 text-sm transition-all duration-200 ${
          isActive
            ? "border-primary bg-primary/10 font-medium text-heading"
            : "border-transparent text-body hover:border-border hover:bg-white/5 hover:text-heading"
        }`
      }
    >
      <Icon size={19} strokeWidth={strokeWidth} />
      <span>{label}</span>
      {children}
    </NavLink>
  );
};

export default Sidebar;

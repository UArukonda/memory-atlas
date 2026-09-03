import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useRelationshipModal } from "../context/useRelationshipModal";

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
          className="mb-6 flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left hover:bg-primary/5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {user?.username?.[0]?.toUpperCase()}
            {user?.partner && `+${user.partner.username[0].toUpperCase()}`}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-heading">
              {user?.partner
                ? `${user.username} & ${user.partner.username}`
                : "Connect with your partner"}
            </p>
            {user?.relationship?.relationshipStartDate && (
              <p className="mt-1 truncate text-xs text-muted">
                Together since{" "}
                {new Date(
                  user.relationship.relationshipStartDate,
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </button>

        <nav className="flex flex-col gap-1">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-body hover:bg-primary/10 hover:text-primary"
          >
            <span>🏠</span> Dashboard
          </Link>
          <Link
            to="/memories"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-body hover:bg-primary/10 hover:text-primary"
          >
            <span>📸</span> Memories
          </Link>
          <Link
            to="/journals"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-body hover:bg-primary/10 hover:text-primary"
          >
            <span>📓</span> Journals
          </Link>
          <Link
            to="/letters"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-body hover:bg-primary/10 hover:text-primary"
          >
            <span>💌</span> Letters
          </Link>
        </nav>
      </div>

      <div>
        <div className="mt-4 rounded-lg bg-primary/5 p-4 text-xs text-muted">
          Every memory begins with a moment ❤️
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
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
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

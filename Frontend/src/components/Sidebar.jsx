import { Link } from "react-router-dom";

import { useRelationshipModal } from "../context/useRelationshipModal";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useRelationshipModal();

  const handleConnect = () => {
    setIsOpen(true);
  };
  return (
    <>
      <aside className="w-64 min-h-screen border-r border-border bg-surface p-6">
        <nav className="flex flex-col gap-2">
          <button
            className="mb-2 flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-3 font-semibold text-primary hover:bg-primary/20"
            onClick={handleConnect}
          >
            <span>❤️</span>
            Connect
          </button>
          <Link
            to="/"
            className="rounded-lg px-4 py-3 text-body hover:bg-primary/10 hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/map"
            className="rounded-lg px-4 py-3 text-body hover:bg-primary/10 hover:text-primary"
          >
            Map
          </Link>
          <Link
            to="/timeline"
            className="rounded-lg px-4 py-3 text-body hover:bg-primary/10 hover:text-primary"
          >
            Timeline
          </Link>
          <Link
            to="/memories"
            className="rounded-lg px-4 py-3 text-body hover:bg-primary/10 hover:text-primary"
          >
            Memories
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

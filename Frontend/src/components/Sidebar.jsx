import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside className="w-64 min-h-screen border-r border-border bg-surface p-6">
        <nav className="flex flex-col gap-2">
          <Link
            to="/dashboard"
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

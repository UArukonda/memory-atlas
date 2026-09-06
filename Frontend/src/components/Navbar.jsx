import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth.js";
import { logoutUser } from "../services/auth";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b border-border bg-surface px-4 py-4 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-heading transition hover:bg-primary/5 hover:text-primary md:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <h1 className="truncate text-xl font-bold text-heading">
          Memory Atlas
        </h1>
      </div>

      <div className="relative shrink-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-body transition hover:border-primary/20 hover:bg-primary/5"
          aria-label="Open user menu"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {user?.username?.[0]?.toUpperCase()}
          </span>

          <span className="hidden text-sm font-medium sm:inline">
            {user?.username}
          </span>

          <ChevronDown
            size={16}
            className={`text-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg">
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-body transition hover:bg-primary/5 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <User size={17} />
              <span>Profile</span>
            </Link>

            <button
              onClick={handleClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-body transition hover:bg-primary/5 hover:text-primary"
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

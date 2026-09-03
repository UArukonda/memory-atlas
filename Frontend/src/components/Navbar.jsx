import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth.js";
import { logoutUser } from "../services/auth";

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
      <div className="flex min-w-0  items-center gap-3">
        <button
          onClick={onMenuClick}
          className="shrink-0 text-2xl text-heading md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>
        <h1 className="truncate text-xl font-bold text-heading">
          Memory Atlas
        </h1>
      </div>
      <div className="relative shrink-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-body cursor-pointer"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {user?.username?.[0]?.toUpperCase()}
          </span>
          <span className="hidden text-sm font-medium sm:inline">
            {user?.username}
          </span>
          <span className="text-xs text-muted">▾</span>
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-border bg-surface shadow-lg">
            <Link
              to="/profile"
              className="block cursor-pointer px-4 py-3 text-body hover:bg-primary/5"
              onClick={() => setIsOpen(!isOpen)}
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 text-body hover:bg-primary/5 cursor-pointer"
              onClick={handleClick}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

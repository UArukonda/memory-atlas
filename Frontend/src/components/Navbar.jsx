import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/useAuth.js";
import { logoutUser } from "../services/auth";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleClick = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex h-[72px] shrink-0 items-center justify-between border-b border-border bg-background/60 px-4 sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-heading transition hover:bg-white/5 hover:text-primary md:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div ref={dropdownRef} className="relative ml-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-2.5 py-2 transition hover:border-primary/40 hover:bg-primary/10"
          aria-label="Open user menu"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-semibold text-primary">
            {user?.username?.[0]?.toUpperCase()}
          </span>

          <span className="hidden max-w-32 truncate text-sm font-medium text-heading sm:inline">
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
          <div className="panel absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border p-1.5">
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-body transition hover:bg-primary/10 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <User size={17} />
              <span>Profile</span>
            </Link>

            <button
              onClick={handleClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-body transition hover:bg-primary/10 hover:text-primary"
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

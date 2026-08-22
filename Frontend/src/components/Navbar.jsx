import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth.js";
import { logoutUser } from "../services/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login");
  };
  return (
    <>
      <nav className="flex items-center justify-between border-b border-border bg-surface px-8 py-4">
        <div className="">
          <h1 className="text-xl font-bold text-heading">Memory Atlas</h1>
        </div>
        <div className="flex items-center gap-6">
          <p className="cursor-pointer text-muted hover:text-primary">Search</p>
          <p className="cursor-pointer text-muted hover:text-primary">
            Notification
          </p>
          <div className="relative">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-body cursor-pointer"
            >
              Account
            </button>
            {isOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-border bg-white shadow-lg">
                <Link
                  to="/profile"
                  className="block cursor-pointer px-4 py-3 text-body hover:bg-gray-100 "
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block cursor-pointer px-4 py-3 text-body hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-body hover:bg-gray-100 cursor-pointer"
                  onClick={handleClick}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

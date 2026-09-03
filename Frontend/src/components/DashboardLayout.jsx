import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { RelationshipModalProvider } from "../context/RelationshipModalProvider";
import RelationshipModal from "./RelationshipModal";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen flex-col bg-background">
      <RelationshipModalProvider>
        <Navbar onMenuClick={() => setIsOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar onClose={() => setIsOpen(false)} isOpen={isOpen} />
          <main className="flex-1 overflow-y-auto p-3">
            <Outlet />
          </main>
          <RelationshipModal />
        </div>
      </RelationshipModalProvider>
    </div>
  );
};

export default DashboardLayout;

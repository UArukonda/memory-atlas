import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { RelationshipModalProvider } from "../context/RelationshipModalProvider";
import RelationshipModal from "./RelationshipModal";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-atlas">
      <RelationshipModalProvider>
        <Sidebar onClose={() => setIsOpen(false)} isOpen={isOpen} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar onMenuClick={() => setIsOpen(true)} />

          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              <Outlet />
            </div>
          </main>
        </div>

        <RelationshipModal />
      </RelationshipModalProvider>
    </div>
  );
};

export default DashboardLayout;

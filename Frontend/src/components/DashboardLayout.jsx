import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { RelationshipModalProvider } from "../context/RelationshipModalProvider";
import RelationshipModal from "./RelationshipModal";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <RelationshipModalProvider>
        <Navbar />
        <div className="flex sticky">
          <Sidebar />
          <main className="flex-1 p-3 overflow-y-auto">
            <Outlet />
          </main>
          <RelationshipModal />
        </div>
      </RelationshipModalProvider>
    </div>
  );
};

export default DashboardLayout;

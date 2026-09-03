import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Profile from "./pages/Profile";
import MemoryDetails from "./pages/MemoryDetails";
import Letters from "./pages/Letters";
import Journals from "./pages/Journals";
import JournalDetails from "./pages/JournalDetails";
import Memories from "./pages/Memories";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/memories" element={<Memories />}></Route>
          <Route path="/memories/:id" element={<MemoryDetails />}></Route>
          <Route path="/journals" element={<Journals />}></Route>
          <Route path="/journals/:id" element={<JournalDetails />}></Route>
          <Route path="/letters" element={<Letters />}></Route>
        </Route>
      </Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
    </Routes>
  );
}

export default App;

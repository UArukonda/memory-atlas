import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Profile from "./pages/Profile";
import MemoryDetails from "./pages/MemoryDetails";
import Letters from "./pages/Letters";
import LetterDetails from "./pages/LetterDetails";
import Journals from "./pages/Journals";
import JournalDetails from "./pages/JournalDetails";
import Memories from "./pages/Memories";
import Landing from "./pages/Landing";
import Gallery from "./pages/Gallery";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<Landing />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/memories" element={<Memories />}></Route>
          <Route path="/memories/:id" element={<MemoryDetails />}></Route>
          <Route path="/journals" element={<Journals />}></Route>
          <Route path="/journals/:id" element={<JournalDetails />}></Route>
          <Route path="/letters" element={<Letters />}></Route>
          <Route path="/letters/:id" element={<LetterDetails />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
        </Route>
      </Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
    </Routes>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Activity from "./pages/Activity";
import BugList from "@/pages/BugList";
import BugForm from "./pages/BugForm";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*Redirect from root path to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/buglist" element={<BugList />} />
        <Route path="/bugForm" element={<BugForm />} />
        <Route path="/activity" element={<Activity />} />
      </Routes>
    </Router>
  );
}


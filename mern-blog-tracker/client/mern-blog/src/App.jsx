import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Comment from "./pages/Comment";
import Activity from "./pages/Activity";
import BugPage from "./pages/BugPage";
import BugCard from "./pages/BugCard";
import BugList from "./pages/BugList";
import BugDetails from "./pages/BugDetails";
import EditBug from "./pages/EditBug";
import DeleteBug from "./pages/DeleteBug";
import Navbar from "./components/Navbar";

export default function App() {
  const user = localStorage.getItem("user");
  const location = useLocation();

  //Hide Navbar on Login and Signup pages
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
    {/* Conditionally show Navbar */}
      {!hideNavbar && <Navbar />} 
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/deletebug" element={<DeleteBug />} />
        <Route path="/editbug" element={<EditBug />} />
        <Route path="/bugdetails" element={<BugDetails />} />
        <Route path="/buglist" element={<BugList />} />
        <Route path="/bugcard" element={<BugCard />} />
        <Route path="/bugpage" element={<BugPage />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

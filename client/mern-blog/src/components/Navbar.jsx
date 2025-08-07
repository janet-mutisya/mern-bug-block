
import { Link, useLocation } from "react-router-dom";
import { Bug, Home, List, Plus, LogOut, Menu, Activity } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Bug className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            MERN Bug Blog
          </h1>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Navigation Links (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLinks isActive={isActive} />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <NavLinks isActive={isActive} mobile />
        </div>
      )}
    </nav>
  );
}

// Navigation Links Component
function NavLinks({ isActive, mobile }) {
  const linkClasses = (path) =>
    `flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
      isActive(path) ? "bg-gray-700 text-yellow-400" : "text-gray-300 hover:text-white"
    }`;

  return (
    <>
      <Link to="/dashboard" className={linkClasses("/dashboard")}>
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </Link>

      <Link to="/buglist" className={linkClasses("/buglist")}>
        <List className="w-4 h-4" />
        <span>Bug List</span>
      </Link>

      <Link to="/bugform" className={linkClasses("/bugform")}>
        <Plus className="w-4 h-4" />
        <span>Report Bug</span>
      </Link>

      <Link to="/activity" className={linkClasses("/activity")}>
        <Activity className="w-4 h-4" />
        <span>Activity Log</span>
      </Link>

      <Link
        to="/login"
        className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 hover:bg-red-600 text-gray-300 hover:text-white"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </Link>
    </>
  );
}

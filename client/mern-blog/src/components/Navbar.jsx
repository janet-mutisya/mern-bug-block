import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          BugTracker
        </Link>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        <div className={`md:flex ${menuOpen ? "block" : "hidden"}`}>
          <ul className="md:flex md:space-x-4 flex-col md:flex-row space-y-2 md:space-y-0 mt-2 md:mt-0">
            <li>
              <Link to="/buglist" className="hover:underline">Bugs</Link>
            </li>
            <li>
              <Link to="/bugpage" className="hover:underline">Report Bug</Link>
            </li>
            <li>
              <Link to="/activity" className="hover:underline">Activity</Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Hi, {user.name || user.username}
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:underline">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:underline">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}


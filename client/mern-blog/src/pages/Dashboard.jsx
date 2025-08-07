import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "@/lib/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Invalid user data in localStorage:", storedUser);
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  const [totalBugs, setTotalBugs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    const fetchBugs = async () => {
      try {
        const res = await axios.get("/bugs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalBugs(res.data.length);
      } catch (error) {
        console.error("Failed to fetch bugs:", error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, [navigate, user, token]);

  if (!user || !token || loading) return null;

  return (
    <div className="p-6 space-y-4 min-h-screen bg-gradient-to-r from-gray-500 to-gray-700 text-white">
      <h1 className="transition duration-300 hover:scale-105 cursor-pointer text-3xl font-bold">
        MERN Bug Blog
      </h1>
      <p className="text-xl font-semibold">Welcome, {user.name || ""}</p>

      <div className="bg-gradient-to-r from-indigo-800 via-blue-800 to-indigo-900 text-white p-6 rounded-lg shadow-md w-fit">
        <h2 className="text-lg font-medium">Total Bugs Reported</h2>
        <p className="text-3xl font-bold text-yellow-300">{totalBugs}</p>
      </div>
    </div>
  );
}

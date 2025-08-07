import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "@/lib/api";

export default function DashboardPage() {
  const storedUser = localStorage.getItem("user");

  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Invalid user data in localStorage:", storedUser);
    localStorage.removeItem("user");
    window.location.href = "/login";
    return null;
  }

  const [totalBugs, setTotalBugs] = useState(0);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get("/bugs");
        setTotalBugs(res.data.length);
      } catch (error) {
        console.error("Failed to fetch bugs:", error);
      }
    };

    fetchBugs();
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-6 space-y-4 min-h-screen bg-gradient-to-r from-gray-500 to-gray-700 text-white">
      <h1 className="transition duration-300 hover:scale-105 cursor-pointe text-3xl font-bold">MERN Bug Blog</h1>
      <p className="  text-xl font-semibold">
        Welcome, {user.name || ""} 
      </p>
    
      <div className="bg-gradient-to-r from-indigo-800 via-blue-800 to-indigo-900 text-white p-6 rounded-lg shadow-md w-fit">
        <h2 className="text-lg font-medium">Total Bugs Reported</h2>
        <p className="text-3xl font-bold text-yellow-300">{totalBugs}</p>
      </div>
     

    </div>
  );
}



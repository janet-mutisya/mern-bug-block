import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const storedUser = localStorage.getItem("user");

  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Invalid user data in localStorage:", storedUser);
    localStorage.removeItem("user");
    window.location.href = "/login";
    return null; // Prevent component from rendering further
  }

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Mern-Bug-Blog</h1>
      <p className="text-bold text-2xl">Welcome {user.name || user.username}</p>
     
    </div>
  );
}


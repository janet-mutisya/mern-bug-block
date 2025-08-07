import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Set up socket connection
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/bugs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBugs(res.data);
      } catch (err) {
        console.error("Error fetching bugs:", err);
        setError("Could not load bugs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("bugCreated", (bug) => {
      setBugs((prev) => [bug, ...prev]);
    });

    socket.on("bugUpdated", (updatedBug) => {
      setBugs((prev) =>
        prev.map((b) => (b._id === updatedBug._id ? updatedBug : b))
      );
    });

    socket.on("bugDeleted", (deletedId) => {
      setBugs((prev) => prev.filter((b) => b._id !== deletedId));
    });

    return () => {
      socket.off("bugCreated");
      socket.off("bugUpdated");
      socket.off("bugDeleted");
    };
  }, [socket]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bug?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/bugs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // No need to manually update state here — socket will handle it.
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete bug.");
    }
  };

  const filtered = bugs.filter((bug) =>
    bug.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading bugs...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="mt-8 max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Reported Bugs</h2>

      <Input
        type="text"
        placeholder="Search bugs by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-red-500 italic text-center">
          No bugs found.
        </p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((bug) => (
            <li
              key={bug._id}
              className="border p-4 rounded shadow bg-white dark:bg-gray-900"
            >
              <h3 className="font-semibold text-lg">{bug.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {bug.description || "No description provided."}
              </p>

              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Status: <span className="capitalize">{bug.status}</span> | Created:{" "}
                {new Date(bug.createdAt).toLocaleString()}
              </div>

              {bug.assignedTo && (
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Assigned to: {bug.assignedTo.name || bug.assignedTo.username || "Unknown"}
                </div>
              )}

              <div className="mt-3 flex gap-4">
                <Button
                  onClick={() => handleDelete(bug._id)}
                  variant="destructive"
                  className="text-sm text-black-600 hover:underline"
                >
                  Delete
                </Button>

                <Button variant="default" className="text-sm text-blue-600 hover:underline">
                  Edit
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

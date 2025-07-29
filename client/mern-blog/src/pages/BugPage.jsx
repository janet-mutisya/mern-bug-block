
import React, { useEffect, useState } from "react";
import api from "../lib/api";


export default function BugPage() {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingBug, setEditingBug] = useState(null);
  const [deletingBugId, setDeletingBugId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/bugs");
      setBugs(res.data);
    } catch (err) {
      console.error("Error loading bugs:", err);
      setError("Failed to fetch bugs.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedBug) => {
    try {
      await api.put(`/api/bugs/${updatedBug._id}`, updatedBug);
      fetchBugs();
      setEditingBug(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/bugs/${id}`);
      fetchBugs();
      setDeletingBugId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredBugs = bugs.filter((bug) =>
    (statusFilter === "all" || bug.status === statusFilter) &&
    (
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.description?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search bugs..."
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading bugs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredBugs.length === 0 ? (
        <p className="text-center text-gray-500 italic">No bugs found.</p>
      ) : (
        <BugList bugs={filteredBugs} onEdit={setEditingBug} onDelete={setDeletingBugId} />
      )}

      {editingBug && (
        <EditBugModal
          bug={editingBug}
          onClose={() => setEditingBug(null)}
          onSave={handleSave}
        />
      )}

      {deletingBugId && (
        <DeleteConfirm
          bugId={deletingBugId}
          onConfirm={handleDelete}
          onCancel={() => setDeletingBugId(null)}
        />
      )}
    </div>
  );
}

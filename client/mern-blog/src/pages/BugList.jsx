
import React, { useEffect, useState } from "react";
import axios from "axios";
import BugCard from "../pages/BugCard";
import EditBug from "./EditBug";
import DeleteBug from "./DeleteBug";

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editBug, setEditBug] = useState(null);
  const [deleteBug, setDeleteBug] = useState(null);

  const fetchBugs = async () => {
    try {
      const res = await axios.get("/api/bugs");

      if (Array.isArray(res.data)) {
        setBugs(res.data);
        setFiltered(res.data);
      } else {
        console.error("Expected array, got:", res.data);
        setBugs([]);
        setFiltered([]);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setBugs([]);
      setFiltered([]);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  useEffect(() => {
    let temp = [...bugs];

    if (search) {
      temp = temp.filter((bug) =>
        bug.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      temp = temp.filter((bug) => bug.status === statusFilter);
    }

    setFiltered(temp);
  }, [search, statusFilter, bugs]);

  return (
    <div className="p-4 space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <input
          type="text"
          placeholder="Search bugs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Bug list */}
      {!Array.isArray(filtered) || filtered.length === 0 ? (
        <p>No bugs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((bug) => (
            <BugCard
              key={bug._id}
              bug={bug}
              onEdit={() => setEditBug(bug)}
              onDelete={() => setDeleteBug(bug)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {editBug && (
        <EditBugModal
          bug={editBug}
          onClose={() => setEditBug(null)}
          onUpdated={fetchBugs}
        />
      )}
      {deleteBug && (
        <ConfirmDeleteModal
          bug={deleteBug}
          onClose={() => setDeleteBug(null)}
          onDeleted={fetchBugs}
        />
      )}
    </div>
  );
}

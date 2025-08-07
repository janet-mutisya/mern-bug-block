import { useState } from "react";
import axios from "axios";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"

export default function BugForm({ onBugCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token"); 
      const res = await axios.post(
        "http://localhost:3000/api/bugs",
        { title, description, assignedTo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setDescription("");
      setAssignedTo("");
      onBugCreated?.(res.data); 
    } catch (err) {
      console.error("Bug creation failed:", err);
      setError("Failed to create bug.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded shadow max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold">Report a Bug</h2>

      <div>
        <label className="block font-medium">Title</label>
        <Input
          type="text"
          className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <Textarea
          className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">Assigned To (name)</label>
        <Input
          type="text"
          className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        variant="outline" className="hover: bg-green-600 hover:text-white text-white"
      >
        {loading ? "Reporting..." : "Submit Bug"}
      </Button>
    </form>
  );
}

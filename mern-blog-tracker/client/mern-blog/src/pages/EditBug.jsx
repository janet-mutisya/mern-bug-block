import React, { useState, useEffect } from "react";

export default function EditBugModal({ bug, onClose, onSave }) {
  const [form, setForm] = useState({ title: "", description: "", status: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (bug) {
      setForm({
        title: bug.title || "",
        description: bug.description || "",
        status: bug.status || "open",
      });
    }
  }, [bug]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({ ...bug, ...form });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={!!bug}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <Dialog.Panel className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <Dialog.Title className="text-xl font-semibold mb-4">
          Edit Bug
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Bug title"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Bug description"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-1 rounded text-white ${
                saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}

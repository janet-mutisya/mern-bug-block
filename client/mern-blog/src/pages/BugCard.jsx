
import { Pencil, Trash2 } from "lucide-react";

export default function BugCard({ bug, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow hover:shadow-md border transition">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{bug.title}</h3>
        <span
          className={`text-sm px-2 py-1 rounded-full capitalize ${
            bug.status === "resolved"
              ? "bg-green-100 text-green-700"
              : bug.status === "in progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {bug.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-2">{bug.description}</p>

      <div className="flex justify-between text-xs text-gray-500 mt-3">
        <span>Created: {bug.createdBy?.name || "Unknown"}</span>
        <span>Assigned: {bug.assignedTo?.name || "Unassigned"}</span>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button onClick={() => onEdit(bug)} className="text-blue-500 hover:text-blue-700">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(bug._id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}





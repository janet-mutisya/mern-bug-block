import React, { useState } from "react";

export default function DeleteConfirm({ bugId, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onConfirm(bugId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={!!bugId}
      onClose={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <Dialog.Panel className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-lg">
        <Dialog.Title className="text-lg font-semibold text-red-600 mb-3">
          Confirm Deletion
        </Dialog.Title>
        <p className="text-gray-700 mb-6">Are you sure you want to delete this bug? This action cannot be undone.</p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-4 py-1 text-sm rounded text-white ${
              loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

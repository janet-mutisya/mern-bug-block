import React, { useEffect, useState } from "react";
import api from "../lib/api"; 

export default function Comment({ bugId }) {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/bug/${bugId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  useEffect(() => {
    if (bugId) fetchComments();
  }, [bugId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const res = await api.post("/comments", {
        bug: bugId,
        message: newComment.trim(),
      });

      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((comment) => comment._id !== id));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const canDelete = (commentUserId) =>
    user && (user._id === commentUserId || user.role === "admin");

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border p-2 rounded"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <ul className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <li
              key={comment._id}
              className="flex justify-between items-start bg-gray-100 dark:bg-gray-700 p-3 rounded"
            >
              <div>
                <p className="font-medium text-sm">{comment.user?.name || "User"}</p>
                <p className="text-sm">{comment.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              {canDelete(comment.user?._id) && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 text-sm ml-4"
                >
                  Delete
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

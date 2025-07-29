import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function ActivityLog({ bugId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [bugId]);

  const fetchActivities = async () => {
    try {
      const res = await api.get(`/api/activities/bug/${bugId}`);
      setActivities(res.data);
    } catch (err) {
      console.error("Error fetching activity log:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading activity...</p>;
  if (activities.length === 0) return <p className="text-sm text-gray-400">No activity yet.</p>;

  return (
    <div className="bg-gray-50 border rounded-lg p-4 mt-4 space-y-2 text-sm">
      <h4 className="font-semibold mb-2 text-gray-700">Activity Log</h4>
      {activities.map((a) => (
        <div key={a._id} className="border-b pb-2 last:border-none last:pb-0">
          <p>
            <span className="font-medium">{a.user?.name || "Unknown"}</span>
             {a.action}
          </p>
          <p className="text-gray-500">{a.message}</p>
          <p className="text-gray-400 text-xs">{new Date(a.createdAt).
          toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

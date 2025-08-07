import { useEffect, useState } from "react";
import axios from "axios";

export default function Activity() {
  const [logs, setLogs] = useState([]);

  // Get the user from localStorage (or useContext if you’re using global auth)
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        if (!userId) return;

        const res = await axios.get(
          `http://localhost:3000/api/activities/${userId}`,
          { withCredentials: true }
        );
        setLogs(res.data);
      } catch (err) {
        console.error("Error loading logs", err);
      }
    };

    fetchLogs();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Activity Logs</h2>

      {logs.length === 0 ? (
        <p className="text-center text-gray-500">No activity logs yet.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li
              key={log._id}
              className="border border-gray-700 bg-gray-800 rounded-lg p-4 shadow"
            >
              <p className="text-yellow-300 font-medium">{log.action}</p>
              <p className="text-gray-300">{log.message}</p>
              <p className="text-gray-500 text-sm">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


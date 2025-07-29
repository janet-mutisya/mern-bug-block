import React, { useEffect, useState } from "react";



export default function BugDetails() {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);

  useEffect(() => {
    api.get(`/api/bugs/${bugId}`).then((res) => setBug(res.data));
  }, [bugId]);

  if (!bug) return <p>Loading bug...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">{bug.title}</h2>
      <p className="mt-2 text-gray-700">{bug.description}</p>
      <p className="mt-1 text-sm text-gray-500">Status: {bug.status}</p>

      <ActivityLog bugId={bugId} />
    </div>
  );
}

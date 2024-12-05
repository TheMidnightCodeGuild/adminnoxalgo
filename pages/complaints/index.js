import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("/api/complaints");
        const data = await res.json();

        if (res.ok) {
          setComplaints(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-2xl text-[#FFFFF0]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-neutral-800 rounded-xl shadow-2xl shadow-neutral-950/50 p-8 border border-neutral-700">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#FFFFF0]">
              All Complaints
            </h1>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 text-[#FFFFF0] rounded-lg transition-all font-semibold shadow-lg hover:shadow-xl border border-neutral-600">
              Back to Dashboard
            </button>
          </div>

          {error && (
            <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6 border border-red-800">
              {error}
            </div>
          )}

          {complaints.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              No complaints found
            </div>
          ) : (
            <div className="space-y-6">
              {complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-neutral-700 rounded-lg p-6 hover:shadow-xl transition-all border border-neutral-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-[#FFFFF0] mb-2">
                        {complaint.title}
                      </h3>
                      <p className="text-neutral-300 mb-4">
                        {complaint.description}
                      </p>
                      <p className="text-sm text-neutral-400">
                        Submitted by: {complaint.intern}
                      </p>
                    </div>
                    <div className="text-sm text-neutral-400">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

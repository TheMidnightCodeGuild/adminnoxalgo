import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BDInterns() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await fetch("/api/auth/intern/viewAll");
      const data = await response.json();

      if (response.ok) {
        setInterns(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to fetch interns");
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-[#FFFFF0]">BD Interns</h1>
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

          {interns.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              No interns found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interns.map((intern) => (
                <div
                  key={intern._id}
                  onClick={() => router.push(`/interns/${intern._id}`)}
                  className="bg-neutral-700 rounded-lg p-6 cursor-pointer hover:shadow-xl transition-all border border-neutral-600">
                  <h2 className="text-xl font-semibold text-[#FFFFF0] mb-2">
                    {intern.name}
                  </h2>
                  <p className="text-neutral-300">{intern.TeamName}</p>
                  <p className="text-neutral-300 mt-2">{intern.mobile}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('/api/complaints');
        const data = await res.json();
        
        if (res.ok) {
          setComplaints(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Complaints</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Back to Dashboard
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {complaints.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No complaints found
            </div>
          ) : (
            <div className="space-y-6">
              {complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {complaint.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{complaint.description}</p>
                      <p className="text-sm text-gray-500">
                        Submitted by: {complaint.intern}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
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

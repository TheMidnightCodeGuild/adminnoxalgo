import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function BDInterns() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const response = await fetch('/api/auth/intern/viewAll');
      const data = await response.json();
      setInterns(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching interns:', error);
      setLoading(false);
    }
  };

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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">BD Interns</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interns.map((intern) => (
            <div
              key={intern._id}
              onClick={() => router.push(`/interns/${intern._id}`)}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-900">{intern.name}</h2>
              <p className="text-gray-600 mt-2">{intern.TeamName}</p>
              <p className="text-gray-600">{intern.mobile}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
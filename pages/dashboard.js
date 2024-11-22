import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-3 text-lg">Registration Management</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/register/admin')}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Register New Admin
          </button>

          <button
            onClick={() => router.push('/register/intern')}
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Register New BD Intern
          </button>

          <button
            onClick={() => router.push('/interns')}
            className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All BD Interns
          </button>

          <button
            onClick={() => router.push('/complaints')}
            className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All Complaints
          </button>
        </div>
      </div>
    </div>
  );
}

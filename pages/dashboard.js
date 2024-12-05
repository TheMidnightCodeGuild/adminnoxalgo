import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="bg-neutral-800 rounded-xl shadow-2xl shadow-neutral-950/50 p-10 w-full max-w-lg border border-neutral-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#FFFFF0]">Dashboard</h1>
          <p className="text-neutral-400 mt-3">Registration Management</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/register/admin")}
            className="w-full bg-neutral-700 hover:bg-neutral-600 text-[#FFFFF0] py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl border border-neutral-600">
            Register New Admin
          </button>

          <button
            onClick={() => router.push("/register/intern")}
            className="w-full bg-neutral-700 hover:bg-neutral-600 text-[#FFFFF0] py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl border border-neutral-600">
            Register New BD Intern
          </button>

          <button
            onClick={() => router.push("/interns")}
            className="w-full bg-neutral-700 hover:bg-neutral-600 text-[#FFFFF0] py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl border border-neutral-600">
            View All BD Interns
          </button>

          <button
            onClick={() => router.push("/complaints")}
            className="w-full bg-neutral-700 hover:bg-neutral-600 text-[#FFFFF0] py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl border border-neutral-600">
            View All Complaints
          </button>
        </div>
      </div>
    </div>
  );
}

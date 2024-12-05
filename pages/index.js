import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-neutral-800 rounded-xl shadow-2xl shadow-neutral-950/50 p-8 w-full max-w-md border border-neutral-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#FFFFF0]">NOXALGO LLP</h1>
          <p className="text-neutral-400 mt-2">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-sm border border-red-800">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#FFFFF0] mb-2">
              Admin Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter admin username"
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#FFFFF0] mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-700 hover:bg-neutral-600 text-[#FFFFF0] font-medium py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl border border-neutral-600">
            Admin Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          For admin access issues, please contact the system administrator
        </div>
      </div>
    </div>
  );
}

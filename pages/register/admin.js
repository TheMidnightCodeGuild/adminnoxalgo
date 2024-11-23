import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="bg-neutral-800 rounded-xl shadow-2xl shadow-neutral-950/50 p-10 w-full max-w-lg border border-neutral-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#FFFFF0]">
            Admin Registration
          </h1>
          <p className="text-neutral-400 mt-3">Create an admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/50 text-red-300 p-4 rounded-lg text-sm border border-red-800">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#FFFFF0] mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#FFFFF0] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-700 hover:bg-neutral-600 text-[#FFFFF0] py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl border border-neutral-600">
            Create Admin Account
          </button>
        </form>
      </div>
    </div>
  );
}

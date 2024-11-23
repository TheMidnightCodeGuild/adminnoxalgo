import { useState } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    referalCode: "",
    teamName: "",
    teamLeader: "",
    dataAssigned: "",
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
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const res = await fetch("/api/auth/intern/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          password: hashedPassword,
        }),
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
          <h1 className="text-3xl font-bold text-[#FFFFF0]">Join Our Team</h1>
          <p className="text-neutral-400 mt-3">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/50 text-red-300 p-4 rounded-lg text-sm border border-red-800">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#FFFFF0] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
                placeholder="John Doe"
              />
            </div>

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
                placeholder="johndoe123"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-[#FFFFF0] mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#FFFFF0] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>
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
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="referalCode"
              className="block text-sm font-medium text-[#FFFFF0] mb-2">
              Referral Code <span className="text-neutral-400">(Optional)</span>
            </label>
            <input
              type="text"
              id="referalCode"
              name="referalCode"
              value={formData.referalCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
              placeholder="Enter referral code"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-[#FFFFF0] mb-2">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
                placeholder="Enter team name"
              />
            </div>

            <div>
              <label
                htmlFor="teamLeader"
                className="block text-sm font-medium text-[#FFFFF0] mb-2">
                Team Leader
              </label>
              <input
                type="text"
                id="teamLeader"
                name="teamLeader"
                value={formData.teamLeader}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
                placeholder="Enter team leader name"
              />
            </div>
            <div>
              <label
                htmlFor="dataAssigned"
                className="block text-sm font-medium text-[#FFFFF0] mb-2">
                Data Assigned
              </label>
              <input
                type="text"
                id="dataAssigned"
                name="dataAssigned"
                value={formData.dataAssigned}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-[#FFFFF0] placeholder-neutral-400 focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all outline-none"
                placeholder="Enter data assigned"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-700 hover:bg-neutral-600 text-[#FFFFF0] py-4 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-xl border border-neutral-600">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

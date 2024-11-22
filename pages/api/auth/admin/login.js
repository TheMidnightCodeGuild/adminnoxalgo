import { withSessionRoute } from "@/lib/session";
import Admin from "@/models/Admin";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export default withSessionRoute(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Connect to MongoDB
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const { username, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Set session
    req.session.admin = {
      id: admin._id,
      username: admin.username
    };
    await req.session.save();

    return res.status(200).json({ message: "Logged in successfully" });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Simple check (replace with database check in production)
    if (username === "admin" && password === "admin") {
      const token = "secure-token"; // Generate secure token in production
      res.setHeader(
        "Set-Cookie",
        serialize("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        })
      );
      return res.status(200).json({ message: "Login successful" });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

// pages/api/auth/check-auth.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.auth_token;

  if (token === "secure-token") {
    return res.status(200).json({ authenticated: true });
  }

  res.status(401).json({ authenticated: false });
}

import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import TeamMember from "../../../models/TeamMembers";

// Middleware function to disable Next.js body parser
export const config = {
  api: {
    bodyParser: true, // Enable bodyParser since we're not handling file uploads
  },
};

// API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect(); // Ensure DB connection is established

  if (req.method === "POST") {
    try {
      const { name, expertise, experience } = req.body;

      if (!name || !expertise || !experience) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Save team member with a dummy image URI
      const newTeamMember = new TeamMember({
        name,
        expertise,
        experience,
        image: "https://dummyimage.com/600x400/000/fff", // Dummy image URI
      });

      const savedMember = await newTeamMember.save();
      return res.status(201).json(savedMember);
    } catch (error) {
      console.error("Error during POST request:", error);
      return res.status(500).json({ error: "Error creating team member" });
    }
  } else if (req.method === "GET") {
    try {
      // Fetch all team members
      const teamMembers = await TeamMember.find();
      return res.status(200).json(teamMembers);
    } catch (error) {
      console.error("Error during GET request:", error);
      return res.status(500).json({ error: "Error fetching team members" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

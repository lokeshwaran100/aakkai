import mongoose, { Document, Schema } from "mongoose";

// Defining the interface for TeamMember
interface ITeamMember extends Document {
  name: string;
  expertise: string;
  experience: number;
  image: any; // Store image URL or image name
}

const TeamMemberSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }, // GridFS file ID
  },
  {
    timestamps: true,
  }
);

const TeamMember =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;

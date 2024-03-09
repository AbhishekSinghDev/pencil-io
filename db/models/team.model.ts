import mongoose, { Document, models } from "mongoose";
import { ProjectInterface } from "./project.model";
import { UserInterface } from "./user.model";

export interface TeamInterface extends Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  limit: number;
  owner: string;
  projects: ProjectInterface[];
  members: UserInterface[];
}

const TeamScehma: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    limit: { type: Number, default: 5 },
  },
  { timestamps: true }
);

const Team = models.Team || mongoose.model("Team", TeamScehma);

export default Team;

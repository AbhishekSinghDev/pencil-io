import mongoose, { Document, models } from "mongoose";
import { ProjectInterface } from "./project.model";

export interface TeamInterface extends Document {
  _id: string;
  createdAt: Date;
  owner: string;
  projects: ProjectInterface;
}

const TeamScehma: mongoose.Schema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

const Team = models.Team || mongoose.model("Team", TeamScehma);

export default Team;

import mongoose, { Document, models } from "mongoose";

export interface ProjectInterface extends Document {
  _id: string;
  createdAt: Date;
  team: string;
  data: string;
}

const ProjectSchema: mongoose.Schema = new mongoose.Schema(
  {
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    data: { type: String, default: "" },
  },
  { timestamps: true }
);

const Project = models.Project || mongoose.model("Project", ProjectSchema);

export default Project;

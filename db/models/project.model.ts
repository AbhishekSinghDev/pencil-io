import mongoose, { Document, models } from "mongoose";

export interface ProjectInterface extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  team: string;
  canvasData: String;
  editorData: String;
  name: string;
  createdBy: string;
}

const ProjectSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, default: "untitled" },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    editorData: { type: String, default: "" },
    canvasData: { type: String, default: "" },
    createdBy: { type: String },
  },
  { timestamps: true }
);

const Project = models.Project || mongoose.model("Project", ProjectSchema);

export default Project;

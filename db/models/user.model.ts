import mongoose, { Document, models } from "mongoose";
import { TeamInterface } from "./team.model";

export interface UserInterface extends Document {
  _id: string;
  createdAt: Date;
  username: string;
  email: string;
  teams: TeamInterface;
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    isPremiumUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;

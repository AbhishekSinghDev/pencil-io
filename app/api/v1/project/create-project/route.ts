import connectToDatabase from "@/db/connectDatabase";
import Project from "@/db/models/project.model";
import Team, { TeamInterface } from "@/db/models/team.model";
import User, { UserInterface } from "@/db/models/user.model";
import { handleApiError } from "@/lib/error";
import jwt, { JwtPayload } from "jsonwebtoken";

export const POST = async (req: Request) => {
  const token = (req.headers.get("authorization") || "").split("Bearer ").at(1);

  if (!token) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "please login first to create team",
      })
    );
  }

  const body = await req.json();
  const { team_id, project_name } = body;

  try {
    const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY) || "";
    const result = jwt.verify(token, JWT_SECRET_KEY);

    const result_out = result as JwtPayload;
    if (result) {
      const user = result_out.user;
      await connectToDatabase();

      const currentUser: UserInterface | null = await User.findById(user._id);

      if (!currentUser) {
        handleApiError(new Error("unauthorized"));
        return;
      }

      const team: TeamInterface | null = await Team.findById(team_id);

      if (!team) {
        handleApiError(new Error("server error"));
        return;
      }

      const totalProjectsLength = team.projects.length;
      const isPremiumUser = currentUser.isPremiumUser;

      if (isPremiumUser === false) {
        if (totalProjectsLength >= team.limit) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "out of free resources",
              length: totalProjectsLength,
            }),
            { status: 400 }
          );
        }
      }

      const newProject = new Project({
        name: project_name,
        team: team_id,
        createdBy: user.username,
      });

      const projectCreated = await newProject.save();
      await Team.findByIdAndUpdate(team_id, {
        $push: { projects: projectCreated._id },
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "project created",
          length: totalProjectsLength + 1,
          project: projectCreated,
        }),
        { status: 201 }
      );
    }

    return new Response(
      JSON.stringify(
        JSON.stringify({
          success: false,
          message: "unauthorized",
        })
      ),
      { status: 500 }
    );
  } catch (err) {
    handleApiError(err);
  }
};

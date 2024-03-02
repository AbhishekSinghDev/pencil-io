import connectToDatabase from "@/db/connectDatabase";
import Project from "@/db/models/project.model";
import Team from "@/db/models/team.model";
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
  const { team_id } = body;

  try {
    const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY) || "";
    const result = jwt.verify(token, JWT_SECRET_KEY);

    const result_out = result as JwtPayload;
    if (result) {
      const user = result_out.user;
      await connectToDatabase();

      const newProject = new Project({
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

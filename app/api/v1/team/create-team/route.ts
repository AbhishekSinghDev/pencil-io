import connectToDatabase from "@/db/connectDatabase";
import Team from "@/db/models/team.model";
import User from "@/db/models/user.model";
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
  const { name } = body;

  try {
    const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY) || "";
    const result = jwt.verify(token, JWT_SECRET_KEY);

    const result_out = result as JwtPayload;
    if (result) {
      const user = result_out.user;
      await connectToDatabase();

      const newTeam = new Team({
        name: name,
        owner: user._id,
      });

      const team = await newTeam.save();
      const teams = await Team.find({ owner: user._id }).populate("projects");
      await User.findByIdAndUpdate(
        user._id,
        {
          $push: { teams: team._id },
        },
        { new: true }
      );

      return new Response(
        JSON.stringify({
          success: true,
          message: "team created",
          team: teams,
        }),
        {
          status: 201,
        }
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

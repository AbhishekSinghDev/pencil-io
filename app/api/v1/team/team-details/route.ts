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
        message: "login first",
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

      const teamDetails = await Team.findById(team_id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "team details fetched successfully",
          team: teamDetails,
        })
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

import connectToDatabase from "@/db/connectDatabase";
import Team from "@/db/models/team.model";
import { handleApiError } from "@/lib/error";
import jwt, { JwtPayload } from "jsonwebtoken";
import { models } from "mongoose";

export const GET = async (req: Request) => {
  const token = (req.headers.get("authorization") || "").split("Bearer ").at(1);

  if (!token) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "please login first to create team",
      })
    );
  }

  try {
    const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY) || "";
    const result = jwt.verify(token, JWT_SECRET_KEY);

    const result_out = result as JwtPayload;
    if (result) {
      const user = result_out.user;

      //! found intresting bug before projects initializes i was trying to populate projects filed from project collection even before it created

      if (models.Project) {
        const teams = await Team.find({ owner: user._id }).populate("projects");

        return new Response(
          JSON.stringify({
            success: true,
            message: "teams fetched successfully",
            teams: teams,
          }),
          {
            status: 200,
          }
        );
      }
      const teams = await Team.find({ owner: user._id });

      return new Response(
        JSON.stringify({
          success: true,
          message: "teams fetched successfully",
          teams: teams,
        }),
        {
          status: 200,
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

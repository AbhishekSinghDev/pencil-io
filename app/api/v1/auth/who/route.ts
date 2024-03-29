import connectToDatabase from "@/db/connectDatabase";
import User from "@/db/models/user.model";
import { handleApiError } from "@/lib/error";
import jwt, { JwtPayload } from "jsonwebtoken";

export const POST = async (req: Request) => {
  const token = (req.headers.get("authorization") || "").split("Bearer ").at(1);

  if (!token) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "please login first to access dashboard",
      })
    );
  }

  try {
    await connectToDatabase();

    const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY) || "";
    const result = jwt.verify(token, JWT_SECRET_KEY);

    const result_out = result as JwtPayload;
    if (result) {
      delete result_out.user.password;
      const userid = result_out.user._id;

      const user = await User.findById(userid).populate("teams");

      return new Response(
        JSON.stringify({
          success: true,
          message: "authorized user",
          user: user,
        }),
        { status: 200 }
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

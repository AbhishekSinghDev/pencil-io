import connectToDatabase from "@/db/connectDatabase";
import User, { UserInterface } from "@/db/models/user.model";
import { handleApiError } from "@/lib/error";
import generateToken from "@/lib/jwt/generateToken";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { password, email } = body;

  if (!password || !email) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "please provide username, password and email",
      }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    // check for email exists or not
    const isUserExists = await User.findOne({ email: email });
    if (isUserExists === null || Object.keys(isUserExists).length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "no user found with the provided email",
        }),
        { status: 400 }
      );
    }

    const isAuthorized = isUserExists.password === password;

    if (isAuthorized) {
      const token = generateToken(isUserExists);

      return new Response(
        JSON.stringify({
          success: true,
          message: "user logged in successfully",
          user: isUserExists,
          token: token,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "wrong password",
      }),
      { status: 401 }
    );
  } catch (err) {
    handleApiError(err);
  }
};

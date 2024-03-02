import connectToDatabase from "@/db/connectDatabase";
import Team from "@/db/models/team.model";
import User from "@/db/models/user.model";
import { handleApiError } from "@/lib/error";
import generateToken from "@/lib/jwt/generateToken";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { username, password, email } = body;

  if (!username || !password || !email) {
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

    // check if username already exists or not
    const isUsernameExists = await User.find({ username: username });
    if (
      isUsernameExists !== null &&
      Object.keys(isUsernameExists).length !== 0
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "username already exists",
        }),
        { status: 400 }
      );
    }

    // check for email already exists or not
    const isEmailExists = await User.find({ email: email });
    if (isEmailExists !== null && Object.keys(isEmailExists).length !== 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "email already exists",
        }),
        { status: 400 }
      );
    }

    // create new user
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    const newTeam = new Team({
      name: username,
      owner: newUser._id,
    });

    const user = await newUser.save();
    await newTeam.save();
    const token = generateToken(user);

    return new Response(
      JSON.stringify({
        success: true,
        message: "user created successfully",
        user: user,
        token: token,
      }),
      { status: 201 }
    );
  } catch (err) {
    handleApiError(err);
  }
};

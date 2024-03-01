import jwt from "jsonwebtoken";
import { handleApiError } from "../error";

const generateToken = (user: any) => {
  const JWT_SECRET_KEY: string = String(process.env.JWT_SECRET_KEY);
  try {
    const token = jwt.sign({ user }, JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    return token;
  } catch (err) {
    console.log(err);

    handleApiError(err);
  }
};

export default generateToken;

import jwt from "jsonwebtoken";

const generateToken = async (user: any) => {
  const token = await jwt.sign(user, "key");
  return token;
};

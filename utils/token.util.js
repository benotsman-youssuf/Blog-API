import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const genTokenAndSetCookie = (user, res) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

  // Set the token in an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

export default genTokenAndSetCookie;

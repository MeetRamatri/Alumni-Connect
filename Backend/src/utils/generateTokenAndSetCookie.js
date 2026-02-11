import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ id: userId }, secret, { expiresIn: "7d" });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res.cookie("token", token, cookieOptions);
  return token;
};

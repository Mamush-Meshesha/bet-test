import jwt from "jsonwebtoken";

export const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3600 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

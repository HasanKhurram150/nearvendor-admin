// utils/auth.js

import jwt from "jsonwebtoken";

const secretKey = "your-secret-key"; // Replace this with your own secret key
const refreshTokenSecret = "your-refresh-token-secret"; // Replace this with your own refresh token secret key

export const generateTokens = (data: any) => {
  const accessToken = jwt.sign({ data }, secretKey, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({}, refreshTokenSecret, { expiresIn: "7d" }); // Set refresh token expiration time as desired

  return { accessToken, refreshToken };
};

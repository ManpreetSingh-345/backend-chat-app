import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function getNewAccessToken(req, res) {
  const token = req.cookies.token;
  const foundUser = await User.findOne({ refreshToken: token });

  console.log(foundUser);

  if (!foundUser) {
    return res.sendStatus(401);
  }

  const newAccessToken = jwt.sign(
    { username: req.body.name },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 5,
    }
  );

  res.json({
    message: "User's access token refreshed successfully",
    newAccessToken,
  });
}

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function getNewAccessToken(req, res) {
  const token = req.cookies.token;
  const foundUser = await User.findOne({ refreshToken: token });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    const newAccessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 5,
      }
    );

    const name = decoded.username;

    res.json({
      message: "User's access token refreshed successfully",
      newAccessToken,
      name,
    });
  });
}

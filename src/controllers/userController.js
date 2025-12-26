import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function addNewUser(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await user.save();

    res.json({
      message: "Added new user successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding user" });
  }
}

export async function lookUpUser(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const accessPayload = {
        username,
      };
      const accessToken = jwt.sign(
        accessPayload,
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 5, // Testing purposes
        }
      );
      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: 60, // Testing purposes
        }
      );

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
      res.json({
        message: "User found successfully",
        user,
        accessToken,
      });
    } else {
      res.json({ message: "User not found." });
    }
  } catch (error) {
    res.status(404).json({ message: "Error retrieving user" });
  }
}

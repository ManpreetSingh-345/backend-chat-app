import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function addNewUser(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      username,
      password,
      email,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 60 * 15,
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7 days",
    });

    const user = new User({
      username,
      password: hashedPassword,
      email,
      refreshToken,
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

    match
      ? res.json({
          message: "User found successfully",
          user,
        })
      : res.json({ message: "User not found." });
  } catch (error) {
    res.status(404).json({ message: "Error retrieving user" });
  }
}

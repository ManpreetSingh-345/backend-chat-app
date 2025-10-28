import bcrypt from "bcrypt";
import User from "../models/User.js";

export async function addNewUser(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, email });

    const savedUser = await user.save();

    res.json({
      message: "Added new user successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding user" });
  }
}

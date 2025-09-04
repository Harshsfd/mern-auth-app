import User from "../models/User.js";
import { createJWT } from "../config/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, mobile });
    const token = createJWT(user._id);

    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = createJWT(user._id);
      res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
      res.json({ _id: user._id, name: user.name, email: user.email, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

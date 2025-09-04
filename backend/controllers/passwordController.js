import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";

// forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user with this email" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000; // 1hr
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail(user.email, "Password Reset", `<p>Reset here: <a href="${resetUrl}">${resetUrl}</a></p>`);

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("FORGOT ERROR:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({
      message: "Password reset successful",
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error("RESET ERROR:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

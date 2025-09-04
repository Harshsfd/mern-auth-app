import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";

// @desc    Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `<p>You requested a password reset</p><p>Click this link: <a href="${resetUrl}">${resetUrl}</a></p>`;

    await sendEmail(user.email, "Password Reset", message);

    res.json({ message: "Email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful", token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

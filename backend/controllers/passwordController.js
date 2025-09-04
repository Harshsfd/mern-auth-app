const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const CLIENT_URL = process.env.CLIENT_URL;

// Forgot password - create reset token and email link
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If account exists, reset link will be sent' }); // avoid user enumeration

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    const resetLink = `${CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`;

    const html = `<p>Hello ${user.name},</p>
      <p>Click to reset your password (valid 1 hour):</p>
      <a href="${resetLink}">Reset Password</a>`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html
    });

    res.json({ message: 'If account exists, reset link sent to email' });
  } catch (err) {
    next(err);
  }
};

// Reset password - verify token and set new password
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, id } = req.query;
    const { password } = req.body;
    if (!token || !id) return res.status(400).json({ message: 'Invalid or missing token/ID' });
    if (!password) return res.status(400).json({ message: 'Password required' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      _id: id,
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can login with new password.' });
  } catch (err) {
    next(err);
  }
};
      

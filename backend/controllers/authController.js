const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

const CLIENT_URL = process.env.CLIENT_URL;

// Register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashed,
      isVerified: false
    });

    // Generate verification token (short lived)
    const verifyToken = crypto.randomBytes(32).toString('hex');
    // We could store hashed verify token if desired; here use JWT link
    const token = generateToken({ id: user._id });
    const verifyLink = `${CLIENT_URL}/verify-email?token=${token}`;

    // send verification email
    const html = `<p>Hello ${user.name},</p>
      <p>Please verify your email by clicking below:</p>
      <a href="${verifyLink}">Verify Email</a>
      <p>If you did not register, ignore.</p>`;

    await sendEmail({
      to: user.email,
      subject: 'Verify your email',
      html
    });

    res.status(201).json({ message: 'User registered. Verification email sent.' });
  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified) {
      // optionally allow login but restrict some actions; here block
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    const token = generateToken({ id: user._id });

    // Optionally send token as cookie:
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

// Verify email (via token)
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Token required' });

    const payload = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(400).json({ message: 'Invalid token' });

    user.isVerified = true;
    await user.save();

    res.json({ message: 'Email verified. You can now login.' });
  } catch (err) {
    next(err);
  }
};

// Logout
exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
      

// Protected user endpoints
exports.getProfile = async (req, res, next) => {
  try {
    // req.user set by authMiddleware
    const user = req.user;
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, mobile } = req.body;
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    await user.save();
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

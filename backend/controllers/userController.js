// @desc    Get user profile
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// @desc    Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    req.user.name = req.body.name || req.user.name;
    req.user.email = req.body.email || req.user.email;
    if (req.body.password) req.user.password = req.body.password;
    const updatedUser = await req.user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

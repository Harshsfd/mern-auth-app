export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const user = req.user;
  user.name = req.body.name || user.name;
  user.mobile = req.body.mobile || user.mobile;
  if (req.body.password) user.password = req.body.password;
  await user.save();
  res.json(user);
};

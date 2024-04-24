// userController.js

const getUser = (req, res) => {
  if (!req.user) {
    return res.json({ message: "No user is logged in." });
  }
  res.json({
    user: req.user,
    message: `${req.user.username} is logged in.`,
  });
};

module.exports = {
  getUser,
};

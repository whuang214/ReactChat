const User = require("../models/userModel");

const getUser = (req, res) => {
  if (!req.user) {
    return res.json({ message: "No user is logged in." });
  }
  res.json({
    user: req.user,
    message: `${req.user.username} is logged in.`,
  });
};

const searchUser = async (req, res) => {
  const { term } = req.query;
  if (!term) {
    return res.status(400).json({ error: "Search term is required." });
  }

  try {
    // Search for users based on the search term using Mongoose
    const results = await User.find({
      $or: [
        { username: { $regex: term, $options: "i" } }, // Case-insensitive username search
        { displayName: { $regex: term, $options: "i" } }, // Case-insensitive display name search
      ],
    });
    console.log("Search results:", results);
    res.json({ results });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for users." });
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    // Find a user by ID using Mongoose
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user by ID." });
  }
};

module.exports = {
  getUser,
  searchUser,
  getUserByID,
};

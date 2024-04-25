// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.get("/search", userController.searchUser);
router.get("/search:id", userController.getUserByID);

module.exports = router;

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/conversations", chatController.getConversations); // Get all conversations (minus messages)
router.get("/conversations/:conversationId", chatController.getConversation); // Get a specific conversation
router.delete(
  "/conversations/:conversationId",
  chatController.deleteConversation
); // delete a specific conversation
router.post("/conversations", chatController.createConversation); // Create a new conversation
router.post("/conversations/:conversationId", chatController.sendMessage); // Send a message to a conversation

module.exports = router;

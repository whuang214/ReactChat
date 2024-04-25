const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

// get all conversations that have req.user._id as a participant
async function getConversations(req, res) {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    }).populate("participants");
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getConversation(req, res) {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId)
      .populate("participants")
      .populate("messages");
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createConversation(req, res) {
  try {
    const { participants } = req.body;
    const newConversation = await Conversation.create({ participants });
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function sendMessage(req, res) {
  try {
    const { conversationId } = req.params;
    const { sender, content } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const message = await Message.create({ sender, content });
    conversation.messages.push(message);
    await conversation.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getConversations,
  getConversation,
  createConversation,
  sendMessage,
};
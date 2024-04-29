const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

// get all conversations that have req.user._id in the participants array
// sort by most recent conversation at index 0
async function getConversations(req, res) {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .sort({ updatedAt: -1 })
      .populate("participants");
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  return;
}

async function getConversation(req, res) {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId)
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          select: "username displayName avatarUrl",
        },
      })
      .populate("participants");

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
    const { participants, name } = req.body;
    // Initialize conversation object with type set based on participant count
    const conversationData = {
      participants: [...participants, req.user._id], // add the current user to the participants array
      type: participants.length > 1 ? "group" : "private", // Determine if it's a group based on participant count
      name: participants.length > 1 ? name : "", // Only set a name if it's a group conversation
    };

    const newConversation = await Conversation.create(conversationData);

    res.status(201).json(newConversation);
  } catch (error) {
    console.error("Failed to create conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteConversation(req, res) {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    await Conversation.findOneAndDelete({ _id: conversationId });
    res.json({ message: "Conversation deleted" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function sendMessage(req, res) {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const message = await Message.create({ sender: req.user._id, content });
    conversation.messages.push(message);
    await conversation.save();

    res.status(201).json(message);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getConversations,
  getConversation,
  createConversation,
  deleteConversation,
  sendMessage,
};

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
    if (participants.length > 1) {
      // if participants is more than 1, then it is a group chat
      newConversation.type = "group";
    }
    // Populate the participants array
    await newConversation.populate("participants").execPopulate();
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteConversation(req, res) {
  console.log("req.params", req.params);
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
  deleteConversation,
  sendMessage,
};

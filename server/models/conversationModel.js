const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    name: { type: String, default: "" }, // Name of the conversation
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ], // Array of User IDs participating in the conversation
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }], // Array of message IDs associated with the conversation
    type: { type: String, default: "private" }, // Type of conversation (private or group)
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;

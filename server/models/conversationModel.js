const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ], // Array of User IDs participating in the conversation
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }], // Array of message IDs associated with the conversation
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;

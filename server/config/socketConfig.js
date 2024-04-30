const socketio = require("socket.io");
const mongoose = require("mongoose");
const Conversation = require("../models/conversationModel"); // Ensure this path correctly points to your Conversation model
require("dotenv").config();

let io;
let conversationChangeStreams = {};
let conversationParticipants = {};

const allowOrigin =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_FRONTEND_ORIGIN
    : process.env.PROD_FRONTEND_ORIGIN;

const init = (server) => {
  io = socketio(server, {
    cors: {
      origin: allowOrigin, // Adjust as necessary
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinConversation", (conversationId) => {
      // Check if a change stream already exists for this conversation
      if (!conversationChangeStreams[conversationId]) {
        const objectId = new mongoose.Types.ObjectId(conversationId);
        const filter = [{ $match: { "fullDocument._id": objectId } }];
        const options = { fullDocument: "updateLookup" };
        const changeStream = Conversation.watch(filter, options);

        conversationChangeStreams[conversationId] = changeStream;
        conversationParticipants[conversationId] = new Set([socket.id]);

        changeStream.on("change", (change) => {
          io.to(conversationId).emit("fetchCurrentConversation", {
            conversationId: conversationId,
            update: change.fullDocument,
          });
        });

        changeStream.on("close", () => {
          console.log("Change stream closed for", conversationId);
        });
      } else {
        conversationParticipants[conversationId].add(socket.id);
      }

      // Join the socket to a room for this conversation
      socket.join(conversationId);
    });

    socket.on("disconnect", () => {
      // Remove the socket from any conversations it was part of
      Object.keys(conversationParticipants).forEach((conversationId) => {
        conversationParticipants[conversationId].delete(socket.id);
        if (conversationParticipants[conversationId].size === 0) {
          // Close change stream if no more participants
          conversationChangeStreams[conversationId].close();
          delete conversationChangeStreams[conversationId];
          delete conversationParticipants[conversationId];
        }
      });
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = {
  init,
  getIO,
};

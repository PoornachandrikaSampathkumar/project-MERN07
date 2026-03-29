const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  eventId: String,
  user: String,
  text: String,
  parentId: { type: String, default: null },
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema); // Capital C
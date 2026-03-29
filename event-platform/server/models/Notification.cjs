const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: String,
  message: String,
  read: { default: false, type: Boolean }
});

module.exports = mongoose.model("Notification", NotificationSchema);
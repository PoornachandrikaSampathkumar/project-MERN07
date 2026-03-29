const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  venue: String,
  date: String
});

module.exports = mongoose.model("Event", EventSchema); // Capital E
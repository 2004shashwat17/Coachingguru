const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  completed: Boolean,
  thumbnail: String, // store image path or URL
});

module.exports = mongoose.model("Topic", topicSchema);

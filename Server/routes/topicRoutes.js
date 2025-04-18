const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");

// Add a topic
router.post("/add", async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).send({ message: "Topic saved successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get all topics
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;

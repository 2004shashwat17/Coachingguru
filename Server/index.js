const express = require("express");

const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://shashwats500:w8b8OdxuYxdvYVw9@test-prodb.kzogbhb.mongodb.net/?retryWrites=true&w=majority&appName=test-prodb");
mongoose.connect("mongodb+srv://shashwats500:w8b8OdxuYxdvYVw9@test-prodb.kzogbhb.mongodb.net/?retryWrites=true&w=majority&appName=test-prodb")
  .then(() => {
    console.log("✅ MongoDB Connected");
    insert(); 
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

const app = express();

const Topic = require('./models/Topic');

async function insert() {
  await Topic.deleteMany({}); 
  await Topic.insertMany([
    { 
      id: 1,
      title: 'Introduction to AI',
      description: 'Basics of Artificial Intelligence, focusing on key concepts, tools, and applications in the AI field.',
      completed: true,
      thumbnail: 'ai-thumbnail.jpg'
    },
    {
      id: 2,
      title: 'Machine Learning',
      description: 'Understanding machine learning algorithms and how they are applied to solve real-world problems.',
      completed: false,
      thumbnail: 'blockchain-thumbnail.jpg'
    },
    {
      id: 3,
      title: 'Deep Learning',
      description: 'Exploring the world of deep neural networks and their applications in tasks like image and speech recognition',
      completed: false,
      thumbnail: 'quantum-thumbnail.jpg'
    },
    {
      id: 4,
      title: 'Object Oriented Programming',
      description: 'Explaining object-oriented programming concepts like inheritance, polymorphism, and encapsulation.',
      completed: false,
      thumbnail: 'blockchain-thumbnail.jpg'
    },
    {
      id: 5,
      title: 'ML part2',
      description: 'A deeper dive into advanced machine learning algorithms and techniques.',
      completed: false,
      thumbnail: 'blockchain-thumbnail.jpg'
    },
    {
      id: 6,
      title: 'ML part 3',
      description: 'Continuing with advanced machine learning concepts, including deep learning and reinforcement learning.',
      completed: false,
      thumbnail: 'blockchain-thumbnail.jpg'
    },
    {
      id: 7,
      title: 'Deep Learning 2',
      description: 'An in-depth exploration of advanced topics in deep learning, including GANs and transfer learning',
      completed: false,
      thumbnail: 'blockchain-thumbnail.jpg'
    },
    {
      id: 8,
      title: 'Blockchain',
      description: 'An overview of Block Chain and its Currencies , tools, and techniques to build intelligent systems.',
      completed: false,
      thumbnail: 'blockchain-thumbnail.jpg'
    },
    {
      id: 9,
      title: 'Is AI boom or Curse ?',
      description: 'A discussion on the positive and negative impacts of AI on society, ethics, and future job markets.',
      completed: false,
      thumbnail: 'blockchain-thumbnail.jpg'
    },
    {
      id: 10,
      title: 'Technology uses',
      description: 'The impact of technology on modern society, including benefits and potential risks.',
      completed: false,
      thumbnail: 'blockchain-thumbnail.jpg'
    },
  ]);
}

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

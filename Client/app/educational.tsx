import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-native";
import { TextInput, Alert } from "react-native";
import axios from "axios";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import * as Speech from "expo-speech";

const topics = [
  {
    id: "1",
    title: "Introduction to AI",
    description: "Basics of Artificial Intelligence, focusing on key concepts, tools, and applications in the AI field.",
    thumbnail: require("./../assets/images/landing.png"),
    completed: false,
  },
  {
    id: "2",
    title: "Machine Learning",
    description: "Understanding machine learning algorithms and how they are applied to solve real-world problems.",
    thumbnail: require("./../assets/images/landing.png"),
    completed: false,
  },
  {
    id: "3",
    title: "Deep Learning",
    description: "Exploring the world of deep neural networks and their applications in tasks like image and speech recognition.",
    thumbnail: require("./../assets/images/landing.png"),
    completed: false,
  },
  {
    id: "4",
    title: "Object Oriented Programming",
    description: "Explaining object-oriented programming concepts like inheritance, polymorphism, and encapsulation.",
    thumbnail: require("./../assets/images/landing.png"),
    completed: false,
  },
  {
    id: "5",
    title: "ML part2",
    description: "A deeper dive into advanced machine learning algorithms and techniques.",
    thumbnail: require("./../assets/images/partial-react-logo.png"),
    completed: false,
  },
  {
    id: "6",
    title: "ML part 3",
    description: "Continuing with advanced machine learning concepts, including deep learning and reinforcement learning.",
    thumbnail: require("./../assets/images/splash-icon.png"),
    completed: false,
  },
  {
    id: "7",
    title: "Deep Learning 2",
    description: "An in-depth exploration of advanced topics in deep learning, including GANs and transfer learning.",
    thumbnail: require("./../assets/images/landing.png"),
    completed: false,
  },
  {
    id: "8",
    title: "Blockchain",
    description: "An overview of Block Chain and its Currencies , tools, and techniques to build intelligent systems.",
    thumbnail: require("./../assets/images/adaptive-icon.png"),
    completed: false,
  },
  {
    id: "9",
    title: "Is AI boom or Curse ?",
    description: "A discussion on the positive and negative impacts of AI on society, ethics, and future job markets.",
    thumbnail: require("./../assets/images/icon.png"),
    completed: false,
  },
  {
    id: "10",
    title: "Technology uses",
    description: "The impact of technology on modern society, including benefits and potential risks.",
    thumbnail: require("./../assets/images/landing.png"),
    completed: false,
  },
  // Add more topics as needed
];

export default function Educational() {
  const [modalVisible, setModalVisible] = useState(false);
const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [darkMode, setDarkMode] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [selectedCategory, setSelectedCategory] = useState('All');

  const readAloud = (topic) => {
    setSelectedTopic(topic);
    setModalVisible(true);
    Speech.speak(topic.description);
  };
  
  const pauseSpeech = () => {
    Speech.stop();
  };
  

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredTopics(topics);
    } else {
      const filtered = topics.filter((topic) => topic.category === category);
      setFilteredTopics(filtered);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query.toLowerCase()) ||
        topic.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTopics(results);
  };

  const markAsCompleted = (id) => {
    const updated = filteredTopics.map((topic) =>
      topic.id === id ? { ...topic, completed: true } : topic
    );
    setFilteredTopics(updated);
    Alert.alert("Success", "Topic marked as completed ✅");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const animateCard = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>

      <Animated.Text
        style={[styles.header, { transform: [{ scale: scaleAnim }] }, darkMode && styles.darkText]}
      >
        📘 Educational Modules
      </Animated.Text>


 {/* Header Row */}
 <View style={styles.topRow}>
        <Text style={[styles.welcome, darkMode && styles.darkText]}>
          👋 Welcome back, Aspirant!
        </Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text style={styles.moonIcon}>🌙</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.searchInput, darkMode && styles.darkInput]}
        placeholder="Search topics..."
        placeholderTextColor={darkMode ? "#ccc" : "#888"}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredTopics}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => animateCard()}
            activeOpacity={0.7}
          >
            <Image source={item.thumbnail} style={styles.thumbnail} />
            <Text style={[styles.topicTitle, darkMode && styles.darkText]}>
              {item.title}
            </Text>
            <Text style={[styles.description, darkMode && styles.darkText]}>
              {item.description}
            </Text>

            <TouchableOpacity
              style={styles.readAloudButton}
              onPress={() => readAloud(item)}
            >
              <Text style={styles.readAloudText}>🔊 Read Aloud</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.completeButton,
                item.completed && styles.disabledBtn,
              ]}
              disabled={item.completed}
              onPress={() => markAsCompleted(item.id)}
            >
              <Text style={styles.completeText}>
                {item.completed ? "✔ Completed" : "✅ Mark as Completed"}
              </Text>
            </TouchableOpacity>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  item.completed && styles.completed,
                ]}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
    Speech.stop();
  }}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>{selectedTopic?.title}</Text>
      <Text style={styles.modalDescription}>{selectedTopic?.description}</Text>

      <View style={styles.modalButtons}>
        <Button title="⏸ Pause" onPress={pauseSpeech} color="#FF3B30" />
        <Button
          title="❌ Close"
          onPress={() => {
            Speech.stop();
            setModalVisible(false);
          }}
          color="#007AFF"
        />
      </View>
    </View>
  </View>
</Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  moonIcon: {
    fontSize: 26,
    paddingRight: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    color: "#000",
  },
  darkInput: {
    backgroundColor: "#444",
    borderColor: "#666",
    color: "#fff",
  },
  darkText: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    margin: 8,
    flex: 1,
    maxWidth: "48%",
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 3,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: 6,
    width: "0%",
    backgroundColor: "#ff9900",
  },
  completed: {
    width: "100%",
    backgroundColor: "#4CAF50",
  },
  readAloudButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  readAloudText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  completeButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  completeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  disabledBtn: {
    backgroundColor: "#ccc",
  },
  thumbnail: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  
});

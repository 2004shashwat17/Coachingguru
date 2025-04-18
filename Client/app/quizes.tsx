import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

const quizData: Question[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    id: '2',
    question: 'Who developed React?',
    options: ['Google', 'Facebook', 'Twitter', 'Microsoft'],
    correctAnswer: 'Facebook',
  },
  {
    id: '3',
    question: 'Which language is used by React Native?',
    options: ['Java', 'Swift', 'Dart', 'JavaScript'],
    correctAnswer: 'JavaScript',
  },
];

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const shuffled = shuffleArray(quizData);
    setQuestions(shuffled);
  }, []);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);

    if (option === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  if (questions.length === 0) return <Text>Loading quiz...</Text>;

  if (showScore) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎉 Quiz Completed!</Text>
        <Text style={styles.score}>Your Score: {score}/{questions.length}</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <View style={styles.container}>
        {/* Top Bar */}
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.energyButton}>
        <Text style={styles.energyText}>🔋 5</Text>
      </TouchableOpacity>
      <Text style={styles.taskScore}>Daily Score: {score}</Text>
    </View>

    {/* Quizzes Grid */}
    <View style={styles.gridContainer}>
      {[...Array(5)].map((_, idx) => (
        <View
          key={idx}
          style={[
            styles.gridItem,
            idx < currentIndex && { backgroundColor: '#bbf7d0' },
          ]}
        >
          <Text style={styles.gridText}>Quiz {idx + 1}</Text>
        </View>
      ))}
    </View>
      <Text style={styles.question}>
        {currentIndex + 1}. {currentQuestion.question}
      </Text>

      <FlatList
        data={currentQuestion.options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === item && {
                backgroundColor:
                  item === currentQuestion.correctAnswer ? '#6ee7b7' : '#fca5a5',
              },
            ]}
            onPress={() => handleOptionPress(item)}
            disabled={!!selectedOption}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default QuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce8',
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#e0f2fe',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4ade80',
    textAlign: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 22,
    color: '#374151',
    textAlign: 'center',
  },
  topBar: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  
  energyButton: {
    backgroundColor: '#fef9c3',
    padding: 10,
    borderRadius: 12,
  },
  
  energyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  taskScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
  },
  
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  gridItem: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  gridText: {
    fontSize: 12,
    color: '#0f172a',
  },  
});

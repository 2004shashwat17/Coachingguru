import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const KnowMore: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://yourdomain.com/banner-image.png' }} // Replace with a real image
        style={styles.banner}
      />

      <View style={styles.card}>
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.paragraph}>
          At <Text style={styles.highlight}>Your Company</Text>, we are dedicated to delivering cutting-edge solutions that improve lives. Our mission is built around innovation, impact, and integrity.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Our Mission</Text>
        <Text style={styles.paragraph}>
          To empower communities through accessible technology and sustainable growth. We champion inclusive, forward-thinking tech for a better tomorrow.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>What We Offer</Text>
        {[
          'Custom Software Development',
          'Mobile & Web Apps',
          'AI & Machine Learning Solutions',
          'Cloud Infrastructure',
          'IoT Integration',
        ].map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Contact Us</Text>
        <View style={styles.contactBox}>
          <Text style={styles.contactItem}>📍 123 Main Street, Tech City</Text>
          <Text style={styles.contactItem}>📞 +123 456 7890</Text>
          <Text style={styles.contactItem}>📧 info@yourcompany.com</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  banner: {
    width: '100%',
    height: 0,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  highlight: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 10,
  },
  contactBox: {
    marginTop: 10,
  },
  contactItem: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
  },
});

export default KnowMore;

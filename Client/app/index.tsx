import { Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Colors from "./../constant/Colors"; 
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../assets/images/landing.png')}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to Coaching Guru</Text>

        <Text style={styles.subheading}>
          Learn your ideas / innovate & educational content effortlessly with ReadAloud
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/educational')}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Get Started 🚀</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/quizes')}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Quizes & Gudies...💫</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/knowmore')}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Know More 📚</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 50
  },
  content: {
    padding: 25,
    backgroundColor: Colors.PRIMARY,
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.WHITE
  },
  subheading: {
    fontSize: 20,
    color: Colors.WHITE,
    marginTop: 20,
    textAlign: 'center'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 35,
    borderRadius: 10
  },
  signInButton: {
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.WHITE
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18
  }
});

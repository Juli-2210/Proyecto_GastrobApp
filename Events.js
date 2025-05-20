import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const images = [
  "https://www.esneca.com/wp-content/uploads/eventos-sociales.jpg",
  "https://image-tc.galaxy.tf/wijpeg-8xljmd29rhlqrtkuzvzo1wtkk/file.jpg",
  "https://www.valentinaeventos.com/wp-content/uploads/Meseros-en-Toluca-Metepec-Lerma-Calimaya-1024x768.jpeg",
  "https://www.diageobaracademy.com/_next/image?url=https%3A%2F%2Fmedia.diageocms.com%2Fmedia%2F0efcyvha%2Ftraining_online-training-and-e-learning_careers-leadership-skills-and-wellbeing_conflict-management_split-3.jpg&w=1920&q=75",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRypOn5mhrfsH5G0Rg5BsxfFYk--KcKG2iI9icTkjSyKV0gum923ZNEZ5IeHwNdSIG3auw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuhQxzxNFKd6UR9M2OtBxQH4a4xTNahYi_g&s"

];

export default function EventsScreen({ navigation }) {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      scrollRef.current?.scrollTo({ x: nextIndex * (screenWidth * 0.8), animated: true });
      setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/free-photo/black-wooden-floor_53876-89522.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>

        {/* 🔙 Botón Home */}
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>

        {/* 📸 Cajón de galería */}
        <View style={styles.galleryBox}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.scrollGallery}
          >
            {images.map((img, i) => (
              <Image
                key={i}
                source={{ uri: img }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </View>

        
        <View style={styles.infoBox}>
          <Text style={styles.title}>GastrobApp - Eventos</Text>
          <Text style={styles.description}>
            En GastrobApp tenemos al mejor personal de servicio dispuesto a ayudarte en cualquier tipo de eventos.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  homeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#00FA9A',
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  galleryBox: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 5,
    width: screenWidth * 0.9,
    height: 400,
    justifyContent: 'center',
    marginBottom: 30,
  },
  scrollGallery: {
    borderRadius: 10,
  },
  galleryImage: {
    width: screenWidth * 0.8,
    height: 360,
    borderRadius: 12,
    marginHorizontal: screenWidth * 0.05,
    resizeMode: 'cover',
  },
  infoBox: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

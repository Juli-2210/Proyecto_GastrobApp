import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          setMeals(data.meals);
        }
      })
      .catch(err => console.error('Error fetching meals:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredMeals = meals.filter(meal =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FA9A" />
        <Text>Cargando menú...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-photo/black-wooden-floor_53876-89522.jpg?semt=ais_hybrid&w=740',
      }}
      resizeMode="repeat"
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Botón de inicio */}
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.title}>Nuestro Menú</Text>

          {/* 🔍 Barra de búsqueda */}
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar platillo..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <View style={styles.listWrapper}>
            {filteredMeals.length > 0 ? (
              filteredMeals.map((meal) => (
                <View key={meal.idMeal} style={styles.card}>
                  <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
                  <Text style={styles.mealName}>{meal.strMeal}</Text>
                  <Text style={styles.instructions} numberOfLines={4}>
                    {meal.strInstructions}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noResults}>No se encontraron resultados.</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e53935',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchBar: {
    width: '85%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  listWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'flex-start',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color: '#333',
    width: '100%',
  },
  instructions: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    width: '100%',
  },
  noResults: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
    fontStyle: 'italic',
  },
  homeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#e53935',
    borderRadius: 30,
    padding: 10,
    zIndex: 10,
    elevation: 5,
  },
});

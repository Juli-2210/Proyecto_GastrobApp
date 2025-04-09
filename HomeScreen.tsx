import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const API_SEARCH_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export default function HomeScreen() {
  const router = useRouter();
  type FoodItem = {
    id: string;
    name: string;
    description: string;  
    image: string;
  };
  
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>([]);

  // Obtener platillos de la API
  useEffect(() => {
    fetch(API_SEARCH_URL)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          const formattedMeals = data.meals.map((meal: { idMeal: string; strMeal: string; strInstructions: string; strMealThumb: string }) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            description: meal.strInstructions.substring(0, 100) + "...",
            image: meal.strMealThumb,
          }));
          setFoodItems(formattedMeals);
          setFilteredFoodItems(formattedMeals);
        }
      })
      .catch(error => console.error("Error al cargar los datos:", error))
      .finally(() => setLoading(false));
  }, []);

  // Filtrar productos según la búsqueda
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFoodItems(foodItems);
    } else {
      const filtered = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFoodItems(filtered);
    }
  }, [searchQuery, foodItems]);

  return (
    <ImageBackground
      source={{ uri: "https://static.vecteezy.com/system/resources/previews/007/591/385/non_2x/hand-drawn-fast-food-decorative-background-vector.jpg" }}
      style={styles.backgroundImage}
      resizeMode="repeat"
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* Contenedor con logo y nombre */}
        <View style={styles.header}>
          <Image 
            source={{ uri: "https://static4.depositphotos.com/1007168/269/i/450/depositphotos_2699508-stock-illustration-cartoon-hamburger-drink-and-french.jpg" }} 
            style={styles.logo} 
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>GastrobApp</Text>
          </View>
        </View>

        {/* Barra de búsqueda */}
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar platillo..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {loading ? <ActivityIndicator size="large" color="#ff6347" style={styles.loader} /> : null}

        <View style={styles.foodList}>
          {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map((item) => (
              <View key={item.id} style={styles.foodCard}>
                <Image source={{ uri: item.image }} style={styles.foodImage} />
                <View style={styles.foodDetails}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodDescription}>{item.description}</Text>
                  <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => router.push(`/product/ingredientes?id=${item.id}`)}
                  >
                    <Text style={styles.addButtonText}>Ingredientes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            !loading && <Text style={styles.noDataText}>No se encontraron productos.</Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 },
  container: { padding: 10, alignItems: "center" },

  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 80, 
    height: 80,
    resizeMode: "contain",
    marginBottom: 5,
  },

  titleContainer: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  title: { fontSize: 24, fontWeight: "bold", color: "#ff6347" },

  searchBar: {
    width: "90%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },

  loader: { marginVertical: 20 },
  foodList: { flexDirection: "column", alignItems: "center" },
  foodCard: { width: "85%", backgroundColor: "white", borderRadius: 8, marginBottom: 10, padding: 12 },

  foodImage: { width: "90%", height: 140, borderRadius: 10, marginBottom: 8 },
  foodDetails: { alignItems: "center" },
  foodName: { fontSize: 16, fontWeight: "bold", marginBottom: 3 },
  foodDescription: { fontSize: 12, color: "#555", marginBottom: 8, textAlign: "center" },

  addButton: { backgroundColor: "#00FA9A", padding: 8, borderRadius: 5, alignItems: "center", width: "75%" },
  addButtonText: { color: "white", fontWeight: "bold", fontSize: 14 },
  noDataText: { fontSize: 16, color: "#555", textAlign: "center", marginTop: 20 },
});

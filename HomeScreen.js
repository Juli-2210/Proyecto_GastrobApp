import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'; // Asegúrate de importar la función signOut de Firebase

export default function HomeScreen({ navigation }) {
  // Función para manejar el cierre de sesión
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Redirigir al login después de cerrar sesión
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error.message);
      });
  };

  const handleRefresh = () => {ñ
    navigation.replace('Home');
  };

  return (
    <ImageBackground
      source={{ uri: "https://img.freepik.com/free-photo/black-wooden-floor_53876-89522.jpg?semt=ais_hybrid&w=740" }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.innerContainer}>
        {/* GastrobApp Button - Navegar al HomeScreen y refrescar */}
        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <Text style={styles.buttonText}>GASTROBAPP</Text>
        </TouchableOpacity>

        {/* Home Menu Options */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Home</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MenuScreen')}>
            <Text style={styles.menuItemText}>Nuestro menú</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Events')}>
            <Text style={styles.menuItemText}>Eventos y alquiler de personal</Text>
          </TouchableOpacity>

        </View>

        {/* Cerrar Sesión */}
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleSignOut} // Cierra la sesión y redirige al Login
        >
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente para resaltar contenido
    padding: 20,
    borderRadius: 15,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e53935', // Color rojo para el botón de cerrar sesión
    marginTop: 20,
  },
  menuContainer: {
    width: '100%',
    marginTop: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  menuItem: {
    backgroundColor: '#1976d2',
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

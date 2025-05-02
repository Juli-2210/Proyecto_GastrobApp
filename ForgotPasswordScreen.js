import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  ImageBackground 
} from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Validación de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('El correo electrónico es obligatorio');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Introduce un correo electrónico válido');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleResetPassword = () => {
    if (!validateEmail(email)) return;
    
    setIsLoading(true);
    const auth = getAuth();
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        Alert.alert(
          'Correo enviado', 
          'Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ImageBackground 
      source={{ uri: "https://media.istockphoto.com/id/959262284/vector/cartoon-cute-hand-drawn-fast-food-seamless-pattern.jpg?s=612x612&w=0&k=20&c=vFFQaAumzV5TeDUlP_NsGzHh5UqeXxyFNTqVVghdwQ0=" }} 
      style={styles.container} 
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
      
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) validateEmail(text);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        
        <TouchableOpacity 
          style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Recuperar Contraseña</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Volver a Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo más suave y semi-transparente
    borderRadius: 10,
    width: '80%',  // Hacer el formulario más pequeño
    alignSelf: 'center', // Centrarlo en la pantalla
    maxWidth: 350,
    maxHeight: 600 // Añadir un límite de ancho máximo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1976d2',
  },
  input: {
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    marginBottom: 8,
    fontSize: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#1976d2',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});

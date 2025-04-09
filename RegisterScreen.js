import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateName = (name) => {
    if (!name.trim()) {
      setNameError('El nombre es obligatorio');
      return false;
    }
    setNameError('');
    return true;
  };

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

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      return false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError('Por favor confirma tu contraseña');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleRegister = () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
    
    setIsLoading(true);
    const auth = getAuth();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: name
        }).then(() => {
          Alert.alert(
            'Has sido registrado de manera exitosa', 
            'Genial, tu cuenta ya ha sido creada!',
            [{ text: 'OK', onPress: () => navigation.replace('Home') }]
          );
        });
      })
      .catch((error) => {
        let errorMessage;
        switch(error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Este correo electrónico ya está en uso';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El formato del correo electrónico no es válido';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña no cumple con los parametros ';
            break;
          default:
            errorMessage = error.message;
        }
        Alert.alert('Error', errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ImageBackground 
      source={{ uri: "https://img.freepik.com/free-vector/fast-food-pattern_1108-194.jpg?w=360" }} 
      style={styles.container} 
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>REGISTRATE!</Text>
            
            <TextInput
              style={[styles.input, nameError ? styles.inputError : null]}
              placeholder="Nombres y apellidos"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (nameError) validateName(text);
              }}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Correo electronico"
              value={email}
              onChangeText={(text) => {
                setEmail(text.trim());
                if (emailError) validateEmail(text);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            
            <TextInput
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="Contraseña"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) validatePassword(text);
                if (confirmPassword && confirmPasswordError) {
                  validateConfirmPassword(confirmPassword);
                }
              }}
              secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            
            <TextInput
              style={[styles.input, confirmPasswordError ? styles.inputError : null]}
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (confirmPasswordError) validateConfirmPassword(text);
              }}
              secureTextEntry
            />
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
            
            <TouchableOpacity 
              style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Registrarse</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.77)', // Fondo más suave y semi-transparente
    borderRadius: 10,
    width: '80%',  // Hacer el formulario más pequeño
    alignSelf: 'center', // Centrarlo en la pantalla
    maxWidth: 350,
    maxHeight: 600 // Añadir un límite de ancho máximo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ef4444',
    marginBottom: 4,
  },
  errorText: {
    color: '#ef4444',
    marginBottom: 10,
    fontSize: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#64748b',
  },
  loginLink: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '600',
  },
});

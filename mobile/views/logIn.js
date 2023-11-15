import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Provider as PaperProvider,
  DefaultTheme,
  TextInput,
} from 'react-native-paper';
import { Formik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView } from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null); 

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'red',
      background: 'transparent',
    },
  };

  const validate = async (values) => {
    const errors = {};
  
    if (!values.correo) {
      errors.correo = 'Campo obligatorio';
    } else {
      const usersResponse = await axios.get('http://localhost:5000/users');
      const existingUser = usersResponse.data.find(
        (user) => user.correo === values.correo
      );
  
      if (!existingUser) {
        errors.correo = 'El correo no existe en el sistema';
      } else if (existingUser.estado === 0) {
        errors.correo = 'El usuario está desactivado. Contacte al administrador.';
      } else if (!values.contra) {
        errors.contra = 'Campo obligatorio';
      }
    }
  
    return errors;
  };

  const handleLogin = async (values) => {
    try {
      if (!values.correo || !values.contra) {
        Alert.alert('Error', 'Por favor, complete todos los campos.');
        return;
      }

      setLoading(true);

      const response = await axios.post('http://localhost:5000/login', values, {
        headers: {
          'Content-Type': 'application/json',
          Platform: Platform.OS,
        },
      });

      const token = response.data.token;

      await AsyncStorage.setItem('token', token);

      console.log('Token guardado en AsyncStorage:', token);

      navigation.navigate('Home');

      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);

      if (error.response && error.response.status === 401) {
        setLoginError('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
      } else {
        setLoginError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.allContainer}
      >
        <Image
          source={require('../assets/img/bwh.webp')}
          style={styles.backgroundImage}
        />
        <View style={styles.formContainer}>
          <Image
            source={require('../assets/img/GIcon.png')}
            style={styles.image}
            resizeMode="contain"
          />

          <Formik
            initialValues={{ correo: '', contra: '' }}
            onSubmit={handleLogin}
            validate={validate}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{ width: '100%' }}>
                <TextInput
                  label="Correo Electrónico"
                  mode="outlined"
                  theme={{ colors: { text: 'black', primary: 'black' } }}
                  onChangeText={handleChange('correo')}
                  onBlur={handleBlur('correo')}
                  value={values.correo}
                  style={styles.input}
                  underlineColor="black"
                />
                 {touched.correo && errors.correo && (
                <Text style={{ color: 'red' }}>{errors.correo}</Text>
              )}
                <TextInput
                  label="Contraseña"
                  mode="outlined"
                  onChangeText={handleChange('contra')}
                  onBlur={handleBlur('contra')}
                  theme={{ colors: { text: 'white', primary: 'black' } }}
                  value={values.contra}
                  style={styles.input}
                  secureTextEntry
                />
                {touched.contra && (errors.contra || loginError) && (
                <Text style={{ color: 'red' }}>{errors.contra || loginError}</Text>
              )}

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: 'red',
                    width: '50%',
                    alignSelf:'center',
                    marginTop: 18,
                  }}
                  loading={loading}
                  disabled={loading}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    Entrar
                  </Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  allContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    alignItems: 'center',
    width: '80%',
    padding: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 35,
    borderWidth: 3,
  },
  image: {
    aspectRatio: 1,
    height: 100,
    marginBottom: 20,
    borderWidth: 6,
    borderColor: 'red',
    borderRadius: 70,
  },
  input: {
    width: '100%',
    marginBottom: 1,
    marginTop:15,
    backgroundColor: 'white',
  },
});

export default LoginScreen;

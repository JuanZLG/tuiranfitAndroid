import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';  
import { useNavigation } from '@react-navigation/native';
import { Button, Provider as PaperProvider, DefaultTheme, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'red',
      background: 'transparent',
    },
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/login', values, {
        headers: {
          'Content-Type': 'application/json',
          'Platform': Platform.OS,  
        },
      });

      const token = response.data.token;

      await AsyncStorage.setItem('token', token);

      console.log('Token guardado en AsyncStorage:', token);

      navigation.navigate('Home');

      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
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
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={{ width: '100%' }}>
                <TextInput
                  label="Correo Electrónico"
                  mode="outlined"
                  theme={{ colors: { text: 'black', primary: 'red' } }}
                  onChangeText={handleChange('correo')}
                  onBlur={handleBlur('correo')}
                  value={values.correo}
                  style={styles.input}
                  underlineColor="black"
                />
                <TextInput
                  label="Contraseña"
                  mode="outlined"
                  onChangeText={handleChange('contra')}
                  onBlur={handleBlur('contra')}
                  theme={{ colors: { text: 'white', primary: 'red' } }}
                  value={values.contra}
                  style={styles.input}
                  secureTextEntry
                />

                <Button mode="contained" onPress={handleSubmit} style={{ backgroundColor: 'red', width: '50%', alignSelf: 'center', marginTop: 8 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Entrar</Text>
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
    borderRadius: 70
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'white',
  },
});

export default LoginScreen;

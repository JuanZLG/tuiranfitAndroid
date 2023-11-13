import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import { TextInput, Button, MD2DarkTheme, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Formik } from 'formik';
// import MainNavigation from './views/mainNavigation';
import LoginScreen from './views/logIn';
import Inicio from './views/home.jsx';


export default function App() {
  // const theme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: 'red',
  //     background: 'transparent', 
  //     // Puedes agregar más propiedades según tus necesidades
  //   },
  // };
  
  return (
    <LoginScreen/>
  );
}

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
    borderRadius:10,
    paddingVertical:35,
    borderWidth:3,
  },
  image: {
    aspectRatio: 1,
    height: 100,
    marginBottom: 20,
    borderWidth:6,
    borderColor:'red',
    borderRadius:70
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor:'white',
  },
  button: {
    marginTop: 20,
  },
});

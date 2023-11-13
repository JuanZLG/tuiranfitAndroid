// MainNavigation.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { IconButton } from 'react-native-paper';

// import HomeScreen from './home';
// import LoginScreen from './logIn';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={({ navigation }) => ({
//         title: 'Tuiranfit',
//         headerStyle: {
//           backgroundColor: 'red', // Personaliza el color de la barra superior
//         },
//         headerTitleStyle: {
//           color: 'white', // Personaliza el color del texto en la barra superior
//         },
//         headerLeft: () => (
//           <IconButton
//             icon="menu"
//             color="white"
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       })}
//     />
//   </Stack.Navigator>
// );

// const MainNavigation = () => (
//   <NavigationContainer>
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={HomeStack} />
//       {/* Agrega más pantallas de cajón según sea necesario */}
//     </Drawer.Navigator>
//   </NavigationContainer>
// );

// export default MainNavigation;

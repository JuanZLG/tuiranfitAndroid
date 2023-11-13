
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Drawer } from 'react-native-paper';

export default function Inicio () {
  // const navigation = useNavigation();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegación */}
      <Appbar.Header>
        <Appbar.Action icon="menu" />
        <Appbar.Content title="Tuiranfit" />
      </Appbar.Header>

      {/* Contenido de la pantalla */}
      <View style={styles.content}>
        <Text>Bienvenido a Tuiranfit</Text>
      </View>

      {/* Drawer lateral */}
      <Drawer visible={isDrawerOpen} onDismiss={toggleDrawer}>
      <Drawer.Item label="Inicio" />
      </Drawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

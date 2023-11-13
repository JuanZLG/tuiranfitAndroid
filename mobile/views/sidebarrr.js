import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Sidebar = () => {
  const MenuItem = ({ text, onPress }) => (
    <TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
      <Text style={styles.menuItemText}>{text}</Text>
      <Icon name="angle-right" size={20} color="gray" style={styles.icon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.sidebar}>
      <MenuItem text="Opción 1" onPress={() => console.log('Opción 1 presionada')} />
      <MenuItem text="Opción 2" onPress={() => console.log('Opción 2 presionada')} />
      <MenuItem text="Opción 3" onPress={() => console.log('Opción 3 presionada')} />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: 'black',
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 150,
    zIndex: 2,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 20, 
  },
  menuItemText: {
    color: 'white',
    fontSize: 16, 
  },
  icon: {
    marginLeft: 3,
  },
});

export default Sidebar;

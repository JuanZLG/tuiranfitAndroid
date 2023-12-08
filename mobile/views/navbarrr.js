import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Navbar = () => {
  return (
    <View style={[styles.navbar, styles.navbarWithMargin]}>
      <View style={styles.leftContainer}>
        <Image
          source={require('../assets/img/GIcon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.navbarText}>TuiranFit</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'black',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navbarWithMargin: {
    marginBottom: -5, 
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  navbarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Navbar;

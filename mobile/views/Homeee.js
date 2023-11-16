import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import Navbar from './navbarrr';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchProductos = () => {
    fetch('http://localhost:5000/productos')
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos de productos:', data);
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleLogout = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Login');
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      fetchProductos();
    } else {
      const filteredProducts = productos.filter((product) =>
        product.nombre_producto.toLowerCase().includes(text.toLowerCase())
      );
      setProductos(filteredProducts);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const bufferToBase64 = (buffer) => {
    const binary = Array.from(new Uint8Array(buffer)).map((byte) => String.fromCharCode(byte)).join('');
    const base64Image = 'data:image/png;base64,' + btoa(binary);
    console.log('URL de la imagen:', base64Image);
    return base64Image;
  };
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Navbar />
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <Icon name="search" size={16} color="gray" style={styles.searchIcon} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
          <Icon name="sign-out" size={18} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
      <FlatList
  data={productos}
  keyExtractor={(item) => item.id_producto.toString()}
  renderItem={({ item }) => {
    console.log('URL de la imagen:', bufferToBase64(item.iProductImg.data));
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          {item.iProductImg ? (
            <Image
              source={{ uri: bufferToBase64(item.iProductImg.data) }}
              style={styles.image}
            />
          ) : (
            <Text>Imagen no disponible</Text>
          )}
          <Text style={styles.productName}>{item.nombre_producto}</Text>
          <Text style={styles.price}>Precio: {formatCurrency(item.precio)}</Text>
          <Text style={styles.stock}>Cantidad: {item.cantidad}</Text>
          <Text style={styles.expiryDate}>
            Vencimiento: {new Date(item.fechaven).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }}
/>

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Deseas cerrar sesión?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.button, styles.buttonConfirm]} onPress={handleLogout}>
                <Text style={styles.textStyle}>Aceptar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    width: 150,
    height: 30,
  },
  searchIconContainer: {
    marginRight: 5,
  },
  searchIcon: {
    marginLeft: 'auto',
  },
  searchInput: {
    flex: 1,
    height: 30,
    marginLeft: 5,
    fontSize: 14,
    borderWidth: 0,
    padding: 0,
    outlineWidth: 0,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    marginLeft: 'auto',
  },
  contentContainer: {
    flex: 1,
    margin: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
  },
  productName: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  expiryDate: {
    fontSize: 14,
    marginBottom: 8,
    color: 'red',
  },
  stock: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonConfirm: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default HomeScreen;

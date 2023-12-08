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

  function decodeBuffer(buffer) {
    return new TextDecoder('utf-8').decode(new Uint8Array(buffer));
  }

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
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}

            
            >

              <View style={styles.cardContent}>
                {item.iProductImg ? (
                  <Image
                    source={{ uri: `http://127.0.0.1:8000/media/${decodeBuffer(item.iProductImg.data)}` }}
                    style={styles.image}
                  />
                ) : (
                  <Text>Imagen no Disponible</Text>
                )}
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.nombre_producto}</Text>
                  <View style={{height:8}}></View>
                  <Text style={styles.stock}>Categoría: {item.id_categoria}</Text>
                  <Text style={styles.stock}>Marca: {item.id_marca}</Text>
                  <Text style={styles.stock}>Sabores: {item.sabor}</Text>
                  <Text style={styles.stock}>Presentaciones: {item.presentacion}<Text> lb(s)</Text></Text>
                  <View style={{height:15}}></View>
                  <View style={{alignSelf:'right', marginRight:8, marginLeft:60}}><Text style={styles.price}>{formatCurrency(item.precio_pub)}</Text></View>
                </View>
              </View>
              
            </TouchableOpacity>
          )}
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
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
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
  cardContent: {
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
    
  },
  productDetails: {
    flex: 1,
    marginLeft: 8,
  },
  productName: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    color:'red'
  },
  price: {
    fontSize: 21,
    textAlign:'center',
    fontWeight:'bold',
  },
  expiryDate: {
    fontSize: 14,
    marginBottom: 8,
    color: 'red',
    alignSelf: 'flex-end',
  },
  stock: {
    fontSize: 14,
    
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

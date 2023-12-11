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
  ActivityIndicator
} from 'react-native';
import Navbar from './navbarrr';
import Icon from 'react-native-vector-icons/FontAwesome';
import unorm from 'unorm';

const HomeScreen = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      const productosResponse = await fetch('http://localhost:5000/productos');
      const productosData = await productosResponse.json();

      for (const product of productosData) {
  
        const categoriaResponse = await fetch(`http://localhost:5000/categorias?id=${product.id_categoria}`);
        const categoriaData = await categoriaResponse.json();
        const categoriaProducto = categoriaData.find(categoria => categoria.id_categoria === product.id_categoria);
        

        const marcaResponse = await fetch(`http://localhost:5000/marcas?id=${product.id_marca}`);
        const marcaData = await marcaResponse.json();
        const marcaProducto = marcaData.find(marca => marca.id_marca === product.id_marca);
        
        product.categoria = categoriaProducto;
        product.marca = marcaProducto;
      }

      setProductos(productosData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener la información:', error);
      setIsLoading(false);
    }
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
    setMostrarResultados(true);
    if (text === '') {
      fetchProductos();
    } else {
      const normalizedText = unorm.nfc(text.toLowerCase());
  
      const filteredProducts = productos.filter((product) => {
        const nombreProducto = unorm.nfc(product.nombre_producto.toLowerCase());
        const marcaProducto = unorm.nfc(product.marca?.nombre_marca.toLowerCase()) || '';
        const categoriaProducto = unorm.nfc(product.categoria?.nombre_categoria.toLowerCase()) || '';
  
        return (
          nombreProducto.includes(normalizedText) ||
          marcaProducto.includes(normalizedText) ||
          categoriaProducto.includes(normalizedText)
        );
      });
  
      if (filteredProducts.length === 0) {
   
        setProductos([]);
        setMostrarResultados(false);
      } else {
  
        setProductos(filteredProducts);
        setMostrarResultados(true);
      }
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
        
      {isLoading ? ( // Verifica si se están cargando los datos
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 180 }} />
        ) : mostrarResultados ? (
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
                  <View style={{height:7}}></View>
                  <Text><Text style={styles.stock}>Categoría: </Text><Text>{item.categoria?.nombre_categoria}</Text></Text>
                  <Text><Text style={styles.stock}>Marca: </Text><Text>{item.marca?.nombre_marca}</Text></Text>
                  <Text><Text style={styles.stock}>Sabores: </Text><Text>{item.sabor}</Text></Text>
                  <Text><Text style={styles.stock}>Presentación: </Text><Text style={{color:'red', fontWeight:'bold'}}>{item.presentacion}</Text><Text style={{color:'red', fontWeight:'bold'}}> lb(s)</Text></Text>
                  <View style={{height:10}}></View>
                  <View style={{alignSelf:'right', marginRight:8, marginLeft:60}}><Text style={styles.price}>{formatCurrency(item.precio_pub)}</Text></View>
                </View>
              </View>
              
            </TouchableOpacity>
          )}
        />
      ):(
        <View style={{ justifyContent: 'center', alignItems: 'center', height:'auto', marginTop:180}}>
  <Image source={require('../assets/img/sadgorille.png')} style={{ width: 200, height: 200 }} />
  <Text style={{ textAlign: 'center', fontSize:20}}>No se encontraron resultados</Text>
</View>

      )}
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
    marginTop:10,
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
  stock: {
    fontSize: 16,
    fontWeight:'bold'
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

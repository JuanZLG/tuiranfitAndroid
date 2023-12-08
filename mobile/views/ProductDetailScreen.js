import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper/src';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [marca, setMarca] = useState([]);
  const [categoria, setCategoria] = useState([]);

  const decodeBuffer = (buffer) => {
    return new TextDecoder('utf-8').decode(new Uint8Array(buffer));
  };

useEffect(() => {
    const fetchData = async () => {
      try {
        const marcaResponse = await fetch(`http://127.0.0.1:5000/marcas?id=${product.id_marca}`);
        const marcaData = await marcaResponse.json();
        setMarca(Array.isArray(marcaData) ? marcaData : [marcaData]);
  
        const categoriaResponse = await fetch(`http://127.0.0.1:5000/categorias?id=${product.id_categoria}`);
        const categoriaData = await categoriaResponse.json();
        setCategoria(Array.isArray(categoriaData) ? categoriaData : [categoriaData]);
  
        
      } catch (error) {
        console.error('Error al obtener la información:', error);
      }
    };
  
    fetchData();
  }, [product.id_marca, product.id_categoria]);
  
  
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          loop={false}
          showsPagination={true}
          nextButton={<Text style={styles.swiperButtonText}>›</Text>}
          prevButton={<Text style={styles.swiperButtonText}>‹</Text>}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          paginationStyle={styles.paginationStyle}
        >
          {product.iProductImg && (
            <Image
              source={{ uri: `http://127.0.0.1:8000/media/${decodeBuffer(product.iProductImg.data)}` }}
              style={styles.image}
            />
          )}
          {product.iInfoImg && (
            <Image
              source={{ uri: `http://127.0.0.1:8000/media/${decodeBuffer(product.iInfoImg.data)}` }}
              style={styles.image}
            />
          )}
        </Swiper>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.nombre_producto}</Text>
        <Text style={styles.detailsText}>
          Categoría: {categoria.map(cat => cat.nombre_categoria).join(', ')}
        </Text>
        <Text style={styles.detailsText}>
          Marca: {marca.map(mar => mar.nombre_marca).join(', ')}
        </Text>
        <Text style={styles.detailsText}>Sabor: {product.sabor}</Text>
        <Text style={styles.detailsText}>Presentación: {product.presentacion} lb(s)</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>{product.descripcion}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            Precio: {product.precio_pub.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  swiperContainer: {
    height: 300,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  swiperButtonText: {
    color: 'black',
    fontSize: 40,
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDotStyle: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  paginationStyle: {
    bottom: -23,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 18,
    marginBottom: 8,
  },
  descriptionContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20, 
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;

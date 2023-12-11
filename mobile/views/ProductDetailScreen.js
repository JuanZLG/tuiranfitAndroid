import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
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
        const marcaProducto = marcaData.find(marca => marca.id_marca === product.id_marca);
        setMarca(marcaProducto ? [marcaProducto] : []);
  
        const categoriaResponse = await fetch(`http://127.0.0.1:5000/categorias?id=${product.id_categoria}`);
        const categoriaData = await categoriaResponse.json();
        setCategoria(Array.isArray(categoriaData) ? categoriaData : [categoriaData]);
  
        
      } catch (error) {
        console.error('Error al obtener la información:', error);
      }
    };
  
    fetchData();
  }, [product.id_marca, product.id_categoria]);
  

    const openWhatsAppChat = () => {
      let phoneNumber='3185905403'
      const url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
      Linking.openURL(url)
        .then((data) => {
          console.log('WhatsApp abierto:', data);
        })
        .catch(() => {
          console.log('Error al abrir WhatsApp');
        });
    };

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
        <View><Text style={styles.productName}>{product.nombre_producto}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            {product.precio_pub.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          </Text>
        </View>
        <View style={styles.textDetails}>
        {/* <Text><Text style={styles.detailsText}>
          Categoría: </Text><Text style={styles.valueText}>{categoria.map(cat => cat.nombre_categoria).join(', ')}</Text>
        </Text>
        <Text><Text style={styles.detailsText}>
        Marca: </Text><Text style={styles.valueText}>{marca.map(mar => mar.nombre_marca).join(', ')}</Text>
        </Text> */}
        <Text><Text style={styles.detailsText}>Sabor(es): </Text><Text style={styles.valueText}>{product.sabor}</Text></Text>
        <Text style={styles.detailsText}>Presentación: {product.presentacion} lb(s)</Text>
        </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>{product.descripcion}</Text>
        </View>
        {/* <TouchableOpacity style={styles.button} onPress={openWhatsAppChat}>
      <Text style={styles.buttonText}>¡Haz tu pedido aquí!</Text>
    </TouchableOpacity> */}
      <View style={{height:80}}></View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>&#169; TuiranFit - 2023</Text>
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
    marginBottom: 15,
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
    padding: 10,
  },
  productName: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center'
  },
  textDetails:{
    padding:20,
    borderColor:'black',
    borderWidth:2,
    borderRadius:8,
    height:'auto',
    marginHorizontal:20
  },
  detailsText: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight:'bold'
  },
  valueText:{
    fontSize: 20,
  },
  descriptionContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 8,
    height:'auto',
    marginHorizontal:20
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 18,
    color:'black',
    padding:10
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10, 
    borderWidth:1,
    borderColor:'red',
    backgroundColor:'red',
    marginHorizontal:'auto',
    borderRadius:10,
    marginBottom:20,
    paddingHorizontal:3
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding:10,
    color:'white'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000000',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height:70
  },
  footerText: {
    color: 'white',
    fontWeight:'bold',
    fontSize: 16,
  },
});
export default ProductDetailScreen;

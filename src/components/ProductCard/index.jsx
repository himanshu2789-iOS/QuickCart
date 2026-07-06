import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { getStringMap, formatCurrencyValue } from '../../i18n';

const ProductCard =({
  product,
  onAdd,
}) => {
  const locale = useSelector(selectLanguage);
  const strings = getStringMap(locale);
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: product.image,
        }}
        style={styles.image}
      />

      <Text
        numberOfLines={2}
        style={styles.title}>
        {product.title}
      </Text>

      <Text style={styles.price}>
        {formatCurrencyValue(product.price, locale)}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onAdd(product)}>
        <Text style={styles.buttonText}>
          {strings.addToCart}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },

  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },

  button: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProductCard;
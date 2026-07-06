import React, {
  useEffect,
  useLayoutEffect,
} from 'react';

import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  fetchProducts,
} from '../redux/slices/productSlice';

import {
  addToCart,
} from '../redux/slices/cartSlice';

import ProductCard from '../components/ProductCard';
import CartBadge from '../components/CartBadge';

export default function HomeScreen({
  navigation,
}) {
  const dispatch = useDispatch();

  const products = useSelector(
    state => state.products.products,
  );

  const loading = useSelector(
    state => state.products.loading,
  );

  const cartItems = useSelector(
    state => state.cart.items,
  );

  const cartCount =
    cartItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0,
    );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'Checkout',
            )
          }>
          <Icon
            name="cart-outline"
            size={30}
          />

          <CartBadge
            count={cartCount}
          />
        </TouchableOpacity>
      ),
    });
  }, [cartCount]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={products}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onAdd={product =>
              dispatch(
                addToCart(product),
              )
            }
          />
        )}
      />
    </View>
  );
}
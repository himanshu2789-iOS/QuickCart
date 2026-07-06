import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItemsArray,
  selectCartTotalPrice,
  incrementItem,
  decrementItem,
  removeItem,
} from '../../redux/slices/cartSlice';
import { selectIsDarkMode } from '../../redux/slices/themeSlice';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import { getStringMap, formatCurrencyValue } from '../../i18n';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItemsArray);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.subtext }]}>{strings.emptyCart}</Text>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{strings.browseProducts}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backArrow, { color: colors.primary }]}>← {strings.back}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{strings.cart}</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <TouchableOpacity
              style={[styles.removeButton, { backgroundColor: colors.inputBackground }]}
              onPress={() => dispatch(removeItem(item.id))}
            >
              <Text style={[styles.removeButtonText, { color: colors.subtext }]}>✕</Text>
            </TouchableOpacity>

            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />

            <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>

            <Text style={[styles.price, { color: colors.accent }]}>{formatCurrencyValue(item.price, locale)}</Text>

            <View style={[styles.counterRow, { backgroundColor: colors.inputBackground }]}>
              <TouchableOpacity
                style={[styles.counterButton, { backgroundColor: colors.primary }]}
                onPress={() => dispatch(decrementItem(item.id))}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>

              <Text style={[styles.counterValue, { color: colors.text }]}>{item.quantity}</Text>

              <TouchableOpacity
                style={[styles.counterButton, { backgroundColor: colors.primary }]}
                onPress={() => dispatch(incrementItem(item))}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.subtotal, { color: colors.subtext }]}>
              {strings.subtotal}: {formatCurrencyValue(item.price * item.quantity, locale)}
            </Text>
          </View>
        )}
      />

      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>{strings.total}</Text>
          <Text style={[styles.totalValue, { color: colors.accent }]}>{formatCurrencyValue(totalPrice, locale)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Checkout', { total: totalPrice })}
        >
          <Text style={styles.checkoutButtonText}>{strings.continueToCheckout}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, marginBottom: 14 },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  backButtonText: { color: '#fff', fontWeight: '600' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
  },
  backArrow: { fontSize: 15, marginRight: 16, fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  listContent: { padding: 8 },
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    margin: 6,
    alignItems: 'center',
    elevation: 2,
  },
  removeButton: {
    alignSelf: 'flex-end',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: { fontSize: 12 },
  image: { width: '100%', height: 100, marginVertical: 6 },
  title: { fontSize: 13, fontWeight: '500', textAlign: 'center', height: 34 },
  price: { fontSize: 14, fontWeight: '700', marginVertical: 4 },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 6,
    paddingHorizontal: 4,
    marginVertical: 6,
  },
  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: { color: '#fff', fontSize: 17, fontWeight: '700', lineHeight: 17 },
  counterValue: { fontSize: 15, fontWeight: '700' },
  subtotal: { fontSize: 11, marginTop: 2 },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: { fontSize: 16, fontWeight: '600' },
  totalValue: { fontSize: 20, fontWeight: '800' },
  checkoutButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default CartScreen;
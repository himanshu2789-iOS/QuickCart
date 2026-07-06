import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import {
  clearCart,
  selectCartItemsArray,
  selectCartTotalPrice,
} from '../../redux/slices/cartSlice';
import { addOrder } from '../../redux/slices/orderHistorySlice';
import { selectIsDarkMode } from '../../redux/slices/themeSlice';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStringMap, formatCurrencyValue } from '../../i18n';
import { showOrderSuccessNotification } from '../../utilities/notification';

const OrderConfirmation = ({ navigation, route }) => {
  const total = route.params?.total ?? 0;

  const dispatch = useDispatch();

  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const cartItems = useSelector(selectCartItemsArray);
  const totalPrice = useSelector(selectCartTotalPrice);

  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);

  // 🔔 Fire local notification as soon as this screen mounts —
  // this IS the moment the order is confirmed successful.
  useEffect(() => {
    if (cartItems.length > 0) {
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        totalPrice,
        status: 'Processing',
        items: cartItems,
      };
      showOrderSuccessNotification(order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinueShopping = () => {
    if (cartItems.length === 0) {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'ProductList' }] }),
      );
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      totalPrice,
      status: 'Processing',
      items: cartItems,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'ProductList' }] }),
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: colors.accent }]}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          {strings.orderSuccessful}
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          {strings.paymentCompleted} {formatCurrencyValue(total, locale)} {strings.paymentCompletedSuffix}
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          {strings.thanks}
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleContinueShopping}>
          <Text style={styles.buttonText}>{strings.continueShopping}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  iconCircle: { width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  checkmark: { fontSize: 46, color: '#fff', fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 4 },
  button: { marginTop: 30, height: 50, width: '100%', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
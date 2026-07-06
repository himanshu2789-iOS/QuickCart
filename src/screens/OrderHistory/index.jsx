import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import { getColors } from '../../theme/colors';
import { selectIsDarkMode } from '../../redux/slices/themeSlice';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { selectOrders } from '../../redux/slices/orderHistorySlice';
import { getStringMap, formatCurrencyValue } from '../../i18n';

const OrderHistoryScreen = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);
  const styles = createStyles(colors);

  // now getting real orders so export 
  // selectors in orderHistory from Redux
  const orders = useSelector(selectOrders);

  const getStatusColor = status => {
    switch (status) {
      case 'Delivered':
        return colors.accent;
      case 'Shipped':
        return colors.primary;
      case 'Processing':
        return '#f59e0b';
      default:
        return colors.text;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.orderId}>{item.id}</Text>

        <Text
          style={[
            styles.status,
            { color: getStatusColor(item.status) },
          ]}>
          {item.status}
        </Text>
      </View>

      <Text style={styles.info}>
        Order Date: {item.date}
      </Text>

      {/* ✅ dynamic item count */}
      <Text style={styles.info}>
        {strings.items}: {item.items.length}
      </Text>

      <Text style={styles.price}>
        {formatCurrencyValue(item.totalPrice, locale)}
      </Text>
    </View>
  );

  // ✅ empty state handling
  if (!orders || orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {strings.noOrders}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrderHistoryScreen;

const createStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    listContainer: {
      padding: 16,
      paddingTop: 10,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 3,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    orderId: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
    },

    status: {
      fontSize: 14,
      fontWeight: '600',
    },

    info: {
      fontSize: 14,
      color: colors.subtext,
      marginTop: 8,
    },

    price: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },

    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },

    emptyText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.subtext,
    },
  });
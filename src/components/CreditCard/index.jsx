import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreditCardPreview = ({ cardNumber, 
  cardHolder, expiry, isDarkMode }) => {
  const displayNumber = cardNumber && 
  cardNumber.length > 0 ? cardNumber : '#### #### #### ####';
  const displayHolder = cardHolder && cardHolder.length > 0 ? 
  cardHolder.toUpperCase() : 'YOUR NAME';
  const displayExpiry = expiry && expiry.length > 0 ? expiry : 'MM/YY';

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? '#1f2a44' : '#2563eb' },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.chip} />
        <Text style={styles.brand}>VISA</Text>
      </View>

      <Text style={styles.cardNumber}>{displayNumber}</Text>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.smallLabel}>CARD HOLDER</Text>
          <Text style={styles.bottomValue} numberOfLines={1}>
            {displayHolder}
          </Text>
        </View>
        <View>
          <Text style={styles.smallLabel}>EXPIRES</Text>
          <Text style={styles.bottomValue}>{displayExpiry}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    width: 40,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  brand: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  bottomValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    maxWidth: 160,
  },
});

export default CreditCardPreview;
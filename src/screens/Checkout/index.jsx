import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectIsDarkMode } from '../../redux/slices/themeSlice';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import CreditCardPreview from '../../components/CreditCard';
import { getStringMap, formatCurrencyValue } from '../../i18n';

const SAVED_CARD_KEY = 'APP_SAVED_CARD_DETAILS';

// Static fallback used the very first time, before anything is saved
const DEFAULT_CARD = {
  cardNumber: '4242 4242 4242 4242',
  cardHolder: 'JOHN DOE',
  expiry: '12/27',
  cvv: '123',
};

// Adds a space every 4 digits: "4242424242424242" -> "4242 4242 4242 4242"
const formatCardNumber = (text) => {
  const digits = text.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

// Formats "1227" -> "12/27" as the user types
const formatExpiry = (text) => {
  const digits = text.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const CheckoutScreen = ({ navigation, route }) => {
  const total = route.params?.total ?? 0;
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Load previously saved card on mount, falling back to the static demo card
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(SAVED_CARD_KEY);
        const card = stored ? JSON.parse(stored) : DEFAULT_CARD;
        setCardNumber(card.cardNumber);
        setCardHolder(card.cardHolder);
        setExpiry(card.expiry);
        setCvv(card.cvv);
      } catch {
        setCardNumber(DEFAULT_CARD.cardNumber);
        setCardHolder(DEFAULT_CARD.cardHolder);
        setExpiry(DEFAULT_CARD.expiry);
        setCvv(DEFAULT_CARD.cvv);
      }
    })();
  }, []);

  const handlePayment = async () => {
    setIsPaying(true);

    // Remember these details so the form is prefilled next time
    try {
      await AsyncStorage.setItem(
        SAVED_CARD_KEY,
        JSON.stringify({ cardNumber, cardHolder, expiry, cvv })
      );
    } catch {
      // non-fatal — proceed with payment simulation regardless
    }

    // Simulate a payment request
    setTimeout(() => {
      setIsPaying(false);
      navigation.replace('OrderSuccess', { total });
    }, 2500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} disabled={isPaying}>
          <Text style={[styles.backArrow, { color: colors.primary }]}>← {strings.back}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{strings.checkout}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <CreditCardPreview
            cardNumber={cardNumber}
            cardHolder={cardHolder}
            expiry={expiry}
            isDarkMode={isDarkMode}
          />

          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.text }]}>{strings.cardNumber}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor={colors.subtext}
              keyboardType="number-pad"
              maxLength={19}
              editable={!isPaying}
            />

            <Text style={[styles.label, { color: colors.text }]}>{strings.cardHolderName}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
              value={cardHolder}
              onChangeText={setCardHolder}
              placeholder="JOHN DOE"
              placeholderTextColor={colors.subtext}
              autoCapitalize="characters"
              editable={!isPaying}
            />

            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={[styles.label, { color: colors.text }]}>{strings.expiry}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                  value={expiry}
                  onChangeText={(text) => setExpiry(formatExpiry(text))}
                  placeholder="MM/YY"
                  placeholderTextColor={colors.subtext}
                  keyboardType="number-pad"
                  maxLength={5}
                  editable={!isPaying}
                />
              </View>

              <View style={[styles.halfField, styles.secondHalfField]}>
                <Text style={[styles.label, { color: colors.text }]}>{strings.cvv}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                  value={cvv}
                  onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  placeholderTextColor={colors.subtext}
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={3}
                  editable={!isPaying}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: colors.text }]}>{strings.amountToPay}</Text>
          <Text style={[styles.totalValue, { color: colors.accent }]}>{formatCurrencyValue(total, locale)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: colors.primary }]}
          onPress={handlePayment}
          disabled={isPaying}
        >
          {isPaying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>{strings.payment}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 3,
  },
  backArrow: { fontSize: 15, marginRight: 16, fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  scrollContent: { padding: 20, paddingBottom: 30 },
  form: { marginTop: 24 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 14 },
  input: {
    height: 46,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  row: { flexDirection: 'row' },
  halfField: { flex: 1 },
  secondHalfField: { marginLeft: 12 },
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
  payButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default CheckoutScreen;
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { checkAuthStatus, selectIsLoggedIn, selectIsAuthChecked } from '../../redux/slices/authSlice';
import { loadThemePreference, selectIsDarkMode } from '../../redux/slices/themeSlice';
import { loadLanguagePreference, selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import { getStringMap } from '../../i18n';

import LoginScreen from '../../screens/Login';
import ProductListScreen from '../../screens/ProductListScreen';
import CartScreen from '../../screens/CartScreen'
import CheckoutScreen from '../../screens/Checkout';
import OrderConfrimation from '../../screens/orderConfirmation'
import SettingsScreen from '../../screens/Settings';
import OrderHistoryScreen from '../../screens/OrderHistory';
import CustomDrawerContent from '../../components/CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Stack nested inside the "Home" drawer item so the Cart, Checkout,
// and Order Success screens can still be pushed on top without
// each needing their own drawer entry.
const HomeStackNavigator = () => (
  <Stack.Navigator initialRouteName="ProductList">
    <Stack.Screen
      name="ProductList"
      component={ProductListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OrderSuccess"
      component={OrderConfrimation}
      options={{ headerShown: false, gestureEnabled: false }}
    />
  </Stack.Navigator>
);

const MainDrawerNavigator = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTintColor: colors.text,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.subtext,
        drawerType: 'slide',
        drawerStyle: { width: 280 },
        overlayColor: 'rgba(0, 0, 0, 0.4)',
        swipeEdgeWidth: 32,
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false, title: strings.menuHome }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: strings.menuSettings }} />
      <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: strings.menuOrderHistory }} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isDarkMode = useSelector(selectIsDarkMode);
  const colors = getColors(isDarkMode);

  useEffect(() => {
    // On app launch: see if a session/theme preference was already stored
    dispatch(checkAuthStatus());
    dispatch(loadThemePreference());
    dispatch(loadLanguagePreference());
  }, [dispatch]);

  if (!isAuthChecked) {
    // Splash / loading state while we check AsyncStorage for an existing session
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.headerBackground} />
      {isLoggedIn ? (
        <MainDrawerNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
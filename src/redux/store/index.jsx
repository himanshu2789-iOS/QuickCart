
import {configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';
import productReducer from '../slices/productSlice';
import themeReducer from '../slices/themeSlice';
import languageReducer from '../slices/languageSlice';
import orderHistoryReducer from '../slices/orderHistorySlice';
import { persistStore, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    theme: themeReducer,
    language: languageReducer,
    orderHistory: orderHistoryReducer,
});

const persistConfig = {
   key: "root",
   storage: AsyncStorage,
    // Persist only these reducers
   whitelist: [
    'orderHistory',
    'theme',
    'language',
  ],
}
const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
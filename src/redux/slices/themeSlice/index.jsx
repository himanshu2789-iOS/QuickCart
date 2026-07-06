// import {createSlice} from '@reduxjs/toolkit';

// const themeSlice = createSlice({
//   name: 'theme',

//   initialState: {
//     darkMode: false,
//   },

//   reducers: {
//     toggleTheme: state => {
//       state.darkMode = !state.darkMode;
//     },
//   },
// });

// export const {toggleTheme} =
//   themeSlice.actions;

// export default themeSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'APP_IS_DARK_MODE';

// Load saved theme preference when the app boots
export const loadThemePreference = createAsyncThunk(
  'theme/loadThemePreference',
  async () => {
    const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'true';
  }
);

// Toggle theme and persist the new value
export const toggleDarkMode = createAsyncThunk(
  'theme/toggleDarkMode',
  async (_, { getState }) => {
    const newValue = !getState().theme.isDarkMode;
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newValue.toString());
    return newValue;
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: false,
    isThemeLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadThemePreference.fulfilled, (state, action) => {
        state.isDarkMode = action.payload;
        state.isThemeLoaded = true;
      })
      .addCase(toggleDarkMode.fulfilled, (state, action) => {
        state.isDarkMode = action.payload;
      });
  },
});

export const selectIsDarkMode = (state) => state.theme.isDarkMode;

export default themeSlice.reducer;
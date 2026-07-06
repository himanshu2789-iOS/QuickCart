import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE, applyLanguagePreference, getStoredLanguagePreference } from '../../../i18n';

export const loadLanguagePreference = createAsyncThunk(
  'language/loadLanguagePreference',
  async () => {
    const stored = await getStoredLanguagePreference();
    await applyLanguagePreference(stored);
    return stored;
  }
);

export const setLanguagePreference = createAsyncThunk(
  'language/setLanguagePreference',
  async (locale, { rejectWithValue }) => {
    try {
      const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
      await applyLanguagePreference(normalizedLocale);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLocale);
      return normalizedLocale;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    locale: DEFAULT_LANGUAGE,
    isLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLanguagePreference.fulfilled, (state, action) => {
        state.locale = action.payload;
        state.isLoaded = true;
      })
      .addCase(setLanguagePreference.fulfilled, (state, action) => {
        state.locale = action.payload;
      });
  },
});

export const selectLanguage = (state) => state.language.locale;
export default languageSlice.reducer;

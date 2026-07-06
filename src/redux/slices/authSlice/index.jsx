import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'APP_AUTH_TOKEN';
const AUTH_USERNAME_KEY = 'APP_AUTH_USERNAME';

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    const username = await AsyncStorage.getItem(AUTH_USERNAME_KEY);
    if (token) {
      return { token, username };
    }
    return null;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      if (!data.token) {
        throw new Error('Login failed, no token returned');
      }

      await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
      await AsyncStorage.setItem(AUTH_USERNAME_KEY, username);

      return { token: data.token, username };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  await AsyncStorage.removeItem(AUTH_USERNAME_KEY);
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isAuthChecked: false,
    username: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setGoogleUser: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        if (action.payload) {
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.username = action.payload.username;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.username = null;
      });
  },
});

export const { setGoogleUser } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsAuthChecked = (state) => state.auth.isAuthChecked;

export default authSlice.reducer;

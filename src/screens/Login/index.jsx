import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { loginUser, setGoogleUser } from '../../redux/slices/authSlice';
import { selectIsDarkMode } from '../../redux/slices/themeSlice';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import { getStringMap } from '../../i18n';

// Keys — must match the ones used in authSlice.js
const AUTH_TOKEN_KEY = 'APP_AUTH_TOKEN';
const AUTH_USERNAME_KEY = 'APP_AUTH_USERNAME';

// Configure Google Sign-In
GoogleSignin.configure({
  // Taken from client_type: 3 in your google-services.json
  webClientId: '81679098200-450vh89jkqrqhuoopl0mhjti5a5qc5di.apps.googleusercontent.com',
  offlineAccess: true,
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);

  const { status, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState(null);

  // --- Normal login ---
  const handleLogin = () => {
    if (!username.trim() || !password.trim()) return;
    dispatch(loginUser({ username, password }));
  };

  // --- Google login ---
  const onGoogleButtonPress = async () => {
    try {
      setGoogleLoading(true);
      setGoogleError(null);

      // 1. Check Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // 2. Trigger the sign-in flow
      const response = await GoogleSignin.signIn();

      // 3. Extract the ID Token
      const idToken = response.data ? response.data.idToken : response.idToken;
      if (!idToken) {
        throw new Error('No ID token returned from Google Sign-In');
      }

      // 4. Fetch the access token separately
      const { accessToken } = await GoogleSignin.getTokens();
      if (!accessToken) {
        throw new Error('No access token returned from Google Sign-In');
      }

      // 5. Create a Google credential with both tokens
      const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);

      // 6. Sign in to Firebase
      const userCredential = await auth().signInWithCredential(googleCredential);
      const firebaseUser = userCredential.user;

      // 7. Get a Firebase ID token to use as your app's "token"
      const firebaseIdToken = await firebaseUser.getIdToken();
      const displayName = firebaseUser.displayName || firebaseUser.email;

      // 8. Persist the same way loginUser does, so checkAuthStatus picks it up on relaunch
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, firebaseIdToken);
      await AsyncStorage.setItem(AUTH_USERNAME_KEY, displayName);

      // 9. Update Redux state and let the auth state switch the navigator
      dispatch(setGoogleUser({ username: displayName, token: firebaseIdToken }));
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setGoogleError(err.message || 'Google Sign-In failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.content}>
          <Text style={[styles.logo, { color: colors.primary }]}>{strings.login}</Text>
          <Text style={[styles.subtitle, { color: colors.subtext }]}>
            {strings.loginSubtitle}
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>{strings.username}</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.inputBackground, color: colors.text },
            ]}
            value={username}
            onChangeText={setUsername}
            placeholder={strings.enterUsername}
            placeholderTextColor={colors.subtext}
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: colors.text }]}>{strings.password}</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.inputBackground, color: colors.text },
            ]}
            value={password}
            onChangeText={setPassword}
            placeholder={strings.enterPassword}
            placeholderTextColor={colors.subtext}
            secureTextEntry
            autoCapitalize="none"
          />

          {error ? <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{strings.loginButton}</Text>
            )}
          </TouchableOpacity>

          <Text style={[styles.hint, { color: colors.subtext }]}>
            {strings.loginHint}
          </Text>

          {/* --- Divider --- */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: colors.subtext }]} />
            <Text style={[styles.dividerText, { color: colors.subtext }]}>{strings.or}</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.subtext }]} />
          </View>

          {/* --- Google Sign-In --- */}
          {googleError ? (
            <Text style={[styles.errorText, { color: colors.danger }]}>{googleError}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.googleButton}
            onPress={onGoogleButtonPress}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.googleButtonContent}>
                <Icon name="google" size={20} color="#fff" style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>{strings.googleSignIn}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  logo: { fontSize: 30, fontWeight: '800', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 32 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: {
    height: 46,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  errorText: { marginTop: 14, fontSize: 13, textAlign: 'center' },
  button: {
    marginTop: 26,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  hint: { marginTop: 16, fontSize: 12, textAlign: 'center' },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  dividerLine: { flex: 1, height: StyleSheet.hairlineWidth, opacity: 0.4 },
  dividerText: { marginHorizontal: 10, fontSize: 12, fontWeight: '600' },
  googleButton: {
    backgroundColor: '#2563eb',
    minHeight: 48,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    paddingHorizontal: 16,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    textAlignVertical: 'center',
  },
});

export default LoginScreen;
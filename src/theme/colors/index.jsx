export const lightColors = {
  background: '#f4f4f5',
  surface: '#ffffff',
  text: '#1a1a1a',
  subtext: '#666666',
  primary: '#2563eb',
  accent: '#1a7a3c',
  danger: '#ef4444',
  border: '#eeeeee',
  inputBackground: '#f1f1f1',
  headerBackground: '#ffffff',
  drawerBackground: '#ffffff',
  statusBar: 'dark-content',
};

export const darkColors = {
  background: '#121212',
  surface: '#1e1e1e',
  text: '#f1f1f1',
  subtext: '#a0a0a0',
  primary: '#3b82f6',
  accent: '#34d399',
  danger: '#f87171',
  border: '#2c2c2c',
  inputBackground: '#2a2a2a',
  headerBackground: '#1e1e1e',
  drawerBackground: '#1a1a1a',
  statusBar: 'light-content',
};

export const getColors = (isDarkMode) => (isDarkMode ? darkColors : lightColors);
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import { selectIsDarkMode } from '../../redux/slices/themeSlice';
import { setLanguagePreference, selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import { getStringMap, getLanguageDirection } from '../../i18n';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const { username } = useSelector((state) => state.auth);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);
  const textDirection = getLanguageDirection(locale);

  const MENU_ITEMS = [
    { key: 'Home', label: strings.menuHome, icon: '🏠' },
    { key: 'Settings', label: strings.menuSettings, icon: '⚙️' },
    { key: 'OrderHistory', label: strings.menuOrderHistory, icon: '🛍️' },
  ];

  const handleLogout = () => {
    Alert.alert(strings.logout, strings.logoutPrompt, [
      { text: strings.cancel, style: 'cancel' },
      { text: strings.logout, style: 'destructive', onPress: () => dispatch(logoutUser()) },
    ]);
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.drawerBackground }}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={[styles.profileSection, { borderBottomColor: colors.border, alignItems: textDirection === 'rtl' ? 'flex-end' : 'center' }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{username ? username[0].toUpperCase() : '?'}</Text>
        </View>
        <Text style={[styles.username, { color: colors.text }]}>{username || strings.guest}</Text>
      </View>

      <View style={[styles.menuSection, { alignItems: textDirection === 'rtl' ? 'flex-end' : 'flex-start' }]}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.menuItem}
            //onPress={() => props.navigation.navigate(item.key)}
            onPress={() => { props.navigation.closeDrawer();
            setTimeout(() => {
            props.navigation.navigate(item.key);
           }, 150);
           }}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.spacer} />

      <View style={[styles.languageSection, { borderTopColor: colors.border }]}> 
        <Text style={[styles.languageTitle, { color: colors.text }]}>{strings.changeLanguage}</Text>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => dispatch(setLanguagePreference('en'))}
        >
          <View style={styles.languageRow}>
            <View style={[styles.radioCircle, locale === 'en' && styles.radioCircleSelected]} />
            <Text style={[styles.languageLabel, { color: colors.text }]}>{strings.english}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => dispatch(setLanguagePreference('ar'))}
        >
          <View style={styles.languageRow}>
            <View style={[styles.radioCircle, locale === 'ar' && styles.radioCircleSelected]} />
            <Text style={[styles.languageLabel, { color: colors.text }]}>{strings.arabic}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.menuItem, styles.logoutItem, { borderTopColor: colors.border }]}
        onPress={handleLogout}
      >
        <Text style={styles.menuIcon}>🚪</Text>
        <Text style={[styles.menuLabel, { color: colors.danger }]}>{strings.logout}</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: '700' },
  username: { fontSize: 16, fontWeight: '700' },
  menuSection: { paddingTop: 8 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuIcon: { fontSize: 20, width: 32 },
  menuLabel: { fontSize: 15, fontWeight: '600' },
  spacer: { flex: 1 },
  logoutItem: { borderTopWidth: 1, paddingVertical: 16 },
  languageSection: { paddingHorizontal: 20, paddingVertical: 12, borderTopWidth: 1 },
  languageTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  languageOption: { paddingVertical: 6 },
  languageRow: { flexDirection: 'row', alignItems: 'center' },
  radioCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#94a3b8',
    marginRight: 8,
  },
  radioCircleSelected: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  languageLabel: { fontSize: 14, fontWeight: '600' },
});

export default CustomDrawerContent;
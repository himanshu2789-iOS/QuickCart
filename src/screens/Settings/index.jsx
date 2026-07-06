// import React from 'react';
// import { View, Text, Switch, StyleSheet} from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectIsDarkMode, toggleDarkMode } from '../../redux/slices/themeSlice';
// import { getColors } from '../../theme/colors';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const SettingsScreen = () => {
//   const dispatch = useDispatch();
//   const isDarkMode = useSelector(selectIsDarkMode);
//   const { username } = useSelector((state) => state.auth);
//   const colors = getColors(isDarkMode);

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
//       <Text style={[styles.header, { color: colors.text }]}>Settings</Text>

//       {username ? (
//         <Text style={[styles.userInfo, { color: colors.subtext }]}>
//           Logged in as <Text style={{ fontWeight: '700', color: colors.text }}>{username}</Text>
//         </Text>
//       ) : null}

//       <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
//         <View style={styles.rowText}>
//           <Text style={[styles.rowTitle, { color: colors.text }]}>
//             {isDarkMode ? 'Dark Mode' : 'Light Mode'}
//           </Text>
//           <Text style={[styles.rowSubtitle, { color: colors.subtext }]}>
//             Toggle to switch the whole app's theme
//           </Text>
//         </View>
//         <Switch
//           value={isDarkMode}
//           onValueChange={() => dispatch(toggleDarkMode())}
//           trackColor={{ false: '#d1d5db', true: colors.primary }}
//           thumbColor="#ffffff"
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingHorizontal: 20, paddingTop: 4 },
//   header: { fontSize: 24, fontWeight: '800', marginBottom: 6, marginTop: 0 },
//   userInfo: { fontSize: 14, marginBottom: 24 },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderRadius: 10,
//     borderWidth: 1,
//   },
//   rowText: { flex: 1, marginRight: 12 },
//   rowTitle: { fontSize: 16, fontWeight: '600' },
//   rowSubtitle: { fontSize: 12, marginTop: 4 },
// });
 
// export default SettingsScreen;


import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDarkMode, toggleDarkMode } from '../../redux/slices/themeSlice';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import { getStringMap } from '../../i18n';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const { username } = useSelector((state) => state.auth);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>{strings.settings}</Text>

      {username ? (
        <Text style={[styles.userInfo, { color: colors.subtext }]}>
          {strings.loggedInAs} <Text style=
          {{ fontSize: 20,
             fontWeight: '700', 
             color: colors.text,
             fontStyle: 'bold' }}>{username}</Text>
        </Text>
      ) : null}

      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.rowText}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Text style={[styles.rowSubtitle, { color: colors.subtext }]}>
            Toggle to switch the whole app's theme
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={() => dispatch(toggleDarkMode())}
          trackColor={{ false: '#d1d5db', true: colors.primary }}
          thumbColor="#ffffff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20},
  header: { fontSize: 24, fontWeight: '800'},
  userInfo: { fontSize: 16, marginBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17,
    borderRadius: 10,
    borderWidth: 1,
  },
  rowText: { flex: 1, marginRight: 12 },
  rowTitle: { fontSize: 18, fontWeight: '600' },
  rowSubtitle: { fontSize: 12, marginTop: 4 },
});

export default SettingsScreen;
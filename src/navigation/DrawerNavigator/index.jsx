import React from 'react';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';

const Drawer =
  createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Drawer.Navigator>
  );
}
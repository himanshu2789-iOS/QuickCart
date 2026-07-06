import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const CartBadge = ({
  count,
}) => {
  if (count === 0) {
    return null;
  }

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>
        {count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -8,
    top: -5,

    width: 20,
    height: 20,

    borderRadius: 10,

    backgroundColor: 'red',

    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 12,
  },
});
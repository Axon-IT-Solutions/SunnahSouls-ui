import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlayNow() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Now Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'PlusJakartaSansBold',
  },
});
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import GlowwGamifiedApp from '@/components/GlowwGamifiedApp';

export default function GamifiedDemoScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4EEE9" />
      <GlowwGamifiedApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EEE9',
  },
});

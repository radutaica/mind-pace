import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function IndexScreen() {
  useEffect(() => {
    // Use a small delay to ensure the layout is mounted
    const timer = setTimeout(() => {
      router.replace('/(onboarding)');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Return a simple view while redirecting
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E7BF',
  },
}); 
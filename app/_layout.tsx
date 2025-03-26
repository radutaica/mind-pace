import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';

export default function RootLayout() {
  // Load any global fonts here
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // You can add custom fonts here
        // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        // 'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      });
    }
    
    loadFonts();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="timer"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
} 
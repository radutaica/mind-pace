import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, Stack } from 'expo-router';

export default function OnboardingStep3() {
  const handleFinish = () => {
    // Navigate to home screen after completing onboarding
    router.replace('/home');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Step 3</Text>
          <Text style={styles.subtitle}>This is the final step of onboarding</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.nextButton} onPress={handleFinish}>
              <Text style={styles.nextText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E7BF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3B2F',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C5A3C',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 12,
  },
  backText: {
    color: '#B99C87',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#7F5539',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

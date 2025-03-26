import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const handleStartSession = () => {
    // Navigate to the timer screen
    router.push('/timer');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/mind-pace-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Mindful productivity through focused intervals
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartSession}>
        <Text style={styles.buttonText}>Begin Session</Text>
      </TouchableOpacity>

      <View style={styles.featureContainer}>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Focused intervals</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Mindful breaks</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Progress tracking</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 234, 186)',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logoContainer: {
    width: 640,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Quicksand',
    fontWeight: '400',
    color: '#1F3B2C',
    letterSpacing: 8,
    marginTop: 20,
  },
  descriptionContainer: {
    padding: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#1F3B2C',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
    maxWidth: 280,
  },
  button: {
    backgroundColor: '#1F3B2C',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: '#FFF1D6',
    letterSpacing: 1,
  },
  featureContainer: {
    marginTop: 60,
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  featureItem: {
    marginVertical: 8,
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#1F3B2C',
    opacity: 0.7,
    letterSpacing: 1,
  },
}); 
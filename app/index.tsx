import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function HomeScreen() {
  const handleStartSession = () => {
    // Navigate to the timer screen
    router.push('/timer');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2E3192', '#1BFFFF']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Mind Pace</Text>
        <Text style={styles.subtitle}>Stay focused. Stay productive.</Text>
      </View>

      <View style={styles.imageContainer}>
        {/* Timer visualization */}
        <View style={styles.timerVisualization}>
          <View style={styles.coffeeCircle}>
            <View style={styles.coffeeFill} />
          </View>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          A simple and visually engaging focus timer that helps you stay productive. 
          Watch as a coffee cup gradually empties to track your work and break sessions.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartSession}>
        <Text style={styles.buttonText}>Begin Focus Session</Text>
      </TouchableOpacity>

      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>Features:</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureDot}>•</Text>
          <Text style={styles.featureText}>Work & break cycle visualization</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureDot}>•</Text>
          <Text style={styles.featureText}>Multiple theme options</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureDot}>•</Text>
          <Text style={styles.featureText}>Customizable timer settings</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureDot}>•</Text>
          <Text style={styles.featureText}>Simple, distraction-free interface</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
    opacity: 0.8,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  timerVisualization: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coffeeCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  coffeeFill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    backgroundColor: '#6A3805',
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
  },
  descriptionContainer: {
    padding: 20,
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3192',
  },
  featureContainer: {
    marginTop: 40,
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  featureDot: {
    fontSize: 20,
    color: '#FFFFFF',
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
}); 
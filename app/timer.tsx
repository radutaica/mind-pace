import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function TimerScreen() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [fillPercentage, setFillPercentage] = useState(100);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time > 0) {
            // Calculate fill percentage based on remaining time
            const newFillPercentage = (time - 1) / (25 * 60) * 100;
            setFillPercentage(newFillPercentage);
            return time - 1;
          } else {
            if (interval) clearInterval(interval);
            setIsActive(false);
            return 0;
          }
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  const handlePause = () => {
    setIsPaused(true);
  };
  
  const handleResume = () => {
    setIsPaused(false);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(25 * 60);
    setFillPercentage(100);
  };

  const handleBack = () => {
    router.back();
  };
  
  // Format time to display
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2E3192', '#1BFFFF']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.title}>Mind Pace</Text>
      </View>
      
      <View style={styles.timerContainer}>
        <View style={styles.timerVisualization}>
          <View style={styles.coffeeCircle}>
            <View 
              style={[
                styles.coffeeFill, 
                { height: `${fillPercentage}%` }
              ]} 
            />
          </View>
        </View>
        
        <Text style={styles.timerText}>{formatTime()}</Text>
        
        <View style={styles.controlsContainer}>
          {!isActive ? (
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          ) : (
            <>
              {!isPaused ? (
                <TouchableOpacity style={styles.button} onPress={handlePause}>
                  <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleResume}>
                  <Text style={styles.buttonText}>Resume</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
                <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
              </TouchableOpacity>
            </>
          )}
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 30,
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerVisualization: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  coffeeCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    transform: [{ rotateX: '180deg' }], // Flip to make the fill start from top
  },
  coffeeFill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#6A3805',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginHorizontal: 10,
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
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  resetButtonText: {
    color: '#FFFFFF',
  },
}); 
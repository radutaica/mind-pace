import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function TimerScreen() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [fillPercentage, setFillPercentage] = useState(100);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time > 0) {
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
  
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  
  return (
    <SafeAreaView style={styles.container}>      
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      
      <View style={styles.timerContainer}>
        <View style={styles.timerVisualization}>
          {/* Egg outline */}
          <View style={styles.eggOutline}>
            {/* Timer marks */}
            <View style={styles.timerMarks}>
              {Array.from({ length: 9 }).map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.timerMark,
                    { opacity: (fillPercentage / 100) > (index / 8) ? 1 : 0.3 }
                  ]} 
                />
              ))}
            </View>
            {/* Timer indicator */}
            <View 
              style={[
                styles.timerIndicator,
                { transform: [{ translateY: (100 - fillPercentage) }] }
              ]} 
            />
          </View>
        </View>
        
        <Text style={styles.timerText}>{formatTime()}</Text>
        
        <View style={styles.controlsContainer}>
          {!isActive ? (
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Begin Focus</Text>
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
    backgroundColor: 'rgb(255, 234, 182)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButtonText: {
    color: '#1F3B2C',
    fontSize: 16,
    fontFamily: 'Quicksand',
    opacity: 0.8,
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  timerVisualization: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  eggOutline: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: '#1F3B2C',
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  timerMarks: {
    width: '50%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerMark: {
    width: 3,
    height: 20,
    backgroundColor: '#1F3B2C',
  },
  timerIndicator: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#1F3B2C',
  },
  timerText: {
    fontSize: 48,
    fontFamily: 'Quicksand',
    fontWeight: '300',
    color: '#1F3B2C',
    marginBottom: 40,
    letterSpacing: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: '#1F3B2C',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: 'rgb(255, 234, 182)',
    letterSpacing: 1,
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1F3B2C',
  },
  resetButtonText: {
    color: '#1F3B2C',
  },
}); 
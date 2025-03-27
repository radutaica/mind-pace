import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function TimerScreen() {
  const params = useLocalSearchParams<{ focusTime?: string, relaxTime?: string }>();
  
  // Convert params to numbers with fallback values
  const initialFocusTime = params.focusTime ? parseInt(params.focusTime, 10) : 25;
  const initialRelaxTime = params.relaxTime ? parseInt(params.relaxTime, 10) : 5;
  
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true); // True for focus, false for relax
  const [time, setTime] = useState(initialFocusTime * 60); // Convert minutes to seconds
  const [fillPercentage, setFillPercentage] = useState(100);
  const initialTimeRef = useRef(time);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    
    if (isActive && !isPaused) {
      // Store initial time when timer starts
      if (initialTimeRef.current !== time && fillPercentage === 100) {
        initialTimeRef.current = time;
      }
      
      interval = setInterval(() => {
        setTime((time) => {
          if (time > 0) {
            // Calculate percentage based on current time relative to initial time
            const newFillPercentage = (time - 1) / initialTimeRef.current * 100;
            setFillPercentage(newFillPercentage);
            return time - 1;
          } else {
            if (interval) clearInterval(interval);
            // If focus mode ended, switch to relax mode and vice versa
            if (isFocusMode) {
              setIsFocusMode(false);
              setTime(initialRelaxTime * 60);
              setFillPercentage(100);
              initialTimeRef.current = initialRelaxTime * 60;
              setIsActive(true); // Auto-start relax timer
            } else {
              setIsFocusMode(true);
              setTime(initialFocusTime * 60);
              setFillPercentage(100);
              setIsActive(false); // Don't auto-start focus timer
            }
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
  }, [isActive, isPaused, isFocusMode, initialFocusTime, initialRelaxTime]);
  
  const handleStart = () => {
    // Update initialTimeRef when starting
    initialTimeRef.current = time;
    setFillPercentage(100);
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
    setTime(isFocusMode ? initialFocusTime * 60 : initialRelaxTime * 60);
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
        <Text style={styles.modeText}>
          {isFocusMode ? 'Focus Time' : 'Relax Time'}
        </Text>
        
        <View style={styles.timerVisualization}>
          {/* Coffee Cup */}
          <View style={styles.cupContainer}>
            {/* Cup handle */}
            <View style={styles.cupHandle} />
            
            {/* Cup body */}
            <View style={styles.cupBody}>
              {/* Coffee liquid */}
              <View 
                style={[
                  styles.coffee, 
                  { 
                    height: `${fillPercentage}%`,
                    backgroundColor: isFocusMode ? '#6F4E37' : '#8BC34A'
                  }
                ]}
              >
                {/* Coffee surface with steam */}
                <View style={styles.coffeeSurface}>
                  {isActive && !isPaused && (
                    <>
                      <View style={[styles.steam, styles.steam1]} />
                      <View style={[styles.steam, styles.steam2]} />
                      <View style={[styles.steam, styles.steam3]} />
                    </>
                  )}
                </View>
              </View>
            </View>
            
            {/* Cup saucer */}
            <View style={styles.cupSaucer} />
          </View>
        </View>
        
        <Text style={styles.timerText}>{formatTime()}</Text>
        
        <View style={styles.controlsContainer}>
          {!isActive ? (
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>
                {isFocusMode ? 'Begin Focus' : 'Begin Relax'}
              </Text>
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
  modeText: {
    fontSize: 24,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    color: '#1F3B2C',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerVisualization: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  cupContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cupBody: {
    width: 120,
    height: 150,
    borderWidth: 5,
    borderColor: '#1F3B2C',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    position: 'relative',
  },
  cupHandle: {
    position: 'absolute',
    width: 40,
    height: 60,
    borderWidth: 5,
    borderColor: '#1F3B2C',
    borderLeftWidth: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    right: 65,
    top: 100,
  },
  cupSaucer: {
    width: 160,
    height: 20,
    borderRadius: 80,
    backgroundColor: '#1F3B2C',
    marginTop: 5,
  },
  coffee: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#6F4E37',
  },
  coffeeSurface: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 2,
  },
  steam: {
    position: 'absolute',
    width: 8,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
  },
  steam1: {
    left: '30%',
    transform: [{ rotate: '-15deg' }],
    opacity: 0.7,
    top: -20,
  },
  steam2: {
    left: '50%',
    transform: [{ rotate: '0deg' }],
    opacity: 0.9,
    height: 25,
    top: -25,
  },
  steam3: {
    left: '70%',
    transform: [{ rotate: '15deg' }],
    opacity: 0.7,
    top: -20,
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
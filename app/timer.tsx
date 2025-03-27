import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function TimerScreen() {
  const params = useLocalSearchParams<{ focusTime?: string, relaxTime?: string }>();
  
  // Convert params to numbers with fallback values - now accepting decimal values
  const initialFocusTime = params.focusTime ? parseFloat(params.focusTime) : 0.5;
  const initialRelaxTime = params.relaxTime ? parseFloat(params.relaxTime) : 0.5;
  
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true); // True for focus, false for relax
  const [timeLeft, setTimeLeft] = useState(Math.round(initialFocusTime * 60)); // in seconds
  const [fillPercentage, setFillPercentage] = useState(100);
  
  // References for tracking time
  const startTimeRef = useRef<number | null>(null); // timestamp when timer started
  const pausedTimeRef = useRef<number>(0); // accumulated paused time
  const pauseStartRef = useRef<number | null>(null); // timestamp when pause started
  const totalDurationRef = useRef(Math.round(initialFocusTime * 60)); // total duration in seconds
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    
    if (isActive && !isPaused) {
      // If we're unpausing, track the paused time
      if (pauseStartRef.current !== null) {
        pausedTimeRef.current += Date.now() - pauseStartRef.current;
        pauseStartRef.current = null;
      }
      
      // If we're just starting, set the start time
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now();
        totalDurationRef.current = Math.round(isFocusMode ? initialFocusTime * 60 : initialRelaxTime * 60);
      }
      
      interval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current! - pausedTimeRef.current) / 1000);
        const newTimeLeft = Math.max(0, totalDurationRef.current - elapsedSeconds);
        
        setTimeLeft(newTimeLeft);
        
        if (isFocusMode) {
          // For focus mode, percentage decreases as time decreases
          const newFillPercentage = (newTimeLeft / totalDurationRef.current) * 100;
          setFillPercentage(newFillPercentage);
        } else {
          // For relax mode, percentage increases as time decreases
          const newFillPercentage = 100 - ((newTimeLeft / totalDurationRef.current) * 100);
          setFillPercentage(newFillPercentage);
        }
        
        // Check if timer completed
        if (newTimeLeft === 0) {
          if (interval) clearInterval(interval);
          
          // If focus mode ended, switch to relax mode and vice versa
          if (isFocusMode) {
            setIsFocusMode(false);
            setTimeLeft(Math.round(initialRelaxTime * 60));
            setFillPercentage(0); // Start at 0% for relax mode
            totalDurationRef.current = Math.round(initialRelaxTime * 60);
            startTimeRef.current = Date.now();
            pausedTimeRef.current = 0;
            setIsActive(true); // Auto-start relax timer
          } else {
            setIsFocusMode(true);
            setTimeLeft(Math.round(initialFocusTime * 60));
            setFillPercentage(100); // Start at 100% for focus mode
            totalDurationRef.current = Math.round(initialFocusTime * 60);
            startTimeRef.current = null;
            pausedTimeRef.current = 0;
            setIsActive(false); // Don't auto-start focus timer
          }
        }
      }, 100); // Update more frequently for smoother UI
    } else if (isPaused && pauseStartRef.current === null) {
      // Store the time when we paused
      pauseStartRef.current = Date.now();
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, isFocusMode, initialFocusTime, initialRelaxTime]);
  
  const handleStart = () => {
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
    pauseStartRef.current = null;
    totalDurationRef.current = Math.round(isFocusMode ? initialFocusTime * 60 : initialRelaxTime * 60);
    setFillPercentage(isFocusMode ? 100 : 0); // 100% for focus, 0% for relax
    setTimeLeft(totalDurationRef.current);
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
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    pauseStartRef.current = null;
    totalDurationRef.current = Math.round(isFocusMode ? initialFocusTime * 60 : initialRelaxTime * 60);
    setTimeLeft(totalDurationRef.current);
    setFillPercentage(isFocusMode ? 100 : 0); // 100% for focus, 0% for relax
  };

  const handleBack = () => {
    router.back();
  };
  
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
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
                    backgroundColor: '#6F4E37'
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
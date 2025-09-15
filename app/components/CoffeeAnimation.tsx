import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';

interface CoffeeAnimationProps {
  fillPercentage: number;
  isFocusMode: boolean;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function CoffeeAnimation({ fillPercentage, isFocusMode }: CoffeeAnimationProps) {
  // Animation values
  const wave1 = useSharedValue(0);
  const wave2 = useSharedValue(0);
  const wave3 = useSharedValue(0);
  const ripple = useSharedValue(0);

  // Start animations
  React.useEffect(() => {
    // Main wave animation
    wave1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.bezier(0.25, 0, 0.75, 1) }),
        withTiming(0, { duration: 3000, easing: Easing.bezier(0.25, 0, 0.75, 1) })
      ),
      -1
    );

    // Secondary wave animation
    wave2.value = withRepeat(
      withSequence(
        withDelay(
          500,
          withTiming(1, { duration: 3200, easing: Easing.bezier(0.25, 0, 0.75, 1) })
        ),
        withTiming(0, { duration: 3200, easing: Easing.bezier(0.25, 0, 0.75, 1) })
      ),
      -1
    );

    // Tertiary wave animation
    wave3.value = withRepeat(
      withSequence(
        withDelay(
          1000,
          withTiming(1, { duration: 1800, easing: Easing.bezier(0.445, 0.05, 0.55, 0.95) })
        ),
        withTiming(0, { duration: 1800, easing: Easing.bezier(0.445, 0.05, 0.55, 0.95) })
      ),
      -1
    );

    // Ripple effect
    ripple.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        withTiming(0, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      ),
      -1
    );
  }, []);

  // Animated styles for waves
  const wave1Style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            wave1.value,
            [0, 1],
            [0, -50]
          ),
        },
      ],
    };
  });

  const wave2Style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            wave2.value,
            [0, 1],
            [0, -50]
          ),
        },
      ],
    };
  });

  const wave3Style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            wave3.value,
            [0, 1],
            [0, -50]
          ),
        },
      ],
    };
  });

  const rippleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        ripple.value,
        [0, 1],
        [0.2, 0.4]
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Svg width="120" height="150" viewBox="0 0 120 150">
        <Defs>
          <LinearGradient id="coffeeGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#85593E" stopOpacity="1" />
            <Stop offset="1" stopColor="#6F4E37" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        
        {/* Cup body */}
        <Path
          d="M10 10 L110 10 L110 140 C110 145 105 150 100 150 L20 150 C15 150 10 145 10 140 Z"
          stroke="#1F3B2C"
          strokeWidth="5"
          fill="white"
        />
        
        {/* Coffee liquid */}
        <AnimatedPath
          d={`M15 15 L105 15 L105 ${140 - (fillPercentage * 1.3)} C105 ${145 - (fillPercentage * 1.3)} 100 ${150 - (fillPercentage * 1.3)} 95 ${150 - (fillPercentage * 1.3)} L25 ${150 - (fillPercentage * 1.3)} C20 ${150 - (fillPercentage * 1.3)} 15 ${145 - (fillPercentage * 1.3)} 15 ${140 - (fillPercentage * 1.3)} Z`}
          fill="url(#coffeeGradient)"
        />
        
        {/* Animated waves */}
        <Animated.View style={[styles.waveContainer, wave1Style]}>
          <Path
            d="M0 0 L120 0 C120 10 60 15 60 15 C60 15 0 10 0 0"
            fill="#85593E"
            opacity={0.3}
          />
        </Animated.View>
        
        <Animated.View style={[styles.waveContainer, wave2Style]}>
          <Path
            d="M0 0 L120 0 C120 8 60 12 60 12 C60 12 0 8 0 0"
            fill="#85593E"
            opacity={0.2}
          />
        </Animated.View>
        
        <Animated.View style={[styles.waveContainer, wave3Style]}>
          <Path
            d="M0 0 L120 0 C120 6 60 9 60 9 C60 9 0 6 0 0"
            fill="#85593E"
            opacity={0.1}
          />
        </Animated.View>
        
        {/* Ripple effect */}
        <Animated.View style={[styles.rippleContainer, rippleStyle]}>
          <Path
            d="M30 0 L90 0 C90 5 60 7 60 7 C60 7 30 5 30 0"
            fill="#85593E"
          />
        </Animated.View>
      </Svg>
      
      {/* Cup handle */}
      <View style={styles.handle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 150,
    position: 'relative',
  },
  handle: {
    position: 'absolute',
    width: 40,
    height: 60,
    borderWidth: 5,
    borderColor: '#1F3B2C',
    borderLeftWidth: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    right: -35,
    top: 100,
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: 20,
  },
  rippleContainer: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: 15,
  },
}); 
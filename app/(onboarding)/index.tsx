import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';
import { router, Stack } from 'expo-router';
import Svg, { Circle, Path, G } from 'react-native-svg';
// import { Ionicons } from '@expo/vector-icons';

// Color tokens
const COLORS = {
  background: '#F8E7BF',
  primaryBrown: '#7F5539',
  deepGreen: '#1C3B2F',
  warmBrown: '#8C5A3C',
  mutedBrown: '#B99C87',
  inactiveProgress: '#EAD7C2',
  white: '#FFFFFF',
};

// Responsive helper
const useResponsiveScale = () => {
  const { width, height } = useWindowDimensions();
  const baselineWidth = 375;
  const scale = Math.max(0.85, Math.min(1.25, width / baselineWidth));
  const smallerDimension = Math.min(width, height);
  
  return {
    scale,
    smallerDimension,
    horizontalPadding: width * 0.08, // 8% of width
    svgSize: smallerDimension * 0.31, // 31% of smaller dimension
  };
};

// Step Progress Component
const StepProgress = ({ currentStep = 1, scale = 1 }) => {
  const barWidth = 28 * scale;
  const barHeight = 4 * scale;
  const spacing = 12 * scale;

  return (
    <View style={[styles.progressContainer, { transform: [{ scale }] }]}>
      {[1, 2, 3].map((step) => (
        <View
          key={step}
          style={[
            styles.progressBar,
            {
              width: barWidth,
              height: barHeight,
              marginRight: step < 3 ? spacing : 0,
              backgroundColor: step <= currentStep ? COLORS.primaryBrown : COLORS.inactiveProgress + '99',
            },
          ]}
        />
      ))}
    </View>
  );
};

// Rotating Coffee SVG Component
const RotatingCoffee = ({ size = 120 }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotation.start();

    return () => rotation.stop();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        {/* Coffee cup */}
        <Path
          d="M25 35 L25 80 Q25 90 35 90 L75 90 Q85 90 85 80 L85 35 L80 35 L80 30 Q80 20 70 20 L30 20 Q20 20 20 30 L20 35 Z"
          fill={COLORS.primaryBrown}
          stroke={COLORS.primaryBrown}
          strokeWidth="2"
        />
        {/* Cup handle */}
        <Path
          d="M85 50 Q95 50 95 60 Q95 70 85 70"
          fill="none"
          stroke={COLORS.primaryBrown}
          strokeWidth="3"
        />
        {/* Steam dashes - horizontal lines */}
        <Path
          d="M40 15 L50 15"
          stroke={COLORS.primaryBrown}
          strokeWidth="2"
          opacity="0.7"
        />
        <Path
          d="M50 10 L60 10"
          stroke={COLORS.primaryBrown}
          strokeWidth="2"
          opacity="0.5"
        />
        <Path
          d="M60 12 L70 12"
          stroke={COLORS.primaryBrown}
          strokeWidth="2"
          opacity="0.6"
        />
        {/* Coffee surface */}
        <Path
          d="M25 35 L85 35"
          stroke={COLORS.deepGreen}
          strokeWidth="2"
        />
      </Svg>
    </Animated.View>
  );
};

export default function OnboardingStep1() {
  const { scale, horizontalPadding, svgSize } = useResponsiveScale();

  const handleNext = () => {
    router.push('/(onboarding)/step-2');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Progress Indicator */}
        <View style={[styles.topContainer, { paddingHorizontal: horizontalPadding }]}>
          <StepProgress currentStep={1} scale={scale} />
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={[styles.title, { fontSize: 35 * scale }]}>
            Welcome to Mind{'\n'}Pace
          </Text>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { fontSize: 18 * scale }]}>
            Your mindful productivity companion
          </Text>

          {/* Animated Coffee SVG */}
          <View style={styles.svgContainer}>
            <RotatingCoffee size={svgSize} />
          </View>

          {/* Kicker */}
          <Text style={[styles.kicker, { fontSize: 20 * scale }]}>
            Brew your perfect focus sessions{'\n'}with mindful productivity techniques
          </Text>

          {/* Body */}
          <Text style={[styles.body, { fontSize: 18 * scale }]}>
            Combine the power of Pomodoro technique{'\n'}with coffee shop ambiance for ultimate focus
          </Text>
        </View>

        {/* Bottom Actions */}
        <View style={[styles.bottomContainer, { paddingHorizontal: horizontalPadding }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.backText, { fontSize: 16 * scale }]}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, { transform: [{ scale }] }]}
            onPress={handleNext}
            accessibilityRole="button"
            accessibilityLabel="Go to next step"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.nextText, { fontSize: 16 * scale }]}>Next</Text>
            <Text style={[styles.chevron, { fontSize: 16 * scale }]}>›</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '700',
    color: COLORS.deepGreen,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.warmBrown,
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 22,
  },
  svgContainer: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kicker: {
    fontWeight: '700',
    color: COLORS.deepGreen,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 16,
  },
  body: {
    color: COLORS.warmBrown,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backText: {
    color: COLORS.mutedBrown,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: COLORS.primaryBrown,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },
  nextText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  chevron: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 4,
  },
});

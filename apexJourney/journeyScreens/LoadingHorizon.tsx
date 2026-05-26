import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Easing, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle, Path} from 'react-native-svg';
import {AnimatedCompass} from '../journeyComponents/AnimatedCompass';
import {journeyPalette} from '../journeyTheme/palette';

interface LoadingHorizonProps {
  onDone: () => void;
  duration?: number;
}

const {width} = Dimensions.get('window');

export const LoadingHorizon: React.FC<LoadingHorizonProps> = ({onDone, duration = 3500}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const particles = useRef(Array.from({length: 14}).map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.bezier(0.5, 0, 0.4, 1),
      useNativeDriver: false,
    }).start(({finished}) => {
      //if (finished) onDone();
    });

    particles.forEach((p, i) => {
      const loop = () =>
        Animated.sequence([
          Animated.delay(i * 180),
          Animated.timing(p, {
            toValue: 1,
            duration: 2400 + (i % 5) * 220,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(p, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start(() => loop());
      loop();
    });
  }, [progress, particles, duration, onDone]);

  const barWidth = progress.interpolate({inputRange: [0, 1], outputRange: ['4%', '100%']});

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#0E0805', '#1A100A', '#0C0703']}
        style={StyleSheet.absoluteFill}
      />
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {particles.map((p, i) => {
          const startX = ((i * 73) % width) + 10;
          const translateY = p.interpolate({inputRange: [0, 1], outputRange: [60, -260]});
          const opacity = p.interpolate({inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.7, 0.7, 0]});
          return (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                {left: startX, transform: [{translateY}], opacity},
              ]}
            />
          );
        })}
      </View>

      <View style={styles.center}>
        <View style={styles.routeWrap}>
          <Svg width={260} height={120} viewBox="0 0 260 120">
            <Path
              d="M 10 90 C 60 20, 120 110, 180 50 S 240 80, 250 30"
              stroke="rgba(245,158,11,0.6)"
              strokeWidth={2}
              fill="none"
              strokeDasharray="4 6"
            />
            <Circle cx={10} cy={90} r={4} fill={journeyPalette.compassOrange} />
            <Circle cx={250} cy={30} r={4} fill={journeyPalette.compassOrange} />
          </Svg>
        </View>
        <AnimatedCompass size={170} />
        <Text style={styles.title}>Explorer's Routes</Text>
        <Text style={styles.subtitle}>Charting historic voyages…</Text>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, {width: barWidth}]}>
            <LinearGradient
              colors={[journeyPalette.compassOrange, journeyPalette.compassOrangeDeep]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: journeyPalette.archiveDeep},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32},
  routeWrap: {marginBottom: 16, opacity: 0.7},
  title: {
    color: journeyPalette.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 18,
    letterSpacing: 0.5,
  },
  subtitle: {color: journeyPalette.textMuted, fontSize: 13, marginTop: 8},
  barTrack: {
    marginTop: 30,
    width: '70%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    bottom: 120,
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: journeyPalette.compassOrange,
    shadowColor: journeyPalette.compassOrange,
    shadowOpacity: 1,
    shadowRadius: 6,
  },
});

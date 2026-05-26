import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import Svg, {Circle, G, Polygon, Defs, RadialGradient, Stop} from 'react-native-svg';
import {journeyPalette} from '../journeyTheme/palette';

interface AnimatedCompassProps {
  size?: number;
  glowing?: boolean;
}

export const AnimatedCompass: React.FC<AnimatedCompassProps> = ({size = 160, glowing = true}) => {
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 4200,
        easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
        useNativeDriver: true,
      }),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1300,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1300,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [spin, pulse]);

  const rotate = spin.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']});
  const glowScale = pulse.interpolate({inputRange: [0, 1], outputRange: [0.85, 1.1]});
  const glowOpacity = pulse.interpolate({inputRange: [0, 1], outputRange: [0.35, 0.75]});

  return (
    <View style={{width: size, height: size, alignItems: 'center', justifyContent: 'center'}}>
      {glowing && (
        <Animated.View
          style={[
            styles.glow,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              transform: [{scale: glowScale}],
              opacity: glowOpacity,
            },
          ]}
        />
      )}
      <Svg width={size} height={size} viewBox="-50 -50 100 100">
        <Defs>
          <RadialGradient id="bezel" cx="0" cy="0" r="50">
            <Stop offset="0%" stopColor="#3A2A1E" stopOpacity={1} />
            <Stop offset="100%" stopColor="#160E08" stopOpacity={1} />
          </RadialGradient>
        </Defs>
        <Circle cx="0" cy="0" r="46" fill="url(#bezel)" stroke={journeyPalette.compassOrange} strokeWidth={1.4} />
        <Circle cx="0" cy="0" r="38" fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth={0.6} />
        <Circle cx="0" cy="0" r="28" fill="none" stroke="rgba(245,158,11,0.18)" strokeWidth={0.4} />
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const len = i % 4 === 0 ? 8 : 4;
          const x1 = Math.sin(angle) * 42;
          const y1 = -Math.cos(angle) * 42;
          const x2 = Math.sin(angle) * (42 - len);
          const y2 = -Math.cos(angle) * (42 - len);
          return (
            <G key={i}>
              <Polygon
                points={`${x1},${y1} ${x2},${y2} ${x1 + 0.1},${y1 + 0.1}`}
                stroke={journeyPalette.compassOrange}
                strokeWidth={i % 4 === 0 ? 1.4 : 0.5}
              />
            </G>
          );
        })}
      </Svg>
      <Animated.View style={[StyleSheet.absoluteFillObject, styles.center, {transform: [{rotate}]}]}>
        <Svg width={size} height={size} viewBox="-50 -50 100 100">
          <Polygon
            points="0,-34 5,0 0,34 -5,0"
            fill={journeyPalette.compassOrange}
            stroke="#fff"
            strokeWidth={0.6}
          />
          <Polygon points="0,-34 5,0 0,0" fill="#FBD08A" />
          <Circle cx="0" cy="0" r="3" fill="#fff" />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    backgroundColor: journeyPalette.routeGlow,
    shadowColor: journeyPalette.compassOrange,
    shadowOpacity: 0.7,
    shadowRadius: 30,
    shadowOffset: {width: 0, height: 0},
  },
  center: {alignItems: 'center', justifyContent: 'center'},
});

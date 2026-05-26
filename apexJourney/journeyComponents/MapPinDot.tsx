import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';
import {MapPin} from 'lucide-react-native';
import {journeyPalette} from '../journeyTheme/palette';

interface MapPinDotProps {
  x: number;
  y: number;
  delay: number;
  active: boolean;
  onPress: () => void;
}

export const MapPinDot: React.FC<MapPinDotProps> = ({x, y, delay, active, onPress}) => {
  const pulse = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(active ? 1.25 : 1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(pulse, {toValue: 1, duration: 1400, useNativeDriver: true}),
        Animated.timing(pulse, {toValue: 0, duration: 0, useNativeDriver: true}),
      ]),
    ).start();
  }, [pulse, delay]);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: active ? 1.3 : 1,
      useNativeDriver: true,
      friction: 6,
      tension: 110,
    }).start();
  }, [scale, active]);

  const ringScale = pulse.interpolate({inputRange: [0, 1], outputRange: [0.5, 2.4]});
  const ringOpacity = pulse.interpolate({inputRange: [0, 1], outputRange: [0.7, 0]});

  return (
    <View
      pointerEvents="box-none"
      style={[styles.absolute, {left: `${x * 100}%`, top: `${y * 100}%`}]}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.ring,
            {opacity: ringOpacity, transform: [{scale: ringScale}]},
          ]}
        />
        <Pressable onPress={onPress} hitSlop={8}>
          <Animated.View style={[styles.pinShadow, {transform: [{scale}]}]}>
            <MapPin size={26} color={journeyPalette.compassOrange} fill={journeyPalette.compassOrange} />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {position: 'absolute', width: 0, height: 0},
  center: {position: 'absolute', left: -16, top: -28, alignItems: 'center', justifyContent: 'center'},
  ring: {
    position: 'absolute',
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 1.5, borderColor: journeyPalette.compassOrange,
    backgroundColor: 'rgba(245,158,11,0.18)',
  },
  pinShadow: {
    shadowColor: journeyPalette.compassOrange,
    shadowOpacity: 0.9, shadowRadius: 6, shadowOffset: {width: 0, height: 2},
  },
});

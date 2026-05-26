import React from 'react';
import {Animated, Pressable, StyleSheet, Text, View, ViewStyle, TextStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  rightSlot?: React.ReactNode;
  leftSlot?: React.ReactNode;
  variant?: 'orange' | 'muted';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  onPress,
  disabled,
  style,
  textStyle,
  rightSlot,
  leftSlot,
  variant = 'orange',
}) => {
  const press = React.useRef(new Animated.Value(0)).current;
  const colors =
    variant === 'orange'
      ? [journeyPalette.compassOrange, journeyPalette.compassOrangeDeep]
      : [journeyPalette.archiveSoft, journeyPalette.archive];
  const scale = press.interpolate({inputRange: [0, 1], outputRange: [1, 0.97]});

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() =>
        Animated.timing(press, {toValue: 1, duration: 90, useNativeDriver: true}).start()
      }
      onPressOut={() =>
        Animated.timing(press, {toValue: 0, duration: 140, useNativeDriver: true}).start()
      }
      style={[styles.outer, disabled && styles.disabled, style]}>
      <Animated.View style={[styles.inner, {transform: [{scale}]}]}>
        <LinearGradient
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.row} pointerEvents="none">
          {leftSlot}
          <Text style={[styles.label, textStyle]} numberOfLines={1}>
            {label}
          </Text>
          {rightSlot}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outer: {
    alignSelf: 'stretch',
    borderRadius: journeyRadius.button,
  },
  inner: {
    borderRadius: journeyRadius.button,
    overflow: 'hidden',
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  disabled: {opacity: 0.5},
});

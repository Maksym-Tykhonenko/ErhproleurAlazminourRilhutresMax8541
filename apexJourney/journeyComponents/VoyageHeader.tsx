import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {journeyPalette} from '../journeyTheme/palette';

interface VoyageHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export const VoyageHeader: React.FC<VoyageHeaderProps> = ({title, subtitle, right}) => {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fade]);
  const translateY = fade.interpolate({inputRange: [0, 1], outputRange: [-8, 0]});
  return (
    <Animated.View style={[styles.wrap, {opacity: fade, transform: [{translateY}]}]}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 14,
    paddingBottom: 14,
    gap: 12,
  },
  title: {color: journeyPalette.textPrimary, fontSize: 28, fontWeight: '800', letterSpacing: 0.3},
  subtitle: {color: journeyPalette.textSecondary, fontSize: 13, marginTop: 4},
});

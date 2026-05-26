import React, {useEffect, useRef} from 'react';
import {Animated, Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';
import {GradientButton} from './GradientButton';

interface EmptyStateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  onCta: () => void;
  hero?: ImageSourcePropType;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
  hero,
}) => {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, {toValue: 1, duration: 420, useNativeDriver: true}).start();
  }, [fade]);
  const translateY = fade.interpolate({inputRange: [0, 1], outputRange: [12, 0]});
  return (
    <Animated.View style={[styles.wrap, {opacity: fade, transform: [{translateY}]}]}>
      <View style={styles.iconBubble}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{description}</Text>
      <GradientButton label={ctaLabel} onPress={onCta} style={styles.cta} />
      {hero ? <Image source={hero} style={styles.hero} resizeMode="contain" /> : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  iconBubble: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(245,158,11,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  title: {
    color: journeyPalette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 18,
  },
  body: {
    color: journeyPalette.textMuted,
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 28,
    lineHeight: 18,
  },
  cta: {marginTop: 18, alignSelf: 'center', paddingHorizontal: 28, minWidth: 200, borderRadius: journeyRadius.button},
  hero: {width: 220, height: 280, marginTop: 22},
});

import React, {useEffect, useRef} from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Bookmark, Share2} from 'lucide-react-native';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';
import {VoyagerEntry} from '../journeyData/voyagers';

interface StoryCardProps {
  voyager: VoyagerEntry;
  saved: boolean;
  index?: number;
  onOpen: () => void;
  onToggleSave: () => void;
  onShare: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  voyager,
  saved,
  index = 0,
  onOpen,
  onToggleSave,
  onShare,
}) => {
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 360,
      delay: Math.min(index, 8) * 35,
      useNativeDriver: true,
    }).start();
  }, [enter, index]);

  const translateY = enter.interpolate({inputRange: [0, 1], outputRange: [16, 0]});

  return (
    <Animated.View
      style={[styles.outer, {opacity: enter, transform: [{translateY}]}]}>
      <Pressable
        onPress={onOpen}
        style={({pressed}) => [
          styles.card,
          pressed && {transform: [{scale: 0.99}]},
        ]}>
        <Image source={voyager.image} style={styles.thumb} resizeMode="cover" />
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>
            {voyager.name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {voyager.subtitle}
          </Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={onToggleSave} hitSlop={10} style={styles.iconBtn}>
            <Bookmark
              size={18}
              color={saved ? journeyPalette.compassOrange : journeyPalette.textSecondary}
              fill={saved ? journeyPalette.compassOrange : 'transparent'}
            />
          </Pressable>
          <Pressable onPress={onShare} hitSlop={10} style={styles.iconBtn}>
            <Share2 size={18} color={journeyPalette.textSecondary} />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outer: {marginBottom: 12},
  card: {
    flexDirection: 'row',
    backgroundColor: journeyPalette.archive,
    borderRadius: journeyRadius.card,
    padding: 10,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: journeyPalette.outline,
  },
  thumb: {
    width: 58,
    height: 58,
    borderRadius: 12,
    backgroundColor: '#0c0805',
  },
  body: {flex: 1},
  name: {color: journeyPalette.textPrimary, fontSize: 15, fontWeight: '700'},
  subtitle: {color: journeyPalette.textMuted, fontSize: 12, marginTop: 4, lineHeight: 16},
  actions: {flexDirection: 'row', gap: 6},
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

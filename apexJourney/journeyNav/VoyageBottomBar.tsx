import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Book, HelpCircle, Gamepad2, Map, Bookmark, BarChart3} from 'lucide-react-native';
import {journeyPalette} from '../journeyTheme/palette';
import {BOTTOM_BAR_HEIGHT} from './voyageBottomBarConst';

export type VoyageTab = 'stories' | 'quiz' | 'challenge' | 'map' | 'saved' | 'scores';

interface VoyageBottomBarProps {
  active: VoyageTab;
  onChange: (tab: VoyageTab) => void;
}

const tabs: {key: VoyageTab; Icon: React.ComponentType<any>}[] = [
  {key: 'stories', Icon: Book},
  {key: 'quiz', Icon: HelpCircle},
  {key: 'challenge', Icon: Gamepad2},
  {key: 'map', Icon: Map},
  {key: 'saved', Icon: Bookmark},
  {key: 'scores', Icon: BarChart3},
];

export const VoyageBottomBar: React.FC<VoyageBottomBarProps> = ({active, onChange}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        {
          height: BOTTOM_BAR_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={styles.row}>
        {tabs.map(tab => (
          <BottomBarSlot
            key={tab.key}
            isActive={active === tab.key}
            Icon={tab.Icon}
            onPress={() => onChange(tab.key)}
          />
        ))}
      </View>
    </View>
  );
};

interface SlotProps {
  isActive: boolean;
  Icon: React.ComponentType<any>;
  onPress: () => void;
}

const BottomBarSlot: React.FC<SlotProps> = ({isActive, Icon, onPress}) => {
  const anim = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  useEffect(() => {
    Animated.spring(anim, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: true,
      friction: 6,
      tension: 110,
    }).start();
  }, [anim, isActive]);
  const scale = anim.interpolate({inputRange: [0, 1], outputRange: [1, 1.18]});
  const color = isActive ? journeyPalette.compassOrange : journeyPalette.textMuted;
  return (
    <Pressable onPress={onPress} style={styles.slot} hitSlop={6}>
      <Animated.View style={{transform: [{scale}]}}>
        <Icon size={22} color={color} />
      </Animated.View>
      {isActive ? <View style={styles.dot} /> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(16,10,6,0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(245,158,11,0.10)',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  slot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    marginTop: 4,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: journeyPalette.compassOrange,
  },
});

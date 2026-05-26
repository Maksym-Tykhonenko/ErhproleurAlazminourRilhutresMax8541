import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {X} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenShell} from '../journeyComponents/ScreenShell';
import {VoyageHeader} from '../journeyComponents/VoyageHeader';
import {MapPinDot} from '../journeyComponents/MapPinDot';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';
import {discoveryMarks, DiscoveryMark, getMarkVoyager} from '../journeyData/discoveryMarks';
import {BOTTOM_BAR_HEIGHT} from '../journeyNav/voyageBottomBarConst';

export const DiscoveryMapScreen: React.FC = () => {
  const [active, setActive] = useState<DiscoveryMark | null>(null);
  const [mapBox, setMapBox] = useState({w: 0, h: 0});
  const insets = useSafeAreaInsets();

  const onLayout = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;
    setMapBox({w: width, h: height});
  };

  return (
    <ScreenShell>
      <VoyageHeader title="World of Discovery" subtitle="Tap pins to explore historic discoveries" />

      <View
        style={[styles.mapFrame, {marginBottom: BOTTOM_BAR_HEIGHT + insets.bottom + 16}]}
        onLayout={onLayout}>
        <ImageBackground
          source={require('../../tuorsegemings/oldexplkatr.png')}
          resizeMode="cover"
          style={styles.mapImage}
          imageStyle={styles.mapImageInner}>
          {mapBox.w > 0
            ? discoveryMarks.map((mark, idx) => (
                <MapPinDot
                  key={mark.id}
                  x={mark.x}
                  y={mark.y}
                  delay={(idx % 6) * 220}
                  active={active?.id === mark.id}
                  onPress={() => setActive(mark)}
                />
              ))
            : null}
        </ImageBackground>

        {active ? (
          <DiscoveryFloatingCard
            mark={active}
            onClose={() => setActive(null)}
          />
        ) : null}
      </View>
    </ScreenShell>
  );
};

interface FloatingCardProps {
  mark: DiscoveryMark;
  onClose: () => void;
}

const DiscoveryFloatingCard: React.FC<FloatingCardProps> = ({mark, onClose}) => {
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    enter.setValue(0);
    Animated.spring(enter, {toValue: 1, useNativeDriver: true, friction: 7}).start();
  }, [enter, mark.id]);
  const translateY = enter.interpolate({inputRange: [0, 1], outputRange: [20, 0]});
  const voyager = getMarkVoyager(mark);

  return (
    <Animated.View
      style={[
        styles.cardWrap,
        {opacity: enter, transform: [{translateY}]},
      ]}>
      <View style={styles.cardInner}>
        <Image
          source={voyager?.image ?? require('../../tuorsegemings/mantiwhcompass.png')}
          style={styles.cardImage}
        />
        <View style={{flex: 1, paddingHorizontal: 12}}>
          <Text style={styles.cardTitle} numberOfLines={2}>{mark.title}</Text>
          <Text style={styles.cardExplorer}>{voyager?.name ?? mark.voyagerId}</Text>
        </View>
        <Pressable onPress={onClose} hitSlop={10} style={styles.cardClose}>
          <X size={14} color={journeyPalette.textPrimary} />
        </Pressable>
      </View>
      <Text style={styles.cardDate}>{mark.date}</Text>
      <Text style={styles.cardFacts}>{mark.facts}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mapFrame: {
    flex: 1,
    borderRadius: journeyRadius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: journeyPalette.outline,
    backgroundColor: '#0a0604',
    position: 'relative',
  },
  mapImage: {flex: 1},
  mapImageInner: {borderRadius: journeyRadius.card},
  cardWrap: {
    position: 'absolute',
    left: 14,
    right: 14,
    top: 16,
    backgroundColor: 'rgba(20,12,8,0.95)',
    borderRadius: journeyRadius.card,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.4)',
  },
  cardInner: {flexDirection: 'row', alignItems: 'center'},
  cardImage: {
    width: 48, height: 48, borderRadius: 10, backgroundColor: '#000',
  },
  cardTitle: {color: journeyPalette.textPrimary, fontWeight: '800', fontSize: 15},
  cardExplorer: {color: journeyPalette.compassOrange, fontSize: 12, fontWeight: '700', marginTop: 4},
  cardClose: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardDate: {color: journeyPalette.textMuted, fontSize: 11, fontWeight: '700', marginTop: 10, letterSpacing: 0.6},
  cardFacts: {color: journeyPalette.textPrimary, fontSize: 13, lineHeight: 19, marginTop: 6},
});

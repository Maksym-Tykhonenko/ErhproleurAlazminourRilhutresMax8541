import React, {useRef, useEffect} from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ChevronLeft, Bookmark, Share2} from 'lucide-react-native';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';
import {VoyagerEntry} from '../journeyData/voyagers';
import {useSavedVoyagers} from '../journeyState/useSavedVoyagers';
import {BOTTOM_BAR_HEIGHT} from '../journeyNav/voyageBottomBarConst';

interface StoryDetailScreenProps {
  voyager: VoyagerEntry;
  onBack: () => void;
}

export const StoryDetailScreen: React.FC<StoryDetailScreenProps> = ({voyager, onBack}) => {
  const insets = useSafeAreaInsets();
  const {isSaved, toggle} = useSavedVoyagers();
  const saved = isSaved(voyager.id);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {toValue: 1, duration: 360, useNativeDriver: true}).start();
  }, [fade]);

  const sharePress = () => {
    Share.share({
      title: voyager.name,
      message: `${voyager.name} — ${voyager.subtitle}\n\n${voyager.storyLong}`,
    }).catch(() => {});
  };

  const translateY = fade.interpolate({inputRange: [0, 1], outputRange: [12, 0]});

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Image source={voyager.image} style={styles.hero} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(11,7,4,0.10)', 'rgba(11,7,4,0.55)', 'rgba(11,7,4,0.95)']}
        style={styles.heroGradient}
      />
      <SafeAreaView style={styles.headerSafe} edges={['top']}>
        <Pressable
          onPress={onBack}
          style={styles.backBtn}
          hitSlop={10}>
          <ChevronLeft size={22} color="#fff" />
        </Pressable>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 250, paddingBottom: BOTTOM_BAR_HEIGHT + insets.bottom + 120}}>
        <Animated.View
          style={[
            styles.sheet,
            {opacity: fade, transform: [{translateY}]},
          ]}>
          <Text style={styles.years}>{voyager.years}</Text>
          <Text style={styles.title}>{voyager.name}</Text>
          <Text style={styles.subtitle}>{voyager.subtitle}</Text>

          <Text style={styles.body}>{voyager.storyLong}</Text>

          {voyager.discoveries.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Discoveries</Text>
              {voyager.discoveries.map((d, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{d}</Text>
                </View>
              ))}
            </View>
          )}

          {voyager.facts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interesting facts</Text>
              {voyager.facts.map((f, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{f}</Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <View
        style={[
          styles.floatingActions,
          {bottom: BOTTOM_BAR_HEIGHT + insets.bottom + 18},
        ]}
        pointerEvents="box-none">
        <DetailActionButton
          icon={
            <Bookmark
              size={18}
              color={saved ? '#fff' : journeyPalette.compassOrange}
              fill={saved ? '#fff' : 'transparent'}
            />
          }
          label={saved ? 'Saved' : 'Save'}
          onPress={() => toggle(voyager.id)}
          highlighted={saved}
        />
        <DetailActionButton
          icon={<Share2 size={18} color={journeyPalette.textPrimary} />}
          label="Share"
          onPress={sharePress}
        />
      </View>
    </View>
  );
};

interface DetailActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  highlighted?: boolean;
}

const DetailActionButton: React.FC<DetailActionButtonProps> = ({icon, label, onPress, highlighted}) => (
  <Pressable
    onPress={onPress}
    style={[styles.actionBtnOuter, highlighted && styles.actionBtnHighlight]}>
    {highlighted ? (
      <LinearGradient
        colors={[journeyPalette.compassOrange, journeyPalette.compassOrangeDeep]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />
    ) : null}
    <View style={styles.actionRow} pointerEvents="none">
      {icon}
      <Text style={[styles.actionLabel, highlighted && {color: '#fff'}]}>{label}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: journeyPalette.archiveDeep},
  hero: {position: 'absolute', top: 0, left: 0, right: 0, height: 400, width: '100%'},
  heroGradient: {position: 'absolute', top: 0, left: 0, right: 0, height: 400},
  headerSafe: {position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2},
  backBtn: {
    marginLeft: 14,
    marginTop: 6,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    backgroundColor: journeyPalette.archive,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 30,
    marginTop: -28,
  },
  years: {color: journeyPalette.compassOrange, fontWeight: '700', fontSize: 12, letterSpacing: 0.8},
  title: {color: journeyPalette.textPrimary, fontSize: 26, fontWeight: '800', marginTop: 6},
  subtitle: {color: journeyPalette.textSecondary, fontSize: 14, marginTop: 6, lineHeight: 20},
  body: {color: journeyPalette.textPrimary, fontSize: 14, lineHeight: 22, marginTop: 18},
  section: {marginTop: 22},
  sectionTitle: {color: journeyPalette.compassOrange, fontWeight: '700', fontSize: 13, letterSpacing: 0.8, marginBottom: 10},
  bulletRow: {flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8},
  bulletDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: journeyPalette.compassOrange, marginTop: 7, marginRight: 10},
  bulletText: {color: journeyPalette.textPrimary, fontSize: 14, lineHeight: 20, flex: 1},
  floatingActions: {
    position: 'absolute',
    left: 18,
    right: 18,
    flexDirection: 'row',
    gap: 10,
  },
  actionBtnOuter: {
    flex: 1,
    height: 48,
    borderRadius: journeyRadius.button,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnHighlight: {borderColor: 'transparent'},
  actionRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
  actionLabel: {color: journeyPalette.textPrimary, fontWeight: '700'},
});

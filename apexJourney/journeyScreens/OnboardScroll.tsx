import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronRight} from 'lucide-react-native';
import {GradientButton} from '../journeyComponents/GradientButton';
import {journeyPalette} from '../journeyTheme/palette';

const {width, height} = Dimensions.get('window');

interface OnboardScrollProps {
  onComplete: () => void;
}

interface Slide {
  bg: ImageSourcePropType;
  title: string;
  body: string;
}

const slides: Slide[] = [
  {
    bg: require('../../tuorsegemings/olardonbiranforgs/olsebrigans1.png'),
    title: 'Age of Exploration',
    body: 'Discover legendary navigators and historic sea expeditions.',
  },
  {
    bg: require('../../tuorsegemings/olardonbiranforgs/olsebrigans2.png'),
    title: 'Read Explorer Stories',
    body: 'Learn about famous voyages, discoveries, and world-changing journeys.',
  },
  {
    bg: require('../../tuorsegemings/olardonbiranforgs/olsebrigans3.png'),
    title: 'Explore the World Map',
    body: 'Open discovery locations and learn who reached them first.',
  },
  {
    bg: require('../../tuorsegemings/olardonbiranforgs/olsebrigans4.png'),
    title: 'Test Your Knowledge',
    body: 'Complete quizzes and reaction challenges inspired by history.',
  },
];

export const OnboardScroll: React.FC<OnboardScrollProps> = ({onComplete}) => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== page) setPage(next);
  };

  const goNext = () => {
    if (page === slides.length - 1) {
      onComplete();
    } else {
      scrollRef.current?.scrollTo({x: width * (page + 1), animated: true});
    }
  };

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        ref={scrollRef as any}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false, listener: handleScroll},
        )}
        scrollEventThrottle={16}>
        {slides.map((slide, idx) => {
          const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
          const titleTranslate = scrollX.interpolate({
            inputRange,
            outputRange: [40, 0, -40],
            extrapolate: 'clamp',
          });
          const titleOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });
          return (
            <View key={idx} style={styles.slide}>
              <Image source={slide.bg} style={styles.bg} resizeMode="cover" />
              <LinearGradient
                colors={['transparent', 'rgba(11,7,4,0.65)', 'rgba(11,7,4,0.95)']}
                style={StyleSheet.absoluteFill}
              />
              <SafeAreaView style={styles.content} edges={['top', 'bottom']}>
                <View style={styles.topRow}>
                  <Pressable hitSlop={10} onPress={onComplete}>
                    <Text style={styles.skip}>Skip</Text>
                  </Pressable>
                </View>
                <View style={styles.middle} />
                <Animated.View
                  style={[
                    styles.textBlock,
                    {opacity: titleOpacity, transform: [{translateY: titleTranslate}]},
                  ]}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.body}>{slide.body}</Text>
                </Animated.View>

                <View style={styles.bottomRow}>
                  <Pressable hitSlop={10} onPress={onComplete}>
                    <Text style={styles.skipBottom}>Skip</Text>
                  </Pressable>
                  <View style={styles.dots}>
                    {slides.map((_, dotIdx) => {
                      const dotInput = [(dotIdx - 1) * width, dotIdx * width, (dotIdx + 1) * width];
                      const dotWidth = scrollX.interpolate({
                        inputRange: dotInput,
                        outputRange: [8, 22, 8],
                        extrapolate: 'clamp',
                      });
                      const opacity = scrollX.interpolate({
                        inputRange: dotInput,
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                      });
                      return (
                        <Animated.View
                          key={dotIdx}
                          style={[styles.dot, {width: dotWidth, opacity}]}
                        />
                      );
                    })}
                  </View>
                  <GradientButton
                    label={idx === slides.length - 1 ? 'Start' : 'Next'}
                    onPress={goNext}
                    style={styles.cta}
                    rightSlot={<ChevronRight size={18} color="#fff" />}
                  />
                </View>
              </SafeAreaView>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#000'},
  slide: {width, height, backgroundColor: '#000'},
  bg: {position: 'absolute', width, height},
  content: {flex: 1, paddingHorizontal: 24},
  topRow: {flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8},
  skip: {color: journeyPalette.textPrimary, fontSize: 14, opacity: 0.7, padding: 8},
  skipBottom: {color: journeyPalette.textPrimary, fontSize: 14, paddingVertical: 8, opacity: 0.85},
  middle: {flex: 1},
  textBlock: {marginBottom: 18},
  title: {color: '#fff', fontSize: 30, fontWeight: '800', lineHeight: 36},
  body: {color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 10, lineHeight: 20},
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  dots: {flexDirection: 'row', alignItems: 'center', gap: 6, marginHorizontal: 8},
  dot: {height: 6, borderRadius: 4, backgroundColor: journeyPalette.compassOrange},
  cta: {flex: 0, paddingHorizontal: 22, alignSelf: 'flex-end', minWidth: 120},
});

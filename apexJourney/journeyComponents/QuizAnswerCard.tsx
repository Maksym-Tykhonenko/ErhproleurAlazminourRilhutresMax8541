import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text} from 'react-native';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';

type Status = 'idle' | 'correct' | 'wrong' | 'reveal-correct' | 'reveal-other';

interface QuizAnswerCardProps {
  label: string;
  status: Status;
  onPress: () => void;
  index: number;
}

export const QuizAnswerCard: React.FC<QuizAnswerCardProps> = ({label, status, onPress, index}) => {
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 280,
      delay: index * 60,
      useNativeDriver: true,
    }).start();
  }, [enter, index]);
  const translateY = enter.interpolate({inputRange: [0, 1], outputRange: [10, 0]});

  const isCorrect = status === 'correct' || status === 'reveal-correct';
  const isWrong = status === 'wrong';
  const disabled = status !== 'idle';

  const borderColor = isCorrect
    ? journeyPalette.positive
    : isWrong
    ? journeyPalette.negative
    : 'rgba(245,158,11,0.45)';
  const bg = isCorrect
    ? 'rgba(63,143,74,0.18)'
    : isWrong
    ? 'rgba(179,58,58,0.20)'
    : journeyPalette.archive;

  return (
    <Animated.View style={{opacity: enter, transform: [{translateY}]}}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={[styles.card, {borderColor, backgroundColor: bg}]}>
        <Text
          style={[
            styles.label,
            isCorrect && {color: '#A4E1B0'},
            isWrong && {color: '#F1B1B1'},
          ]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: journeyRadius.button,
    borderWidth: 1.2,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  label: {color: journeyPalette.textPrimary, fontSize: 15, fontWeight: '600'},
});

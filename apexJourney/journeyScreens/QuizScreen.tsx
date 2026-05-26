import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ChevronRight, X, Book, Trophy} from 'lucide-react-native';
import {ScreenShell} from '../journeyComponents/ScreenShell';
import {GradientButton} from '../journeyComponents/GradientButton';
import {QuizAnswerCard} from '../journeyComponents/QuizAnswerCard';
import {AnimatedCompass} from '../journeyComponents/AnimatedCompass';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';
import {pickQuizRound, QuizPrompt, QUIZ_LENGTH} from '../journeyData/quizSet';
import {useScoreLog} from '../journeyState/useScoreLog';

type Stage = 'intro' | 'question' | 'result' | 'confirm-exit';

export const QuizScreen: React.FC = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [round, setRound] = useState<QuizPrompt[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const {append} = useScoreLog('quiz');

  const begin = () => {
    setRound(pickQuizRound());
    setIdx(0);
    setScore(0);
    setPicked(null);
    setStage('question');
  };

  if (stage === 'intro') {
    return <QuizIntroBody onStart={begin} />;
  }

  if (stage === 'result') {
    return (
      <QuizResultBody
        score={score}
        total={QUIZ_LENGTH}
        onFinish={() => setStage('intro')}
      />
    );
  }

  const current = round[idx];
  if (!current) {
    return <ScreenShell><View /></ScreenShell>;
  }

  const handlePick = (option: string) => {
    if (picked) return;
    setPicked(option);
    const correct = option === current.answer;
    if (correct) setScore(s => s + 1);
  };

  const goNext = () => {
    if (idx >= QUIZ_LENGTH - 1) {
      const finalScore = score;
      append(finalScore, QUIZ_LENGTH);
      setStage('result');
    } else {
      setIdx(i => i + 1);
      setPicked(null);
    }
  };

  return (
    <QuizQuestionBody
      prompt={current}
      questionNumber={idx + 1}
      total={QUIZ_LENGTH}
      score={score}
      picked={picked}
      onPick={handlePick}
      onNext={goNext}
      onExit={() => setStage('confirm-exit')}
      showConfirmExit={stage === 'confirm-exit' as Stage}
      onCancelExit={() => setStage('question')}
      onConfirmExit={() => setStage('intro')}
    />
  );
};

const QuizIntroBody: React.FC<{onStart: () => void}> = ({onStart}) => (
  <ScreenShell scroll>
    <View style={styles.introWrap}>
      <View style={styles.introIcon}>
        <Book size={36} color={journeyPalette.compassOrange} />
      </View>
      <Text style={styles.introTitle}>Explorer Quiz</Text>
      <Text style={styles.introBody}>
        Test your knowledge about legendary explorers and their discoveries. Answer 10 questions based on the voyager stories.
      </Text>
      <GradientButton label="Start Quiz" onPress={onStart} style={{marginTop: 18, minWidth: 220, alignSelf: 'center'}} />
      <Image source={require('../../tuorsegemings/orloafdmnwibothk.png')} style={styles.introHero} resizeMode="contain" />
    </View>
  </ScreenShell>
);

interface QuizQuestionBodyProps {
  prompt: QuizPrompt;
  questionNumber: number;
  total: number;
  score: number;
  picked: string | null;
  onPick: (option: string) => void;
  onNext: () => void;
  onExit: () => void;
  showConfirmExit: boolean;
  onCancelExit: () => void;
  onConfirmExit: () => void;
}

const QuizQuestionBody: React.FC<QuizQuestionBodyProps> = ({
  prompt,
  questionNumber,
  total,
  score,
  picked,
  onPick,
  onNext,
  onExit,
  showConfirmExit,
  onCancelExit,
  onConfirmExit,
}) => {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, {toValue: 1, duration: 320, useNativeDriver: true}).start();
  }, [fade, prompt.id]);
  const translateY = fade.interpolate({inputRange: [0, 1], outputRange: [10, 0]});

  return (
    <ScreenShell scroll>
      <View style={styles.qHeaderRow}>
        <Pressable onPress={onExit} hitSlop={8} style={styles.qExitChip}>
          <X size={14} color={journeyPalette.textPrimary} />
          <Text style={styles.qHeaderText}>{`Question ${questionNumber}/${total}`}</Text>
        </Pressable>
        <Text style={styles.qScore}>{`Score: ${score}`}</Text>
      </View>

      <Animated.View style={{opacity: fade, transform: [{translateY}]}}>
        <Image source={require('../../tuorsegemings/oldexplkatr.png')} style={styles.qImage} resizeMode="cover" />
        <Text style={styles.qPrompt}>{prompt.question}</Text>

        <View style={{marginTop: 12}}>
          {prompt.options.map((option, oi) => {
            let status: 'idle' | 'correct' | 'wrong' | 'reveal-correct' | 'reveal-other' = 'idle';
            if (picked) {
              if (option === picked && option === prompt.answer) status = 'correct';
              else if (option === picked && option !== prompt.answer) status = 'wrong';
              else if (option === prompt.answer) status = 'reveal-correct';
            }
            return (
              <QuizAnswerCard
                key={`${prompt.id}-${oi}`}
                index={oi}
                label={option}
                status={status}
                onPress={() => onPick(option)}
              />
            );
          })}
        </View>

        {picked ? (
          <GradientButton
            label={questionNumber === total ? 'See Results' : 'Next Question'}
            onPress={onNext}
            rightSlot={<ChevronRight size={18} color="#fff" />}
            style={{marginTop: 6}}
          />
        ) : null}
      </Animated.View>

      {showConfirmExit ? (
        <ExitConfirmModal onCancel={onCancelExit} onConfirm={onConfirmExit} />
      ) : null}
    </ScreenShell>
  );
};

const QuizResultBody: React.FC<{score: number; total: number; onFinish: () => void}> = ({
  score,
  total,
  onFinish,
}) => {
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(enter, {toValue: 1, useNativeDriver: true, friction: 6}).start();
  }, [enter]);
  const scale = enter.interpolate({inputRange: [0, 1], outputRange: [0.6, 1]});

  return (
    <ScreenShell scroll>
      <View style={styles.resultWrap}>
        <View style={styles.introIcon}>
          <Trophy size={36} color={journeyPalette.compassOrange} />
        </View>
        <Text style={styles.resultTitle}>Quiz Complete!</Text>
        <Animated.Text style={[styles.resultScore, {transform: [{scale}]}]}>
          {`${score}/${total}`}
        </Animated.Text>
        <Text style={styles.introBody}>Keep learning about explorers!</Text>
        <GradientButton label="Finish" onPress={onFinish} style={{marginTop: 18, minWidth: 220, alignSelf: 'center'}} />
        <View style={{height: 12}} />
        <View style={styles.resultBottomCompass}>
          <AnimatedCompass size={120} glowing={false} />
        </View>
      </View>
    </ScreenShell>
  );
};

interface ExitConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({onCancel, onConfirm}) => (
  <View style={styles.modalOverlay} pointerEvents="auto">
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Exit Quiz?</Text>
      <Text style={styles.modalBody}>Your progress will be lost if you exit now.</Text>
      <View style={styles.modalRow}>
        <Pressable onPress={onCancel} style={[styles.modalBtn, styles.modalCancel]}>
          <Text style={styles.modalCancelText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={onConfirm} style={[styles.modalBtn, styles.modalConfirm]}>
          <Text style={styles.modalConfirmText}>Exit</Text>
        </Pressable>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  introWrap: {flex: 1, alignItems: 'center', paddingTop: 20},
  introIcon: {
    width: 78,
    height: 78,
    borderRadius: 40,
    backgroundColor: 'rgba(245,158,11,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introTitle: {color: journeyPalette.textPrimary, fontSize: 22, fontWeight: '800', marginTop: 16},
  introBody: {
    color: journeyPalette.textMuted,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 22,
    marginTop: 10,
    lineHeight: 18,
  },
  introHero: {marginTop: 22, width: 260, height: 320},
  qHeaderRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: 16},
  qExitChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 8,
  },
  qHeaderText: {color: journeyPalette.textPrimary, fontWeight: '600', fontSize: 12},
  qScore: {color: journeyPalette.compassOrange, fontWeight: '800', fontSize: 14},
  qImage: {width: '100%', height: 180, borderRadius: journeyRadius.card, backgroundColor: '#0c0805'},
  qPrompt: {color: journeyPalette.textPrimary, fontSize: 19, fontWeight: '700', marginTop: 14, lineHeight: 26},
  resultWrap: {flex: 1, alignItems: 'center', paddingTop: 30},
  resultTitle: {color: journeyPalette.textPrimary, fontSize: 22, fontWeight: '800', marginTop: 14},
  resultScore: {color: journeyPalette.compassOrange, fontSize: 56, fontWeight: '900', marginTop: 8},
  resultBottomCompass: {marginTop: 20, alignSelf: 'center'},
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '82%',
    backgroundColor: '#1F1611',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: journeyPalette.outlineSoft,
  },
  modalTitle: {color: journeyPalette.textPrimary, fontWeight: '800', fontSize: 17, textAlign: 'center'},
  modalBody: {color: journeyPalette.textMuted, textAlign: 'center', marginTop: 8, fontSize: 13, lineHeight: 18},
  modalRow: {flexDirection: 'row', marginTop: 18, gap: 10},
  modalBtn: {flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center'},
  modalCancel: {backgroundColor: 'rgba(255,255,255,0.08)'},
  modalConfirm: {backgroundColor: journeyPalette.negative},
  modalCancelText: {color: journeyPalette.textPrimary, fontWeight: '700'},
  modalConfirmText: {color: '#fff', fontWeight: '700'},
});

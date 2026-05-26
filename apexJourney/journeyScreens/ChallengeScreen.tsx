import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Pause, Play, Target, Flag} from 'lucide-react-native';
import {ScreenShell} from '../journeyComponents/ScreenShell';
import {GradientButton} from '../journeyComponents/GradientButton';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';
import {VoyagerEntry} from '../journeyData/voyagers';
import {challengeRoster, ChallengeRule, pickChallengeRule} from '../journeyData/challengeRules';
import {useScoreLog} from '../journeyState/useScoreLog';

type Stage = 'intro' | 'playing' | 'paused' | 'over';

interface Faller {
  key: number;
  voyager: VoyagerEntry;
  anim: Animated.Value;
  x: number;
  duration: number;
  size: number;
}

const FALLER_SIZE = 64;

export const ChallengeScreen: React.FC = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [score, setScore] = useState(0);
  const [rule, setRule] = useState<ChallengeRule>(pickChallengeRule());
  const [fallers, setFallers] = useState<Faller[]>([]);
  const [areaSize, setAreaSize] = useState({w: Dimensions.get('window').width - 36, h: 380});
  const baseSpeedRef = useRef(4200);
  const keyRef = useRef(0);
  const spawnTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stageRef = useRef<Stage>('intro');
  const scoreRef = useRef(0);
  const ruleRef = useRef<ChallengeRule>(rule);
  const {append} = useScoreLog('challenge');

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    ruleRef.current = rule;
  }, [rule]);

  const stopGame = useCallback(() => {
    if (spawnTimer.current) {
      clearInterval(spawnTimer.current);
      spawnTimer.current = null;
    }
  }, []);

  const handleAreaLayout = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;
    setAreaSize({w: width, h: height});
  };

  const spawnFaller = useCallback(() => {
    const voyager = challengeRoster[Math.floor(Math.random() * challengeRoster.length)];
    const w = Math.max(1, areaSize.w - FALLER_SIZE);
    const x = Math.random() * w;
    const anim = new Animated.Value(0);
    const id = ++keyRef.current;
    const faller: Faller = {
      key: id,
      voyager,
      anim,
      x,
      duration: baseSpeedRef.current,
      size: FALLER_SIZE,
    };
    setFallers(prev => [...prev, faller]);
    Animated.timing(anim, {
      toValue: 1,
      duration: baseSpeedRef.current,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (!finished) return;
      setFallers(prev => prev.filter(f => f.key !== id));
    });
  }, [areaSize.w]);

  const beginGame = () => {
    keyRef.current = 0;
    baseSpeedRef.current = 4200;
    setScore(0);
    setFallers([]);
    const fresh = pickChallengeRule();
    setRule(fresh);
    ruleRef.current = fresh;
    setStage('playing');
  };

  useEffect(() => {
    if (stage === 'playing') {
      if (spawnTimer.current) clearInterval(spawnTimer.current);
      spawnTimer.current = setInterval(() => {
        if (stageRef.current === 'playing') spawnFaller();
      }, 850);
      spawnFaller();
      return () => stopGame();
    } else {
      stopGame();
    }
  }, [stage, spawnFaller, stopGame]);

  const handleEndGame = useCallback(() => {
    stopGame();
    const finalScore = scoreRef.current;
    append(finalScore);
    setStage('over');
  }, [append, stopGame]);

  const handleTap = (f: Faller) => {
    if (stageRef.current !== 'playing') return;
    const shouldTap = ruleRef.current.predicate(f.voyager);
    if (shouldTap) {
      const next = scoreRef.current + 1;
      scoreRef.current = next;
      setScore(next);
      setFallers(prev => prev.filter(item => item.key !== f.key));
      if (next > 0 && next % 5 === 0) {
        baseSpeedRef.current = Math.max(1300, baseSpeedRef.current - 350);
        const nextRule = pickChallengeRule(ruleRef.current.id);
        ruleRef.current = nextRule;
        setRule(nextRule);
      }
    } else {
      handleEndGame();
    }
  };

  if (stage === 'intro') {
    return <ChallengeIntroBody onStart={beginGame} />;
  }
  if (stage === 'over') {
    return <ChallengeOverBody score={score} onPlayAgain={beginGame} />;
  }

  return (
    <ChallengeGameBody
      score={score}
      rule={rule}
      paused={stage === 'paused'}
      onPauseToggle={() => setStage(s => (s === 'playing' ? 'paused' : 'playing'))}
      onAreaLayout={handleAreaLayout}
      areaSize={areaSize}
      fallers={fallers}
      onTap={handleTap}
    />
  );
};

const ChallengeIntroBody: React.FC<{onStart: () => void}> = ({onStart}) => (
  <ScreenShell scroll>
    <View style={styles.introWrap}>
      <View style={styles.introIcon}>
        <Target size={36} color={journeyPalette.compassOrange} />
      </View>
      <Text style={styles.introTitle}>Explorer Challenge</Text>
      <Text style={styles.introBody}>
        Tap falling explorers based on changing conditions. Speed increases every 5 correct taps. One wrong tap ends the game!
      </Text>
      <GradientButton label="Play Game" onPress={onStart} style={{marginTop: 18, minWidth: 220, alignSelf: 'center'}} />
      <Image source={require('../../tuorsegemings/altpirsns.png')} style={styles.introHero} resizeMode="contain" />
    </View>
  </ScreenShell>
);

const ChallengeOverBody: React.FC<{score: number; onPlayAgain: () => void}> = ({score, onPlayAgain}) => {
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(enter, {toValue: 1, useNativeDriver: true, friction: 6}).start();
  }, [enter]);
  const scale = enter.interpolate({inputRange: [0, 1], outputRange: [0.6, 1]});
  return (
    <ScreenShell scroll>
      <View style={styles.introWrap}>
        <View style={styles.introIcon}>
          <Flag size={36} color={journeyPalette.compassOrange} />
        </View>
        <Text style={styles.introTitle}>Game Over!</Text>
        <Animated.Text style={[styles.scoreBig, {transform: [{scale}]}]}>{score}</Animated.Text>
        <Text style={styles.introBody}>Final Score</Text>
        <GradientButton label="Play Again" onPress={onPlayAgain} style={{marginTop: 18, minWidth: 220, alignSelf: 'center'}} />
        <Image source={require('../../tuorsegemings/mantiwhcompass.png')} style={styles.introHero} resizeMode="contain" />
      </View>
    </ScreenShell>
  );
};

interface ChallengeGameBodyProps {
  score: number;
  rule: ChallengeRule;
  paused: boolean;
  onPauseToggle: () => void;
  onAreaLayout: (e: LayoutChangeEvent) => void;
  areaSize: {w: number; h: number};
  fallers: Faller[];
  onTap: (f: Faller) => void;
}

const ChallengeGameBody: React.FC<ChallengeGameBodyProps> = ({
  score,
  rule,
  paused,
  onPauseToggle,
  onAreaLayout,
  areaSize,
  fallers,
  onTap,
}) => {
  return (
    <ScreenShell>
      <View style={styles.gameTopRow}>
        <Pressable onPress={onPauseToggle} style={styles.pauseBtn} hitSlop={8}>
          {paused ? (
            <Play size={16} color={journeyPalette.compassOrange} fill={journeyPalette.compassOrange} />
          ) : (
            <Pause size={16} color={journeyPalette.compassOrange} fill={journeyPalette.compassOrange} />
          )}
        </Pressable>
        <Text style={styles.gameScore}>{score}</Text>
      </View>

      <View style={styles.ruleChip}>
        <Text style={styles.ruleText}>{rule.copy}</Text>
      </View>

      <View style={styles.gameArea} onLayout={onAreaLayout}>
        {fallers.map(f => {
          const translateY = f.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-FALLER_SIZE, Math.max(120, areaSize.h - FALLER_SIZE / 2)],
          });
          return (
            <Animated.View
              key={f.key}
              style={[
                styles.faller,
                {
                  left: f.x,
                  width: f.size,
                  height: f.size,
                  transform: [{translateY}],
                },
              ]}>
              <Pressable onPress={() => onTap(f)} style={styles.fallerPress}>
                <Image source={f.voyager.image} style={styles.fallerImg} />
              </Pressable>
            </Animated.View>
          );
        })}

        {paused ? (
          <View style={styles.pauseOverlay} pointerEvents="auto">
            <Text style={styles.pauseTitle}>Paused</Text>
          </View>
        ) : null}
      </View>
    </ScreenShell>
  );
};

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
  introBody: {color: journeyPalette.textMuted, fontSize: 13, textAlign: 'center', paddingHorizontal: 22, marginTop: 10, lineHeight: 18},
  introHero: {marginTop: 22, width: 280, height: 320},
  scoreBig: {color: journeyPalette.compassOrange, fontSize: 56, fontWeight: '900', marginTop: 8},

  gameTopRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6},
  pauseBtn: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
  gameScore: {color: journeyPalette.compassOrange, fontSize: 22, fontWeight: '800'},
  ruleChip: {
    marginTop: 12, alignSelf: 'flex-start', paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: 999, backgroundColor: journeyPalette.compassOrange,
  },
  ruleText: {color: '#1B1410', fontWeight: '800', fontSize: 13.5},
  gameArea: {
    flex: 1, marginTop: 14, backgroundColor: journeyPalette.archive,
    borderRadius: journeyRadius.card, overflow: 'hidden',
    borderWidth: 1, borderColor: journeyPalette.outline,
  },
  faller: {position: 'absolute'},
  fallerPress: {
    width: '100%', height: '100%',
    borderRadius: 999, backgroundColor: '#0a0604',
    borderWidth: 1.5, borderColor: 'rgba(245,158,11,0.4)',
    overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
  },
  fallerImg: {width: '100%', height: '100%'},
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11,7,4,0.85)',
    alignItems: 'center', justifyContent: 'center',
  },
  pauseTitle: {color: journeyPalette.textPrimary, fontWeight: '800', fontSize: 24, letterSpacing: 1},
});

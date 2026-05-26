import React, {useEffect, useRef, useState} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Trophy, Target} from 'lucide-react-native';
import {ScreenShell} from '../journeyComponents/ScreenShell';
import {VoyageHeader} from '../journeyComponents/VoyageHeader';
import {EmptyStateCard} from '../journeyComponents/EmptyStateCard';
import {journeyPalette, journeyRadius} from '../journeyTheme/palette';
import {ScoreEntry, useScoreLog} from '../journeyState/useScoreLog';

type Tab = 'quiz' | 'game';

interface ScoresScreenProps {
  onGoQuiz: () => void;
  onGoGame: () => void;
}

export const ScoresScreen: React.FC<ScoresScreenProps> = ({onGoQuiz, onGoGame}) => {
  const [tab, setTab] = useState<Tab>('quiz');
  const quiz = useScoreLog('quiz');
  const challenge = useScoreLog('challenge');
  const entries = tab === 'quiz' ? quiz.entries : challenge.entries;

  return (
    <ScreenShell scroll>
      <VoyageHeader title="Your Results" />
      <ScoreTabs tab={tab} onChange={setTab} />
      {entries.length === 0 ? (
        tab === 'quiz' ? (
          <EmptyStateCard
            icon={<Trophy size={36} color={journeyPalette.compassOrange} />}
            title="No Quiz Results"
            description="Take a quiz to see your results here."
            ctaLabel="Start Quiz"
            onCta={onGoQuiz}
            hero={require('../../tuorsegemings/mantiwhcompass.png')}
          />
        ) : (
          <EmptyStateCard
            icon={<Target size={36} color={journeyPalette.compassOrange} />}
            title="No Game Results"
            description="Play the game to see your scores here."
            ctaLabel="Play Game"
            onCta={onGoGame}
            hero={require('../../tuorsegemings/mantiwhcompass.png')}
          />
        )
      ) : (
        <View style={{paddingTop: 8}}>
          {entries.map((entry, idx) => (
            <ScoreRow key={entry.id} entry={entry} index={idx} kind={tab} />
          ))}
        </View>
      )}
    </ScreenShell>
  );
};

interface ScoreTabsProps {
  tab: Tab;
  onChange: (next: Tab) => void;
}

const ScoreTabs: React.FC<ScoreTabsProps> = ({tab, onChange}) => {
  return (
    <View style={styles.tabsRow}>
      {(['quiz', 'game'] as Tab[]).map(key => {
        const active = tab === key;
        return (
          <Pressable
            key={key}
            onPress={() => onChange(key)}
            style={[styles.tabBtn, active && styles.tabBtnActive]}>
            {active ? (
              <LinearGradient
                colors={[journeyPalette.compassOrange, journeyPalette.compassOrangeDeep]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={StyleSheet.absoluteFill}
              />
            ) : null}
            <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
              {key === 'quiz' ? 'Quiz' : 'Game'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

interface ScoreRowProps {
  entry: ScoreEntry;
  index: number;
  kind: Tab;
}

const ScoreRow: React.FC<ScoreRowProps> = ({entry, index, kind}) => {
  const enter = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 320,
      delay: Math.min(index, 8) * 40,
      useNativeDriver: true,
    }).start();
  }, [enter, index]);
  const translateY = enter.interpolate({inputRange: [0, 1], outputRange: [12, 0]});
  const formatted = formatDate(entry.recordedAt);
  return (
    <Animated.View style={[styles.row, {opacity: enter, transform: [{translateY}]}]}>
      <View style={{flex: 1}}>
        <Text style={styles.rowDate}>{formatted}</Text>
        <Text style={styles.rowScore}>
          Score: <Text style={styles.rowScoreNum}>{entry.total ? `${entry.score}/${entry.total}` : entry.score}</Text>
        </Text>
      </View>
      <View style={styles.rowIcon}>
        {kind === 'quiz' ? (
          <Trophy size={18} color={journeyPalette.compassOrange} />
        ) : (
          <Target size={18} color={journeyPalette.compassOrange} />
        )}
      </View>
    </Animated.View>
  );
};

const formatDate = (ts: number) => {
  const d = new Date(ts);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const hours24 = d.getHours();
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${hours12}:${minutes} ${ampm}`;
};

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: journeyPalette.archive,
    borderRadius: journeyRadius.button,
    padding: 4,
    marginTop: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: journeyPalette.outline,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: journeyRadius.button - 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabBtnActive: {},
  tabLabel: {color: journeyPalette.textSecondary, fontWeight: '700', fontSize: 14},
  tabLabelActive: {color: '#fff'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: journeyPalette.archive,
    borderRadius: journeyRadius.card,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: journeyPalette.outline,
  },
  rowDate: {color: journeyPalette.textMuted, fontSize: 12},
  rowScore: {color: journeyPalette.textPrimary, fontSize: 15, fontWeight: '700', marginTop: 4},
  rowScoreNum: {color: journeyPalette.compassOrange, fontWeight: '900'},
  rowIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(245,158,11,0.16)',
    alignItems: 'center', justifyContent: 'center',
  },
});

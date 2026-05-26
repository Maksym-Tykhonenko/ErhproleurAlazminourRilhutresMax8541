import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from './StorageKeys';

export interface ScoreEntry {
  id: string;
  score: number;
  total?: number;
  recordedAt: number;
}

export type ScoreLogKind = 'quiz' | 'challenge';

const storageKeyOf = (kind: ScoreLogKind) =>
  kind === 'quiz' ? StorageKeys.quizScores : StorageKeys.challengeScores;

export const useScoreLog = (kind: ScoreLogKind) => {
  const [entries, setEntries] = useState<ScoreEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(storageKeyOf(kind)).then(raw => {
      if (!alive) return;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setEntries(parsed);
          }
        } catch {}
      }
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, [kind]);

  const append = useCallback(
    async (score: number, total?: number) => {
      const entry: ScoreEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        score,
        total,
        recordedAt: Date.now(),
      };
      const next = [entry, ...entries].slice(0, 50);
      setEntries(next);
      await AsyncStorage.setItem(storageKeyOf(kind), JSON.stringify(next));
    },
    [kind, entries],
  );

  return {entries, ready, append};
};

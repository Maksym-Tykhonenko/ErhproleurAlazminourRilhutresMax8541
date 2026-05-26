import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from './StorageKeys';

export const useSavedVoyagers = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(StorageKeys.savedVoyagerIds).then(raw => {
      if (!alive) return;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setSavedIds(parsed.filter(x => typeof x === 'string'));
        } catch {}
      }
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const persist = useCallback(async (next: string[]) => {
    setSavedIds(next);
    await AsyncStorage.setItem(StorageKeys.savedVoyagerIds, JSON.stringify(next));
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggle = useCallback(
    (id: string) => {
      const next = savedIds.includes(id) ? savedIds.filter(x => x !== id) : [...savedIds, id];
      persist(next);
    },
    [savedIds, persist],
  );

  const remove = useCallback(
    (id: string) => {
      persist(savedIds.filter(x => x !== id));
    },
    [savedIds, persist],
  );

  return {savedIds, ready, isSaved, toggle, remove};
};

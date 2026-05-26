import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from './StorageKeys';

export const useOnboardingGate = () => {
  const [resolved, setResolved] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(StorageKeys.onboardingComplete).then(raw => {
      if (!alive) return;
      setOnboardingDone(raw === '1');
      setResolved(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const finishOnboarding = useCallback(async () => {
    setOnboardingDone(true);
    await AsyncStorage.setItem(StorageKeys.onboardingComplete, '1');
  }, []);

  return {resolved, onboardingDone, finishOnboarding};
};

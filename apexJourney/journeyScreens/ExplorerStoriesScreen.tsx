import React, {useMemo} from 'react';
import {Share, View} from 'react-native';
import {ScreenShell} from '../journeyComponents/ScreenShell';
import {VoyageHeader} from '../journeyComponents/VoyageHeader';
import {StoryCard} from '../journeyComponents/StoryCard';
import {voyagerArchive, VoyagerEntry} from '../journeyData/voyagers';
import {useSavedVoyagers} from '../journeyState/useSavedVoyagers';

interface ExplorerStoriesScreenProps {
  onOpenVoyager: (voyager: VoyagerEntry) => void;
}

export const ExplorerStoriesScreen: React.FC<ExplorerStoriesScreenProps> = ({onOpenVoyager}) => {
  const {isSaved, toggle, ready} = useSavedVoyagers();

  const ordered = useMemo(() => {
    if (!ready) return voyagerArchive;
    return [...voyagerArchive].sort((a, b) => {
      const sa = isSaved(a.id) ? 0 : 1;
      const sb = isSaved(b.id) ? 0 : 1;
      return sa - sb;
    });
  }, [isSaved, ready]);

  const shareVoyager = (voyager: VoyagerEntry) => {
    Share.share({
      title: voyager.name,
      message: `${voyager.name} — ${voyager.subtitle}\n\n${voyager.preview}`,
    }).catch(() => {});
  };

  return (
    <ScreenShell scroll>
      <VoyageHeader title="Explorer Stories" subtitle="Tap a navigator to read the full voyage" />
      <View style={{paddingTop: 4}}>
        {ordered.map((voyager, idx) => (
          <StoryCard
            key={voyager.id}
            voyager={voyager}
            saved={isSaved(voyager.id)}
            index={idx}
            onOpen={() => onOpenVoyager(voyager)}
            onToggleSave={() => toggle(voyager.id)}
            onShare={() => shareVoyager(voyager)}
          />
        ))}
      </View>
    </ScreenShell>
  );
};

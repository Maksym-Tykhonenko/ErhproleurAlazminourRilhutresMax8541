import React from 'react';
import {Share, View} from 'react-native';
import {Book} from 'lucide-react-native';
import {ScreenShell} from '../journeyComponents/ScreenShell';
import {VoyageHeader} from '../journeyComponents/VoyageHeader';
import {StoryCard} from '../journeyComponents/StoryCard';
import {EmptyStateCard} from '../journeyComponents/EmptyStateCard';
import {voyagerArchive, VoyagerEntry} from '../journeyData/voyagers';
import {useSavedVoyagers} from '../journeyState/useSavedVoyagers';
import {journeyPalette} from '../journeyTheme/palette';

interface SavedScreenProps {
  onOpenVoyager: (voyager: VoyagerEntry) => void;
  onGoStories: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({onOpenVoyager, onGoStories}) => {
  const {savedIds, ready, isSaved, toggle} = useSavedVoyagers();

  const savedList = ready
    ? voyagerArchive.filter(v => savedIds.includes(v.id))
    : [];

  const shareVoyager = (voyager: VoyagerEntry) => {
    Share.share({
      title: voyager.name,
      message: `${voyager.name} — ${voyager.subtitle}\n\n${voyager.preview}`,
    }).catch(() => {});
  };

  if (ready && savedList.length === 0) {
    return (
      <ScreenShell>
        <VoyageHeader title="Saved" />
        <EmptyStateCard
          icon={<Book size={36} color={journeyPalette.compassOrange} />}
          title="No Saved Articles"
          description="Save explorer stories to read them later."
          ctaLabel="Explore Articles"
          onCta={onGoStories}
          hero={require('../../tuorsegemings/mantiwhcompass.png')}
        />
      </ScreenShell>
    );
  }

  return (
    <ScreenShell scroll>
      <VoyageHeader title="Saved" subtitle={`${savedList.length} voyage${savedList.length === 1 ? '' : 's'} bookmarked`} />
      <View style={{paddingTop: 4}}>
        {savedList.map((voyager, idx) => (
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

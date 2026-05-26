import React from 'react';
import {ScrollView, StyleSheet, View, ViewStyle, StatusBar} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {journeyPalette} from '../journeyTheme/palette';
import {BOTTOM_BAR_HEIGHT} from '../journeyNav/voyageBottomBarConst';

interface ScreenShellProps {
  children: React.ReactNode;
  scroll?: boolean;
  hideBottomPadding?: boolean;
  contentStyle?: ViewStyle;
  topPadding?: number;
}

export const ScreenShell: React.FC<ScreenShellProps> = ({
  children,
  scroll = false,
  hideBottomPadding,
  contentStyle,
  topPadding = 0,
}) => {
  const insets = useSafeAreaInsets();
  const bottomPad = hideBottomPadding ? 0 : BOTTOM_BAR_HEIGHT + insets.bottom + 24;

  const Body = (
    <View style={[styles.body, {paddingTop: topPadding}, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={journeyPalette.archiveDeep} />
      <LinearGradient
        colors={[journeyPalette.archiveDeep, journeyPalette.archive, '#100A07']}
        style={StyleSheet.absoluteFill}
      />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scroll, {paddingBottom: bottomPad}]}
          keyboardShouldPersistTaps="handled">
          {Body}
        </ScrollView>
      ) : (
        <View style={[styles.flex, {paddingBottom: bottomPad}]}>{Body}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: journeyPalette.archiveDeep},
  flex: {flex: 1},
  scroll: {flexGrow: 1},
  body: {flex: 1, paddingHorizontal: 18},
});

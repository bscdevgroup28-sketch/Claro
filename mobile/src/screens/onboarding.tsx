import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppStore } from '../context/AppProvider';
import { REGIONS } from '../data/regions';
import { getCopy, languages } from '../data/translations';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';

export function LanguageSelectionScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'LanguageSelection'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.languageTitle} subtitle={text.languageSubtitle}>
      {languages.map((option) => {
        const selected = state.selectedLanguage === option.code;

        return (
          <Pressable
            key={option.code}
            onPress={() => {
              actions.setLanguage(option.code);
              navigation.replace('WelcomeAndBoundaries');
            }}
            accessibilityRole="button"
            accessibilityLabel={`${option.nativeLabel} — ${option.englishLabel}`}
            style={({ pressed }) => [
              styles.languageCard,
              {
                borderColor: selected ? theme.colors.primary : theme.colors.border,
                backgroundColor: selected ? theme.colors.primarySoft : theme.colors.surface,
                opacity: pressed ? 0.92 : 1,
              },
            ]}
          >
            <Text style={styles.languageName}>{option.nativeLabel}</Text>
            <Text style={styles.languageMeta}>{option.englishLabel}</Text>
            <Text style={styles.languageHint}>{option.hint}</Text>
          </Pressable>
        );
      })}
    </ScreenLayout>
  );
}

export function WelcomeAndBoundariesScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'WelcomeAndBoundaries'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.welcomeTitle} subtitle={text.welcomeBody}>
      <SurfaceCard tone="accent" eyebrow={text.localOnly}>
        <Text style={styles.bodyText}>{text.boundaryLocal}</Text>
      </SurfaceCard>
      <SurfaceCard tone="warning" eyebrow={text.appAbout}>
        <Text style={styles.bodyText}>{text.boundaryLawyer}</Text>
      </SurfaceCard>
      <SurfaceCard eyebrow={text.trustedHelp}>
        <Text style={styles.bodyText}>{text.routeWarning}</Text>
      </SurfaceCard>
      <View style={styles.buttonStack}>
        <ActionButton
          label={text.continue}
          onPress={() => {
            navigation.navigate('RegionSelection');
          }}
        />
      </View>
    </ScreenLayout>
  );
}

export function RegionSelectionScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'RegionSelection'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.regionTitle} subtitle={text.regionSubtitle}>
      {REGIONS.map((region) => (
        <Pressable
          key={region.id}
          onPress={() => {
            actions.setRegion(region.label);
            actions.completeOnboarding();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }}
          accessibilityRole="button"
          accessibilityLabel={region.label}
          style={({ pressed }) => [
            styles.languageCard,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              opacity: pressed ? 0.92 : 1,
            },
          ]}
        >
          <Text style={styles.languageName}>{region.label}</Text>
        </Pressable>
      ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  languageCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  languageName: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  languageMeta: {
    color: theme.colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
  },
  languageHint: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  bodyText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonStack: {
    gap: theme.spacing.sm,
  },
});
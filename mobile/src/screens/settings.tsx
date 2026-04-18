import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppStore } from '../context/AppProvider';
import { getCopy, languages } from '../data/translations';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';

export function SettingsHomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SettingsHome'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout
      title={text.settingsTitle}
      subtitle={text.settingsSubtitle}
      navigation={navigation}
      currentMainScreen="SettingsHome"
    >
      <SurfaceCard title={text.languageSettings}>
        <ActionButton label={text.languageSettings} variant="secondary" onPress={() => navigation.navigate('LanguageSettings')} />
      </SurfaceCard>
      <SurfaceCard title={text.safetyPrivacy}>
        <ActionButton label={text.safetyPrivacy} variant="secondary" onPress={() => navigation.navigate('SafetyPrivacy')} />
      </SurfaceCard>
      <SurfaceCard title={text.contentFreshness}>
        <ActionButton label={text.contentFreshness} variant="secondary" onPress={() => navigation.navigate('ContentFreshness')} />
      </SurfaceCard>
      <SurfaceCard title={text.appAbout}>
        <ActionButton label={text.appAbout} variant="secondary" onPress={() => navigation.navigate('AppAbout')} />
      </SurfaceCard>
      <SurfaceCard tone="danger" title={text.fullWipe}>
        <ActionButton label={text.fullWipe} variant="danger" onPress={() => navigation.navigate('FullWipe')} />
      </SurfaceCard>
    </ScreenLayout>
  );
}

export function LanguageSettingsScreen() {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.languageSettings} subtitle={text.languageSubtitle}>
      {languages.map((option) => (
        <SurfaceCard
          key={option.code}
          tone={state.selectedLanguage === option.code ? 'accent' : 'default'}
          title={option.nativeLabel}
          eyebrow={option.englishLabel}
        >
          <ActionButton label={option.nativeLabel} variant="secondary" onPress={() => actions.setLanguage(option.code)} />
        </SurfaceCard>
      ))}
    </ScreenLayout>
  );
}

export function SafetyPrivacyScreen() {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.safetyPrivacy} subtitle={text.routeWarning}>
      <SurfaceCard tone="accent" eyebrow={text.localOnly}>
        <Text style={styles.bodyText}>{text.boundaryLocal}</Text>
      </SurfaceCard>
      <SurfaceCard tone="warning" eyebrow={text.appAbout}>
        <Text style={styles.bodyText}>{text.boundaryLawyer}</Text>
      </SurfaceCard>
    </ScreenLayout>
  );
}

export function ContentFreshnessScreen() {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.contentFreshness} subtitle={text.freshnessBody}>
      <SurfaceCard tone="accent" eyebrow={text.updated}>
        <Text style={styles.bodyText}>Referral demo bundle: 2026-04-15</Text>
        <Text style={styles.bodyText}>Explanation demo bundle: 2026-04-15</Text>
      </SurfaceCard>
    </ScreenLayout>
  );
}

export function AppAboutScreen() {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.appAbout} subtitle={text.aboutBody}>
      <SurfaceCard tone="accent" eyebrow={text.appName}>
        <Text style={styles.bodyText}>{text.aboutBody}</Text>
      </SurfaceCard>
    </ScreenLayout>
  );
}

export function FullWipeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'FullWipe'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout title={text.fullWipe} subtitle={text.wipeBody}>
      <SurfaceCard tone="danger" eyebrow={text.deleteAll}>
        <Text style={styles.bodyText}>{text.wipeBody}</Text>
      </SurfaceCard>
      <View style={styles.stack}>
        <ActionButton
          label={text.deleteAll}
          variant="danger"
          onPress={() => {
            Alert.alert(text.confirmWipeTitle, text.confirmWipeBody, [
              { text: text.cancel, style: 'cancel' },
              {
                text: text.deleteNow,
                style: 'destructive',
                onPress: async () => {
                  await actions.fullWipe();
                  navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
                },
              },
            ]);
          }}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
  stack: {
    gap: theme.spacing.sm,
  },
});
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppStore } from '../context/AppProvider';
import { sortReferralsByRegion } from '../data/regions';
import { getCopy } from '../data/translations';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';

async function openPhone(phone: string) {
  const url = `tel:${phone}`;
  const canOpen = await Linking.canOpenURL(url);

  if (canOpen) {
    await Linking.openURL(url);
    return;
  }

  Alert.alert('Phone number', phone);
}

export function HelpHubScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HelpHub'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout
      title={text.helpTitle}
      subtitle={text.helpSubtitle}
      navigation={navigation}
      currentMainScreen="HelpHub"
    >
      <SurfaceCard tone="warning" eyebrow={text.sampleData}>
        <Text style={styles.bodyText}>{text.helpSubtitle}</Text>
      </SurfaceCard>
      <ActionButton label={text.browseHelp} onPress={() => navigation.navigate('ReferralList')} />
    </ScreenLayout>
  );
}

export function ReferralListScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ReferralList'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const sorted = sortReferralsByRegion(state.referrals, state.regionLabel);

  return (
    <ScreenLayout title={text.trustedHelp} subtitle={state.regionLabel}>
      {sorted.map((referral) => (
        <SurfaceCard
          key={referral.id}
          eyebrow={`${text.source}: ${referral.source}`}
          title={referral.name}
        >
          <Text style={styles.bodyText}>{referral.category}</Text>
          <Text style={styles.bodyText}>{referral.serviceArea}</Text>
          <Text style={styles.metaText}>{`${text.updated}: ${referral.lastUpdated}`}</Text>
          <ActionButton
            label={text.viewTrustedHelp}
            variant="secondary"
            onPress={() => navigation.navigate('ReferralDetail', { referralId: referral.id })}
          />
        </SurfaceCard>
      ))}
    </ScreenLayout>
  );
}

export function ReferralDetailScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'ReferralDetail'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const referral = state.referrals.find((item) => item.id === route.params.referralId);

  if (!referral) {
    return (
      <ScreenLayout title={text.trustedHelp} subtitle={text.noReferral}>
        <Text style={styles.bodyText}>{text.noReferral}</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title={referral.name} subtitle={referral.category}>
      <SurfaceCard tone="accent" eyebrow={`${text.source}: ${referral.source}`}>
        <Text style={styles.bodyText}>{referral.serviceArea}</Text>
        <Text style={styles.bodyText}>{referral.note}</Text>
        <Text style={styles.metaText}>{`${text.updated}: ${referral.lastUpdated}`}</Text>
      </SurfaceCard>
      <View style={styles.stack}>
        <ActionButton label={text.callNow} onPress={() => openPhone(referral.phone)} />
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
  metaText: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
  stack: {
    gap: theme.spacing.sm,
  },
});
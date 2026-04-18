import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppStore } from '../context/AppProvider';
import { getExplanation } from '../data/mockData';
import { sampleImages } from '../data/sampleImages';
import { getCopy } from '../data/translations';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';

export function VaultListScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'VaultList'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout
      title={text.vaultTitle}
      subtitle={text.vaultSubtitle}
      navigation={navigation}
      currentMainScreen="VaultList"
    >
      {state.documents.length ? (
        state.documents.map((document) => (
          <SurfaceCard
            key={document.id}
            eyebrow={document.support === 'supported' ? text.savedLocally : text.lowConfidence}
            title={getExplanation(document, state.selectedLanguage).title}
          >
            {document.imageUri ? (
              <Image source={{ uri: document.imageUri }} style={styles.thumbImage} resizeMode="cover" />
            ) : document.sampleImageKey && sampleImages[document.sampleImageKey] ? (
              <Image source={sampleImages[document.sampleImageKey]} style={styles.thumbImage} resizeMode="cover" />
            ) : null}
            <Text style={styles.bodyText}>{document.capturedAt.slice(0, 10)}</Text>
            <ActionButton
              label={text.openDocument}
              variant="secondary"
              onPress={() => navigation.navigate('DocumentDetail', { documentId: document.id })}
            />
          </SurfaceCard>
        ))
      ) : (
        <SurfaceCard title={text.vaultTitle}>
          <Text style={styles.muted}>{text.noDocuments}</Text>
        </SurfaceCard>
      )}
    </ScreenLayout>
  );
}

export function DocumentDetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'DocumentDetail'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const document = state.documents.find((item) => item.id === route.params.documentId);
  const task = state.tasks.find((item) => item.documentId === route.params.documentId);

  if (!document) {
    return (
      <ScreenLayout title={text.vaultTitle} subtitle={text.nothingHere}>
        <ActionButton label={text.returnHome} onPress={() => navigation.navigate('VaultList')} />
      </ScreenLayout>
    );
  }

  const explanation = getExplanation(document, state.selectedLanguage);

  return (
    <ScreenLayout title={explanation.title} subtitle={explanation.summary}>
      {document.imageUri ? (
        <Image source={{ uri: document.imageUri }} style={styles.docImage} resizeMode="contain" />
      ) : document.sampleImageKey && sampleImages[document.sampleImageKey] ? (
        <Image source={sampleImages[document.sampleImageKey]} style={styles.docImage} resizeMode="contain" />
      ) : null}
      <SurfaceCard tone="accent" eyebrow={`${text.confidence}: ${Math.round(document.confidence * 100)}%`}>
        <Text style={styles.bodyText}>{explanation.whyItMatters}</Text>
        <Text style={styles.bodyText}>{explanation.nextStep}</Text>
      </SurfaceCard>
      <SurfaceCard title={text.detailsTitle}>
        {document.fields.map((field) => (
          <View key={field.key} style={styles.rowItem}>
            <Text style={styles.rowTitle}>{field.value}</Text>
            <Text style={styles.rowMeta}>{field.confirmed ? text.confirmYes : text.confirmNo}</Text>
          </View>
        ))}
      </SurfaceCard>
      {task ? (
        <ActionButton label={text.openTasks} onPress={() => navigation.navigate('TaskDetail', { taskId: task.id })} />
      ) : null}
      <ActionButton label={text.viewTrustedHelp} variant="secondary" onPress={() => navigation.navigate('ReferralList')} />
      <ActionButton
        label={text.fullWipe}
        variant="danger"
        onPress={() => {
          Alert.alert(text.deleteAll, text.confirmWipeBody, [
            { text: text.cancel, style: 'cancel' },
            {
              text: text.deleteNow,
              style: 'destructive',
              onPress: () => {
                actions.deleteDocument(document.id);
                navigation.goBack();
              },
            },
          ]);
        }}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 23,
  },
  docImage: {
    width: '100%',
    height: 300,
    borderRadius: theme.radius.lg,
  },
  thumbImage: {
    width: '100%',
    height: 160,
    borderRadius: theme.radius.md,
  },
  muted: {
    color: theme.colors.textMuted,
    fontSize: 15,
  },
  rowItem: {
    gap: 2,
    paddingVertical: 4,
  },
  rowTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  rowMeta: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
});
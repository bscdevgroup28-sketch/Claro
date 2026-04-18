import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppStore } from '../context/AppProvider';
import { getExplanation } from '../data/mockData';
import { getCopy } from '../data/translations';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';

export function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const openTasks = state.tasks.filter((task) => task.status === 'open').slice(0, 2);
  const recentDocuments = state.documents.slice(0, 2);

  return (
    <ScreenLayout
      title={text.homeTitle}
      subtitle={text.homeSubtitle}
      navigation={navigation}
      currentMainScreen="Home"
    >
      <SurfaceCard tone="accent" eyebrow={text.localOnly} title={text.scanNow}>
        <Text style={styles.bodyText}>
          {text.cameraSubtitle}
        </Text>
        <ActionButton label={text.scanNow} onPress={() => navigation.navigate('CameraCapture')} />
      </SurfaceCard>

      <SurfaceCard title={text.urgentTasks}>
        {openTasks.length ? (
          openTasks.map((task) => (
            <View key={task.id} style={styles.rowItem}>
              <Text style={styles.rowTitle}>{task.title}</Text>
              <Text style={styles.rowMeta}>{task.dueDate}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.muted}>{text.noTasks}</Text>
        )}
        <ActionButton label={text.openTasks} variant="secondary" onPress={() => navigation.navigate('TaskList')} />
      </SurfaceCard>

      <SurfaceCard title={text.recentDocuments}>
        {recentDocuments.length ? (
          recentDocuments.map((document) => (
            <View key={document.id} style={styles.rowItem}>
              <Text style={styles.rowTitle}>{getExplanation(document, state.selectedLanguage).title}</Text>
              <Text style={styles.rowMeta}>{document.capturedAt.slice(0, 10)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.muted}>{text.noDocuments}</Text>
        )}
        <ActionButton label={text.openSaved} variant="secondary" onPress={() => navigation.navigate('VaultList')} />
      </SurfaceCard>

      <SurfaceCard tone="warning" title={text.trustedHelp}>
        <Text style={styles.bodyText}>{text.scamWarning}</Text>
        <ActionButton label={text.browseHelp} variant="secondary" onPress={() => navigation.navigate('HelpHub')} />
      </SurfaceCard>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 23,
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
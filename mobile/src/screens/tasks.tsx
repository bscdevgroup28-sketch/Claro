import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { ScreenLayout } from '../components/ScreenLayout';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppStore } from '../context/AppProvider';
import { getCopy } from '../data/translations';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../theme';

export function TaskListScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'TaskList'>) {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  return (
    <ScreenLayout
      title={text.taskCenterTitle}
      subtitle={text.taskCenterSubtitle}
      navigation={navigation}
      currentMainScreen="TaskList"
    >
      {state.tasks.length ? (
        state.tasks.map((task) => (
          <SurfaceCard
            key={task.id}
            eyebrow={task.status === 'open' ? text.statusOpen : text.statusDone}
            title={task.title}
          >
            <Text style={styles.bodyText}>{task.dueDate}</Text>
            <Text style={styles.bodyText}>{task.reason}</Text>
            <ActionButton
              label={text.openDocument}
              variant="secondary"
              onPress={() => navigation.navigate('TaskDetail', { taskId: task.id })}
            />
          </SurfaceCard>
        ))
      ) : (
        <SurfaceCard title={text.taskCenterTitle}>
          <Text style={styles.muted}>{text.noTasks}</Text>
        </SurfaceCard>
      )}
    </ScreenLayout>
  );
}

export function TaskDetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'TaskDetail'>) {
  const { state, actions } = useAppStore();
  const text = getCopy(state.selectedLanguage);
  const task = state.tasks.find((item) => item.id === route.params.taskId);

  if (!task) {
    return (
      <ScreenLayout title={text.taskCenterTitle} subtitle={text.nothingHere}>
        <ActionButton label={text.returnHome} onPress={() => navigation.navigate('TaskList')} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title={task.title} subtitle={task.dueDate}>
      <SurfaceCard tone="accent" eyebrow={task.status === 'open' ? text.statusOpen : text.statusDone}>
        <Text style={styles.bodyText}>{task.reason}</Text>
      </SurfaceCard>
      <View style={styles.stack}>
        {task.status === 'open' ? (
          <ActionButton label={text.markDone} onPress={() => actions.markTaskDone(task.id)} />
        ) : null}
        <ActionButton
          label={text.openDocument}
          variant="secondary"
          onPress={() => navigation.navigate('DocumentDetail', { documentId: task.documentId })}
        />
        <ActionButton
          label={text.viewTrustedHelp}
          variant="secondary"
          onPress={() => navigation.navigate('ReferralList')}
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
  muted: {
    color: theme.colors.textMuted,
    fontSize: 15,
  },
  stack: {
    gap: theme.spacing.sm,
  },
});
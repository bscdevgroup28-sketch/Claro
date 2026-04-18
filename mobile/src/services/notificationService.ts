import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications are handled while the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Request notification permissions. On Android, also creates the reminders channel.
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', {
      name: 'Task Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/**
 * Schedule a local notification for a task. Fires one day before the due date
 * when possible, otherwise fires at the due date itself.
 *
 * Returns the notification identifier or null if scheduling failed.
 */
export async function scheduleTaskReminder(
  taskId: string,
  title: string,
  body: string,
  triggerDate: Date,
): Promise<string | null> {
  const granted = await requestNotificationPermissions();
  if (!granted) return null;

  // Don't schedule for dates already past
  if (triggerDate.getTime() <= Date.now()) return null;

  // Prefer one day before; fall back to the date itself
  const oneDayBefore = new Date(
    triggerDate.getTime() - 24 * 60 * 60 * 1000,
  );
  const fireDate =
    oneDayBefore.getTime() > Date.now() ? oneDayBefore : triggerDate;

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { taskId, type: 'task-reminder' },
        sound: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: fireDate,
        channelId: Platform.OS === 'android' ? 'reminders' : undefined,
      },
    });
    return id;
  } catch {
    return null;
  }
}

/**
 * Cancel a previously scheduled reminder.
 */
export async function cancelReminder(
  notificationId: string,
): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch {
    // May already have fired or been dismissed
  }
}

/**
 * Cancel every scheduled notification. Used by the full-wipe action.
 */
export async function cancelAllReminders(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // Ignore
  }
}

/**
 * Try to parse a task date string into a Date object.
 * Handles formats like "May 2, 2026", "May 2, 2026 at 8:30 AM", "05/02/2026".
 */
export function parseTaskDate(dateStr: string): Date | null {
  if (!dateStr || dateStr === 'Not found' || dateStr === 'Unclear') {
    return null;
  }

  // Strip "at HH:MM AM/PM" suffix for Date parsing
  const cleaned = dateStr
    .replace(/\s+at\s+\d{1,2}:\d{2}\s*(?:AM|PM)?/i, '')
    .trim();

  const parsed = new Date(cleaned);
  if (!isNaN(parsed.getTime()) && parsed.getTime() > Date.now()) {
    return parsed;
  }

  return null;
}

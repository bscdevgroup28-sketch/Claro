import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../theme';

type MainDestination = 'Home' | 'VaultList' | 'TaskList' | 'HelpHub' | 'SettingsHome';

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  navigation?: NavigationProp<ParamListBase>;
  currentMainScreen?: MainDestination;
}

const TAB_ICONS: Record<MainDestination, string> = {
  Home: '⌂',
  VaultList: '⊡',
  TaskList: '☑',
  HelpHub: '♡',
  SettingsHome: '⚙',
};

const mainDestinations: Array<{ route: MainDestination; label: string }> = [
  { route: 'Home', label: 'Home' },
  { route: 'VaultList', label: 'Vault' },
  { route: 'TaskList', label: 'Tasks' },
  { route: 'HelpHub', label: 'Help' },
  { route: 'SettingsHome', label: 'Settings' },
];

export function ScreenLayout({
  title,
  subtitle,
  children,
  navigation,
  currentMainScreen,
}: ScreenLayoutProps) {
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <View style={styles.frame}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerBlock}>
            <Text style={styles.eyebrow}>Claro</Text>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {children}
        </ScrollView>
        {navigation && currentMainScreen ? (
          <View style={styles.bottomWrap}>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate('CameraCapture' as never)}
              style={styles.scanButton}
            >
              <Text style={styles.scanButtonText}>Scan</Text>
            </Pressable>
            <View style={styles.bottomBar}>
              {mainDestinations.map((item) => {
                const active = currentMainScreen === item.route;

                return (
                  <Pressable
                    key={item.route}
                    onPress={() => navigation.navigate(item.route as never)}
                    style={styles.bottomItem}
                    accessibilityRole="tab"
                    accessibilityLabel={item.label}
                    accessibilityState={{ selected: active }}
                  >
                    <Text
                      style={[
                        styles.bottomIcon,
                        { color: active ? theme.colors.primary : theme.colors.textMuted },
                      ]}
                    >
                      {TAB_ICONS[item.route]}
                    </Text>
                    <Text
                      style={[
                        styles.bottomLabel,
                        { color: active ? theme.colors.primary : theme.colors.textMuted },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  frame: {
    flex: 1,
  },
  content: {
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 120,
  },
  headerBlock: {
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.sm,
  },
  eyebrow: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 23,
  },
  bottomWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    width: '100%',
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
    gap: 2,
  },
  bottomIcon: {
    fontSize: 20,
  },
  bottomLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  scanButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    minWidth: 92,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  scanButtonText: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },
});
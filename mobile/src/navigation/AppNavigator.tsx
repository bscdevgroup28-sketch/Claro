import {
  DefaultTheme,
  NavigationContainer,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useAppStore } from '../context/AppProvider';
import { getCopy } from '../data/translations';
import { HomeScreen } from '../screens/home';
import { HelpHubScreen, ReferralDetailScreen, ReferralListScreen } from '../screens/help';
import { LanguageSelectionScreen, RegionSelectionScreen, WelcomeAndBoundariesScreen } from '../screens/onboarding';
import {
  CameraCaptureScreen,
  CompletionScreen,
  DetailConfirmationScreen,
  ImageReviewScreen,
  ProcessingScreen,
  ReferralGateScreen,
  SupportedResultScreen,
  TaskCreateScreen,
  UnsupportedResultScreen,
} from '../screens/scan';
import {
  AppAboutScreen,
  ContentFreshnessScreen,
  FullWipeScreen,
  LanguageSettingsScreen,
  SafetyPrivacyScreen,
  SettingsHomeScreen,
} from '../screens/settings';
import { TaskDetailScreen, TaskListScreen } from '../screens/tasks';
import { DocumentDetailScreen, VaultListScreen } from '../screens/vault';
import { theme } from '../theme';

export type RootStackParamList = {
  LanguageSelection: undefined;
  WelcomeAndBoundaries: undefined;
  RegionSelection: undefined;
  Home: undefined;
  CameraCapture: undefined;
  ImageReview: { imageUri: string } | undefined;
  Processing: { imageUri: string } | undefined;
  SupportedResult: undefined;
  UnsupportedResult: undefined;
  DetailConfirmation: undefined;
  TaskCreate: undefined;
  ReferralGate: undefined;
  Completion: undefined;
  VaultList: undefined;
  DocumentDetail: { documentId: string };
  TaskList: undefined;
  TaskDetail: { taskId: string };
  HelpHub: undefined;
  ReferralList: undefined;
  ReferralDetail: { referralId: string };
  SettingsHome: undefined;
  LanguageSettings: undefined;
  SafetyPrivacy: undefined;
  ContentFreshness: undefined;
  AppAbout: undefined;
  FullWipe: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    primary: theme.colors.primary,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
  },
};

export function AppNavigator() {
  const { state } = useAppStore();
  const text = getCopy(state.selectedLanguage);

  if (!state.hydrated) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
        <Text style={styles.loadingText}>{text.appName}</Text>
      </View>
    );
  }

  const initialRouteName: keyof RootStackParamList = !state.selectedLanguage
    ? 'LanguageSelection'
    : !state.onboardingComplete
      ? 'WelcomeAndBoundaries'
      : 'Home';

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        key={initialRouteName}
        initialRouteName={initialRouteName}
        screenOptions={{
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeAndBoundaries" component={WelcomeAndBoundariesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegionSelection" component={RegionSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CameraCapture" component={CameraCaptureScreen} />
        <Stack.Screen name="ImageReview" component={ImageReviewScreen} />
        <Stack.Screen name="Processing" component={ProcessingScreen} />
        <Stack.Screen name="SupportedResult" component={SupportedResultScreen} />
        <Stack.Screen name="UnsupportedResult" component={UnsupportedResultScreen} />
        <Stack.Screen name="DetailConfirmation" component={DetailConfirmationScreen} />
        <Stack.Screen name="TaskCreate" component={TaskCreateScreen} />
        <Stack.Screen name="ReferralGate" component={ReferralGateScreen} />
        <Stack.Screen name="Completion" component={CompletionScreen} />
        <Stack.Screen name="VaultList" component={VaultListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} />
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="HelpHub" component={HelpHubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReferralList" component={ReferralListScreen} />
        <Stack.Screen name="ReferralDetail" component={ReferralDetailScreen} />
        <Stack.Screen name="SettingsHome" component={SettingsHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
        <Stack.Screen name="SafetyPrivacy" component={SafetyPrivacyScreen} />
        <Stack.Screen name="ContentFreshness" component={ContentFreshnessScreen} />
        <Stack.Screen name="AppAbout" component={AppAboutScreen} />
        <Stack.Screen name="FullWipe" component={FullWipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
});
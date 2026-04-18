import { Pressable, StyleSheet, Text } from 'react-native';

import { theme } from '../theme';

type Variant = 'primary' | 'secondary' | 'danger';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
}

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
}: ActionButtonProps) {
  const backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'danger'
        ? theme.colors.danger
        : theme.colors.surface;

  const textColor = variant === 'secondary' ? theme.colors.text : theme.colors.surface;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor: variant === 'secondary' ? theme.colors.border : backgroundColor,
          opacity: disabled ? 0.45 : pressed ? 0.88 : 1,
        },
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
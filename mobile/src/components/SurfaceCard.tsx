import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme';

interface SurfaceCardProps {
  title?: string;
  eyebrow?: string;
  tone?: 'default' | 'accent' | 'warning' | 'danger';
  children: ReactNode;
}

export function SurfaceCard({
  title,
  eyebrow,
  tone = 'default',
  children,
}: SurfaceCardProps) {
  const backgroundColor =
    tone === 'accent'
      ? theme.colors.primarySoft
      : tone === 'warning'
        ? '#F8E7D3'
        : tone === 'danger'
          ? '#F5DDD6'
          : theme.colors.surface;

  return (
    <View style={[styles.card, { backgroundColor }]}> 
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  eyebrow: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    gap: theme.spacing.sm,
  },
});
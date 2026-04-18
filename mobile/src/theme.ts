export const theme = {
  colors: {
    background: '#F6EFE2',
    surface: '#FFF9F0',
    surfaceStrong: '#F2E2C7',
    text: '#1F2A30',
    textMuted: '#56646B',
    primary: '#155A6C',
    primarySoft: '#D5E8E8',
    success: '#2F6B45',
    warning: '#B67033',
    danger: '#A4462B',
    border: '#D9CCB4',
    shadow: '#A18862',
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 24,
    pill: 999,
  },
} as const;

export type Theme = typeof theme;
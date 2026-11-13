import { createTheme } from '@mui/material/styles';
import { palette } from './palette';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: palette.accent, contrastText: palette.accentInk },
    secondary: { main: palette.secondary, contrastText: palette.accentInk },
    background: { default: palette.background, paper: palette.surface },
    text: { primary: palette.text, secondary: palette.muted },
    divider: palette.border,
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", sans-serif',
    button: { textTransform: 'none', fontWeight: 700 },
    h1: { fontWeight: 800 },
    h2: { fontWeight: 750 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: 42, paddingInline: 18 },
        outlined: { borderColor: palette.border, color: palette.text },
      },
    },
    MuiIconButton: { styleOverrides: { root: { color: palette.muted } } },
    MuiTooltip: { defaultProps: { arrow: true } },
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--surface': palette.surface,
          '--surface-raised': palette.raised,
          '--border': palette.border,
          '--text-main': palette.text,
          '--text-muted': palette.muted,
          '--text-dim': palette.dim,
          '--accent': palette.accent,
          '--accent-ink': palette.accentInk,
          '--secondary': palette.secondary,
          '--chrome': palette.chrome,
          '--active-surface': palette.active,
        },
        body: { margin: 0 },
        '*': { boxSizing: 'border-box' },
      },
    },
  },
});

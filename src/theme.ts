import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#b5ee55', contrastText: '#17200d' },
    secondary: { main: '#b9a2ef' },
    background: { default: '#17191f', paper: '#202329' },
    text: { primary: '#f4f5f7', secondary: '#9da3b0' },
    divider: '#30333c',
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
        outlined: { borderColor: '#42464f', color: '#e3e6ec' },
      },
    },
    MuiIconButton: { styleOverrides: { root: { color: '#a1a8b5' } } },
    MuiTooltip: { defaultProps: { arrow: true } },
    MuiCssBaseline: { styleOverrides: { body: { margin: 0 }, '*': { boxSizing: 'border-box' } } },
  },
});

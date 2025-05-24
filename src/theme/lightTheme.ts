import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: `"Inter var", ui-sans-serif, system-ui, sans-serif, 
                 "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFeatureSettings: 'normal',
          fontVariationSettings: 'normal',
        },
      },
    },
  },
});

export default lightTheme;
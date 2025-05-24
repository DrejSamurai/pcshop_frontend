import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
    },
    primary: {
      main: '#90caf9',
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

export default darkTheme;
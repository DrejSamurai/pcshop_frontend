import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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

export default theme;
import { createTheme } from '@mui/material/styles';
import 'react-alice-carousel/lib/alice-carousel.css';
import './aliceCarouselOverrides.css';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontFeatureSettings?: string;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    lightGrey: Palette['primary'];
  }

  interface PaletteOptions {
    lightGrey: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#566DED',
    },
    secondary: {
      main: '#FF7042',
    },
    lightGrey: {
      main: '#EBECF5',
    },
  },
  typography: {
    fontFamily: ['Raleway', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    fontFeatureSettings: "'pnum' on, 'lnum' on",
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontWeightRegular: 500,
    body1: {
      fontSize: 22,
      lineHeight: 30 / 22,
      fontWeight: 500,
    },
    allVariants: {
      color: '#1b2141',
    },
    body2: {
      fontSize: 16,
      lineHeight: 24 / 16,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 14,
      lineHeight: 20 / 14,
      fontWeight: 500,
      color: '#1b2141',
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 20 / 14,
      fontWeight: 500,
      color: '#87899c',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        sizeMedium: {
          height: 28,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 20 / 14,
          '& .MuiChip-label': {
            padding: '4px 12px',
          },
        },
        sizeSmall: {
          backgroundColor: '#EBECF5',
          height: 20,
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 16 / 12,
          '& .MuiChip-label': {
            padding: '2px 8px',
          },
        },
      },
    },
  },
});

export default theme;

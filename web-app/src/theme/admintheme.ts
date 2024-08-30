// theme/adminTheme.ts
import { createTheme } from "@mui/material/styles";

const adminTheme = createTheme({
  palette: {
    background: {
      default: "#F9FAFB",
    },
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: "Public Sans, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Public Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Public Sans'), local('PublicSans-Regular'), url(https://fonts.gstatic.com/s/publicsans/v11/ijwJs5juQtsyLLR3cR6GborI.woff2) format('woff2');
        }
        body {
          background-color: #F9FAFB;
        }
      `,
    },
  },
});

export default adminTheme;

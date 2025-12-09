import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(var(--color-primary-500))',
      light: 'rgb(var(--color-primary-300))',
      dark: 'rgb(var(--color-primary-700))',
      contrastText: '#ffffff',
    },
    secondary: {
      main: 'rgb(var(--color-secondary-500))',
      light: '#ffefc1',
      dark: '#c79100',
      contrastText: '#ffffff',
    },
    background: {
      default: 'rgb(var(--color-neutral-50))',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgb(var(--color-neutral-900))',
      secondary: 'rgba(17, 24, 39, 0.6)',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 'var(--shadow-md)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: 'var(--shadow-md)',
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, rgb(var(--color-primary-600)), rgb(var(--color-primary-400)))',
          boxShadow: 'var(--shadow-sm)',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
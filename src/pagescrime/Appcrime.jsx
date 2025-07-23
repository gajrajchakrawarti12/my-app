import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages (import only the components you want to show)
import Home from './Home';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 8 } } },
  },
});

function Appcrime() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <main style={{ flex: 1, padding: '20px 0' }}>
          {/* Render your desired components here */}
          <Home />
          {/* You can add more components below if needed */}
          {/* <AnotherComponent /> */}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default Appcrime;
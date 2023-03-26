import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Menu } from './layouts/Menu/Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './containers/Login/Login';

const StyledApp = styled.div`
  // Your style here
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function App() {
  return (
    <StyledApp>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <CssBaseline />
          <Menu />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;

import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Menu } from './layouts/Menu/Menu';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { SuspenseLoader } from './suspense/SuspenseLoader';

const Login = lazy(() => import('./containers/Login/Login').then(module => ({ default: module.Login })));
const Logout = lazy(() => import('./containers/Logout/Logout').then(module => ({ default: module.Logout })));
const Protected = lazy(() => import('./containers/Protected/Protected').then(module => ({ default: module.Protected })));
const Register = lazy(() => import('./containers/Register/Register').then(module => ({ default: module.Register })));

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
      <SuspenseLoader>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Menu />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Protected><div>Home</div></Protected>} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </ThemeProvider>
      </SuspenseLoader>
    </StyledApp>
  );
}

export default App;

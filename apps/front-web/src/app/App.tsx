import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Menu } from './layouts/Menu/Menu';
import { Route, Routes, useParams } from 'react-router-dom';
import { lazy } from 'react';
import { SuspenseLoader } from './suspense/SuspenseLoader';

const Login = lazy(() => import('./containers/Login/Login').then(module => ({ default: module.Login })));
const Logout = lazy(() => import('./containers/Logout/Logout').then(module => ({ default: module.Logout })));
const Protected = lazy(() => import('./containers/Protected/Protected').then(module => ({ default: module.Protected })));
const Register = lazy(() => import('./containers/Register/Register').then(module => ({ default: module.Register })));
const Chat = lazy(() => import('./containers/Chat/Chat').then(module => ({ default: module.Chat })));
const ShowTrash = lazy(() => import('./containers/Trash/Show').then(module => ({ default: module.Trash })));
const ListTrash = lazy(() => import('./containers/Trash/List').then(module => ({ default: module.Trashs })));

const StyledApp = styled.div`
  margin-top: constant(safe-area-inset-top); // for ios 11.1
  margin-top: env(safe-area-inset-top); // for ios 11.2 and onwards
  margin-bottom: env(safe-area-inset-bottom);
  height: calc(100% - constant(safe-area-inset-top));
  height: calc(100% - env(safe-area-inset-top) - env(safe-area-inset-bottom));
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
            <Route path="/chat" element={<Protected><Chat /></Protected>} />
            <Route path="/posting" element={<Protected><ListTrash/></Protected>} />
            <Route path="/posting/:id" element={<Protected><ShowTrash/></Protected>} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </ThemeProvider>
      </SuspenseLoader>
    </StyledApp>
  );
}

export default App;

import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Menu } from './layouts/Menu/Menu';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { SuspenseLoader } from './suspense/SuspenseLoader';
import FontMedium from './fonts/font-medium.woff2';
import { Page404 } from "./layouts/Page404";

const Home = lazy(() => import('./containers/Home/Home').then(module => ({ default: module.Home })));
const Login = lazy(() => import('./containers/Login/Login').then(module => ({ default: module.Login })));
const Logout = lazy(() => import('./containers/Logout/Logout').then(module => ({ default: module.Logout })));
const Protected = lazy(() => import('./containers/Protected/Protected').then(module => ({ default: module.Protected })));
const AdminProtected = lazy(() => import('./containers/Protected/AdminProtected').then(module => ({ default: module.AdminProtected })));
const Register = lazy(() => import('./containers/Register/Register').then(module => ({ default: module.Register })));
const Profile = lazy(() => import('./containers/Profile/Profile').then(module => ({ default: module.Profile })));
const ShowSpecific = lazy(() => import('./containers/Trash/ShowSpecific').then(module => ({ default: module.ShowSpecific })));
const ListTrash = lazy(() => import('./containers/Trash/List').then(module => ({ default: module.Trashs })));
const ShowManifestation = lazy(() => import('./containers/Manifestation/Show').then(module => ({ default: module.Manifestation })));
const ListManifestation = lazy(() => import('./containers/Manifestation/List').then(module => ({ default: module.Manifestations })));
const EditManifestation = lazy(() => import('./containers/Manifestation/Edit').then(module => ({ default: module.EditManifestation })));
const ForgotPassword = lazy(() => import('./containers/ForgotPassword/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const ForgotPasswordSpecific = lazy(() => import('./containers/ForgotPassword/ForgotPasswordSpecific').then(module => ({ default: module.ForgotPasswordSpecific })));

const Dashboard = lazy(() => import('./containers/Admin/Dashboard').then(module => ({ default: module.Dashboard })));
const User = lazy(() => import('./containers/Admin/User').then(module => ({ default: module.Users })));
const Trash = lazy(() => import('./containers/Admin/Trash').then(module => ({ default: module.Trashs })));
const Manifestation = lazy(() => import('./containers/Admin/Manifestation').then(module => ({ default: module.Manifestations })));
const Message = lazy(() => import('./containers/Admin/Message').then(module => ({ default: module.Messages })));

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
  typography: {
    fontFamily: 'FontMedium',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'FontMedium';
          src: local('FontMedium'), local('FontMedium-Regular'), url(${FontMedium}) format('woff2');
        }
      `,
    },
  },
});

createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'FontMedium',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'FontMedium';
          src: local('FontMedium'), local('FontMedium-Regular'), url(${FontMedium}) format('woff2');
        }
      `,
    },
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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Protected><Profile/></Protected>} />
            <Route path="/forgot-password/:id" element={<ForgotPasswordSpecific />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/posting" element={<Protected><ListTrash/></Protected>} />
            <Route path="/posting/:id" element={<Protected><ShowSpecific/></Protected>} />
            <Route path="/trash" element={<Protected><ListTrash/></Protected>} />
            <Route path="/manifestation" element={<Protected><ListManifestation/></Protected>} />
            <Route path="/manifestation/:id" element={<Protected><ShowManifestation/></Protected>} />
            <Route path="/manifestation/:id/edit" element={<Protected><EditManifestation/></Protected>} />
            <Route path="*" element={<div>404</div>} />

            <Route path="/dashboard" element={<AdminProtected><Dashboard/></AdminProtected>} />
            <Route path="/admin/user" element={<AdminProtected><User/></AdminProtected>} />
            <Route path="/admin/trash" element={<AdminProtected><Trash/></AdminProtected>} />
            <Route path="/admin/manifestation" element={<AdminProtected><Manifestation/></AdminProtected>} />
            <Route path="/admin/message" element={<AdminProtected><Message/></AdminProtected>} />


          </Routes>
        </ThemeProvider>
      </SuspenseLoader>
    </StyledApp>
  );
}

export default App;

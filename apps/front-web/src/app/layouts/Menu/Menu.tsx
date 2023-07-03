import { AppBar, Box, Button, Toolbar, Typography, MenuItem } from "@mui/material";
import MenuBar from '@mui/material/Menu';
import { useContext } from "react";
import * as React from 'react';
import { StyledLink } from "../../containers/Login/Link/Link.style";
import { UserContext } from "../../contexts/UserContext";
import getUserRoleFromToken from '../../utils/user/getUserRoleFromToken';
import { Link } from 'react-router-dom';

export const Menu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { token, logout } = useContext(UserContext);
  const role = getUserRoleFromToken(localStorage.getItem('token') ?? '');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">
              🔥 JBCV
            </StyledLink>
          </Typography>
          {!token ? (
            <>
              <StyledLink to="/register" className="menu-link">
                <Button>Inscription</Button>
              </StyledLink>

              <StyledLink to="/login" className="menu-link">
                <Button>Connexion</Button>
              </StyledLink>
            </>
          ) : (
            <>
              {!role?.includes('ADMIN') && (
                <>
                  <StyledLink to="/posting" className="menu-link">
                    <Button>Annonces</Button>
                  </StyledLink>

                  <StyledLink to="/manifestation" className="menu-link">
                    <Button>Manifestations</Button>
                  </StyledLink>
                  
                  <StyledLink to="/profile" className="menu-link">
                    <Button>Profil</Button>
                  </StyledLink>

                  <Button onClick={logout}>Déconnexion</Button>
                </>
              )}
              {role?.includes('ADMIN') && (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Plateforme Admin
                  </Button>
                  <MenuBar
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem component={Link} to="/admin/user">Utilisateurs</MenuItem>
                    <MenuItem component={Link} to="/admin/trash">Annonces</MenuItem>
                    <MenuItem component={Link} to="/admin/manifestation">Manifestations</MenuItem>
                    <MenuItem component={Link} to="/admin/message">Messages</MenuItem>
                    <MenuItem onClick={logout}>Déconnexion</MenuItem>
                  </MenuBar>
                </>
              )}
              </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { StyledLink } from "../../containers/Login/Link/Link.style";

export const Menu = () => {

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    window.location.reload();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">
              JBCV
            </StyledLink>
          </Typography>
          {!localStorage.getItem("token") && (
            <>
              <StyledLink to="/register" className="menu-link">
                <Button>Inscription</Button>
              </StyledLink><StyledLink to="/login" className="menu-link">
                <Button>Connexion</Button>
              </StyledLink>
            </>
          )}
          {localStorage.getItem("token") && (
            <Button onClick={logout}>Déconnexion</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

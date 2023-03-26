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
          <StyledLink to="/login" className="menu-link">
            <Button>Se connecter</Button>
          </StyledLink>
          <Button onClick={logout}>Se déconnecter</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { StyledLink } from "../../containers/Login/Link/Link.style";
import { UserContext } from "../../contexts/UserContext";

export const Menu = () => {

  const { token, logout } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/posting">
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
              <StyledLink to="/posting" className="menu-link">
                <Button>Annonces</Button>
              </StyledLink>

              <StyledLink to="/manifestation" className="menu-link">
                <Button>Manifestations</Button>
              </StyledLink>
              
              <Button onClick={logout}>Déconnexion</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

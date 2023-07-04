import React from 'react';
import {Box, Container, Grid, Link, Typography} from "@mui/material";

export const Page404 = () => {
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Grid
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{
          marginTop: '20vh',
        }}
      >
        <Box>
          <Typography gutterBottom variant={'h3'}>
            Il n'y a rien à brûler ici !

          </Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant={'h6'}>
            Erreur 404
          </Typography>
        </Box>
        <Box>
          <img src="../../../icon.png" alt="404" width={'40'}/>
        </Box>
        <Box>
          <Link href="/">
            <Typography gutterBottom variant={'h6'}>
              Retour à l'accueil
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Container>
  );
};

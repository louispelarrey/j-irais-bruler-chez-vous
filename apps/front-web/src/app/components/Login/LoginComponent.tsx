import {Avatar, Box, Button, Grid, Link, Paper, Snackbar, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {LoginData} from "../../containers/Login/Login";
import {UseFormRegister} from "react-hook-form";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {useEffect, useState} from "react";

interface LoginProps {
  register: UseFormRegister<LoginData>;
  handleSubmit: any;
  error: string;
}

export const LoginComponent = ({handleSubmit, register, error}: LoginProps) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    error !== '' ? setOpen(true) : setOpen(false)
  }, [error]);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      </Snackbar>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se connecter
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Adresse Email"
              autoComplete="email"
              {...register("email")}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mot de Passe"
              type="password"
              id="password"
              {...register("password")}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Connexion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2" >
                  Mot de passe oublié
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Pas de compte ? S'inscrire"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

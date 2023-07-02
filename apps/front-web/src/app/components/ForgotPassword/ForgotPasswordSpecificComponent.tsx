import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import { UseFormRegister } from 'react-hook-form';
import { ForgotPasswordSpecificData } from '../../containers/ForgotPassword/ForgotPasswordSpecific';

interface ForgotPasswordSpecificProps {
  register: UseFormRegister<ForgotPasswordSpecificData>;
  handleSubmit: any;
  error: string;
}

export const ForgotPasswordSpecificComponent = ({
  register,
  handleSubmit,
  error,
}: ForgotPasswordSpecificProps) => {
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
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
              <LockOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Réinitialisation du mot de passe
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                label="Mot de passe"
                autoComplete="password"
                {...register('password')}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Modifier le mot de passe
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Se connecter
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Pas de compte ? S'inscrire
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h1" component="h2" gutterBottom align="center">
        Votre mot de passe a été modifié, vous pouvez désormais vous
        <Link href="/login"> connecter</Link>
      </Typography>
    </>
  );
};

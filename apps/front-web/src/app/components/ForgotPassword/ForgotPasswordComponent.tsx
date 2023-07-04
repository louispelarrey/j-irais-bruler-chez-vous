import {Alert, Avatar, Box, Button, Grid, Link, Paper, Snackbar, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {UseFormRegister} from "react-hook-form";
import {ForgotPasswordData} from "../../containers/ForgotPassword/ForgotPassword";
import {useEffect, useState} from "react";

interface ForgotPasswordProps {
  register: UseFormRegister<ForgotPasswordData>;
  handleSubmit: any;
  error: string;
  success: boolean;
}

export const ForgotPasswordComponent = ({handleSubmit, register, error, success}: ForgotPasswordProps) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error || success){
      console.log("error", error)
      console.log("success", success)
      setOpen(true)
    }
  }, [success, error]);

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Grid container component="main" sx={{height: '100vh'}}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {
          <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{width: '100%'}}>
            {
              success ? "Un email de réinitialisation de mot de passe vous a été envoyé" : error
            }
          </Alert>
        }
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
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Mot de passe oublié
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Envoyer la demande de réinitialisation
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
  );
}

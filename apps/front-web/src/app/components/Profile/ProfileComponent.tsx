import { Box, Typography, Stack, Button, Modal, TextField, Card, CardHeader, CardContent, Grid } from '@mui/material';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import getUserIdFromToken from "../../utils/user/getUserIdFromToken";
import BadgeComponent from './BadgeComponent';

interface UserData {
  email: string;
  username: string;
}

interface IProfileComponent {
  data: any;
  onSubmit: any;
  register: UseFormRegister<UserData>;
}

export const ProfileComponent = ({
  data,
  onSubmit,
  register
}: IProfileComponent) => {
  const userId = getUserIdFromToken(localStorage.getItem('token') ?? '');
  const statistics = {
    trash: Math.floor(Math.random() * (120 - 5 + 1)) + 5,
    manifestation: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 2 }}>
      <Typography variant="h4" component="h1" mb={2}>
        Votre Profil
      </Typography>
      {data && (
        <Card sx={{
          backgroundColor: '#ea5b5b',
          width: '60%',
          borderRadius: '10px',
          p: 2,
          mb: 2,
        }}>
          <CardContent sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Grid container>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <img src="/user_profile_default.png" width={"200"} alt="profile" style={{ borderRadius: '5%' }} />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <Typography variant="h6" component="p">
                    {data.email}
                  </Typography>
                  <Typography variant="h6" component="p">
                    {data.username}
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', mt: 3, mb: 1, padding: '8px 0' }}>
                  <Stack direction="row" spacing={2} sx={{ textAlign: 'center' }}>
                    <Box sx={{
                      backgroundColor: '#ff6464',
                      color: '#ffffff',
                      border: '2px solid',
                      borderRadius: '10px',
                      p: 2,
                      flexGrow: 1
                    }}>
                      <Typography variant="subtitle1" component="h2">
                        Poubelles
                      </Typography>
                      <Typography variant="h4">
                        {statistics.trash}
                        <BadgeComponent
                          count={statistics.trash}
                        />
                      </Typography>
                    </Box>
                    <Box sx={{
                      backgroundColor: '#ff6464',
                      color: '#ffffff',
                      border: '2px solid',
                      borderRadius: '10px',
                      p: 2,
                      flexGrow: 1
                    }}>
                      <Typography variant="subtitle1" component="h2">
                        Manifestations
                      </Typography>
                      <Typography variant="h4">{data.userManifestation.length}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

      )}
      { userId === data.id && (
        <Button variant="outlined" onClick={handleOpen} sx={{ mt: 2 }} color={"primary"}>
          Modifier
        </Button>
      )}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#000000',
          p: 4,
          borderRadius: '8px',
          outline: 'none'
        }}>
          <Typography variant="h5" component="h2" mb={3}>
            Modifier le profil
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField label="Pseudo" defaultValue={data?.username} fullWidth margin="normal"
              required {...register('username')} />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Enregistrer
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

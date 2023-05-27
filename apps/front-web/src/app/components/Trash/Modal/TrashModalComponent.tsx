import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { MapComponent } from '../../Map/MapComponent';
import { useState } from 'react';
import { ImageDropzone } from '../../ImageDropzone/ImageDropzone';

export interface TrashData {
  reference: string;
  description: string;
  address: string;
  image: string;
}

interface TrashModalProps {
  register: UseFormRegister<TrashData>;
  handleSubmit: any;
}

export const TrashModalComponent = ({
  handleSubmit,
  register,
}: TrashModalProps) => {

  const [address, setAddress] = useState('');

  return (
    <Grid container component="main">
      <Grid item component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Créer une annonce
            </Typography>
            <MapComponent setAddress={setAddress}/>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Adresse"
              type="address"
              id="address"
              value={address}
              autoComplete="address"
              {...register('address', { required: true })}
            />
            <ImageDropzone/>
            <TextField
              margin="normal"
              required
              fullWidth
              id="reference"
              type="reference"
              label="Titre"
              autoComplete="reference"
              {...register('reference', { required: true })}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              type="description"
              id="description"
              autoComplete="description"
              {...register('description', { required: true })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Créer
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

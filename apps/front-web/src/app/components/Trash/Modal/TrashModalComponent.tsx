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
      <Grid item component={Paper} square>
        <Box
          sx={{
            my: 2,
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
          >
            <Typography id="modal-modal-title" variant="h6" component="h6">
              Créer une annonce
            </Typography>
            <MapComponent setAddress={setAddress}/>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Adresse"
              size='small'
              type="address"
              id="address"
              value={address}
              autoComplete="address"
              {...register('address', { required: true })}
            />
            <TextField
              required
              fullWidth
              size='small'
              id="reference"
              type="reference"
              label="Titre"
              autoComplete="reference"
              {...register('reference', { required: true })}
            />
            <TextField
              margin='dense'
              required
              fullWidth
              size='small'
              label="Description"
              type="description"
              id="description"
              autoComplete="description"
              {...register('description', { required: true })}
            />
            <ImageDropzone/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Créer
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

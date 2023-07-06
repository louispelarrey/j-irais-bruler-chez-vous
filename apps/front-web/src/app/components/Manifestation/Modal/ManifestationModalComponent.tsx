import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import AutocompleteInput from "../../../utils/input/AutocompleteInput";
import {useState} from "react";
import {useNavigate} from 'react-router';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export interface ManifestationData {
  title: string;
  description: string;
  address: string;
  start_date: string;
}

interface ManifestationModalProps {
  handleSubmit: any;
}

export const ManifestationModalComponent = ({
                                            }: ManifestationModalProps) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    setValue,
    formState: {errors}
  } = useForm<ManifestationData>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [start_date, setStart_date] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/manifestation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title,
          description,
          address,
          start_date
        }),
      });
      const data = await response.json();
      if (data.id) {
        navigate(`/`);
      }
    } catch (errorForm: any) {
      setError(errorForm.message);
    }
  };

  const handlePlaceSelected = (place: any) => {
    setAddress(place.formatted_address);
  };

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
          >
            <Typography id="modal-modal-title" variant="h6" component="span">
              Créer une manifestation
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Titre"
              size='small'
              type="title"
              id="title"
              autoComplete="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              required
              fullWidth
              label="Description"
              size='small'
              type="description"
              id="description"
              autoComplete="description"
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                marginBottom: 2,
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Date de début de la manifestation"
                  value={start_date}
                  onChange={(e) => setStart_date(e.toString())}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Box sx={{
              marginTop: 2,
            }}>
              <AutocompleteInput
                onPlaceSelected={handlePlaceSelected}
                id={'address'}
              />
            </Box>
            {errors.address && <span>This field is required</span>}
            <Button
              type="submit"
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              sx={{mt: 2, mb: 2}}
            >
              Créer
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

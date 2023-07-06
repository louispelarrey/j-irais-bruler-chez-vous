import { Alert, AlertTitle, Box, Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { ManifestationData } from '../../../containers/Manifestation/Edit';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import AutocompleteInput from "../../../utils/input/AutocompleteInput";
import dayjs from 'dayjs';

interface ManifestationFormProps {
  initialValues: ManifestationData;
  register: UseFormRegister<ManifestationData>;
  handleSubmit: any;
  id: string;
  error: string;
}

export const ManifestationFormComponent = ({
   initialValues,
   error,
   id
 }: ManifestationFormProps) => {

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

  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [address, setAddress] = useState(initialValues.address);
  const [start_date, setStart_date] = useState(initialValues.start_date);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/manifestation/${id}`, {
        method: 'PUT',
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
    <Grid container component="main" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginTop: 5
    }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      </Snackbar>
      <Grid item component={Paper} square>
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
          >
            <Typography id="modal-modal-title" variant="h6" component="span">
              Modifier une manifestation
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
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                marginBottom: 2
              }}
            />
            <TextField
              required
              fullWidth
              label="Description"
              size='small'
              type="description"
              id="description"
              autoComplete="description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                marginBottom: 2
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Date de début de la manifestation"
                  value={dayjs(start_date)}
                  views={["year", "month", "day"]}
                  format="DD-MM-YYYY"
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
                value={address}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modifier
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ManifestationFormComponent;

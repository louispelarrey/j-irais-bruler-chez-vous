import { MobileStepper, Button, Typography, Stack, Box, Paper, CardContent, CardActions, Card, CardMedia, CardHeader } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useCallback, useEffect, useState } from 'react';
import useGet from '../../../hooks/useGet';
import { SuspenseLoader } from '../../../suspense/SuspenseLoader';
import { useNavigate } from 'react-router-dom';
import getUserIdFromToken from '../../../utils/user/getUserIdFromToken';
import { ShowOnMap } from '../../../components/Trash/View/Map/ShowOnMap';

export const ListFragment = () => {
  const theme = useTheme();
  const { data, error, loading, refetch } = useGet('/api/manifestation');
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = data ? data.length : 0;
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleJoinManifestation = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/manifestation/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();

        if (data.statusCode === 401) {
          navigate('/');
          return;
        }
        console.log(response)
        if (response.status === 200){
          refetch();
        }
      } catch (error) {

      }
    },
    [navigate]
  );

  if(loading) {
    return <SuspenseLoader children={<></>} />;
  }
  if(error) {
    return <div>error</div>;
  }
  if(!data || data.length === 0) {
    return <div>no data</div>;
  }

  const step = data[activeStep];
  const mapKey = step ? step.id : null;
console.log(step);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <ShowOnMap
              key={mapKey}
              title={step.title}
              address={step.address}
            />
            <Typography gutterBottom variant="h5" component="div">
              {step.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {`Date: ${new Date(step.start_date).toLocaleString("fr-FR")}`}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {step.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {step.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nombre de participants: {step.participantCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Créateur: {step.creatorId}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'right' }}>
              {localStorage.getItem('token') && !step.participants.includes(getUserIdFromToken(localStorage.getItem('token') ?? '')) && step.creatorId !== getUserIdFromToken(localStorage.getItem('token') ?? '') && (
                <Button variant="contained" onClick={() => handleJoinManifestation(step.id)}>Participer</Button>
              )}
          </CardActions>
        </Card>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Suivant
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Précédent
            </Button>
          }
        />
      </Box>
    </Box>
  );
};

import { MobileStepper, Button, Typography, Stack, Box, Paper, CardContent, CardActions, Card, CardMedia, CardHeader } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import useGet from '../../../hooks/useGet';
import { SuspenseLoader } from '../../../suspense/SuspenseLoader';

export const ListFragment = () => {
  const theme = useTheme();
  const { data, error, loading } = useGet('/api/manifestation');
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = data ? data.length : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
        <Card sx={{ maxWidth: 600 }}>
          <CardHeader
            title={step.title}
            subheader={`Date: ${step.start_date}`}
          >
          </CardHeader>
          <CardMedia
            sx={{ height: 140 }}
            image="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80"
            title="Live from space album cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {step.ville}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {step.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Créateur: {step.creatorId}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'right' }}>
            <Button variant="contained">Participer</Button>
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
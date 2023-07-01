import { MobileStepper, Button, Typography, Stack, Box, Paper } from '@mui/material';
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
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.primary',
          }}
        >
          <Typography>{step.title}</Typography>
        </Paper>
        <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
          {step.description}
        </Box>
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
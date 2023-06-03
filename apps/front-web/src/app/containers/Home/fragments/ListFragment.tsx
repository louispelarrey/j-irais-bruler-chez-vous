import * as React from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
    },
}));

export const ListFragment = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
            justifyContent="center"
        >
            <Section>
                <Typography variant="h6">Value 1</Typography>
            </Section>
            <Section>
                <Typography variant="h6">Value 2</Typography>
            </Section>
            <Section>
                <Typography variant="h6">Value 3</Typography>
            </Section>
        </Stack>
        </Box>
    );
};
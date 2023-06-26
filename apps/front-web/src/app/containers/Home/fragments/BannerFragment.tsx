import * as React from 'react';
import { Button, Typography} from '@mui/material';

export const BannerFragment = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <Typography variant="h1" style={{ color: 'white' }}>Bienvenue manifestant !</Typography>
                <Typography variant="h3" style={{ color: 'white' }}>Voici la plateforme qui vous permet de vivre l'émotion, rejoignez la passion de la manifestation.</Typography>
                <Button variant="contained" style={{ marginTop: '20px' }}>Découvrir</Button>
            </div>
        </div>
    );
};
import * as React from 'react';
import {Button, Typography} from '@mui/material';

export const BannerFragment = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
    }}>
      <img
        src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80"
        style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}}/>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>

      </div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        textAlign: 'center',
        padding: '20px',
      }}>
        <Typography style={{
          color: 'white',
          fontSize: '3rem',
        }}>Bienvenue manifestant !</Typography>
        <Typography style={{
          color: 'white',
          fontSize: '2rem',
        }}>Voici la plateforme qui vous permet de vivre l'émotion,
          rejoignez la passion de la manifestation.</Typography>
        <Button variant="contained" style={{marginTop: '20px'}}>Découvrir</Button>
      </div>
    </div>
  );
};

import useGet from '../../hooks/useGet';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ManifestationFormComponent } from '../../components/Manifestation/Form/ManifestationFormComponent';
import {Grid, Typography } from '@mui/material';

export interface ManifestationData {
  title: string;
  description: string;
  address: string;
  start_date: string;
}

export const EditManifestation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useGet(`/api/manifestation/${id}`);
  const { register, handleSubmit } = useForm<ManifestationData>();
  const [error, setError] = useState('');

  const onSubmit = async (formData: ManifestationData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/manifestation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      navigate('/manifestation');
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10%',
    }}>
      <Typography>
        Page en maintenance, veuillez revenir plus tard.
      </Typography>
    </Grid>
    // <ManifestationFormComponent
    //   initialValues={data}
    //   register={register}
    //   handleSubmit={handleSubmit(onSubmit)}
    //   error={error}
    // />
  );
};

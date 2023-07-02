import useGet from '../../hooks/useGet';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ManifestationListingComponent } from '../../components/Manifestation/Listing/ManifestationListingComponent';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';

export interface ManifestationData {
  title: string;
  description: string;
  address: string;
  start_date: string;
}

export interface IManifestationOnSubmit {
  title: string;
  description: string;
  address: string;
  start_date: string;
}

export const Manifestations = () => {
  const { data, error, loading } = useGet('/api/manifestation');
  const [ open, setOpen ] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ManifestationData>();

  const onSubmit = async ({ title, description, address, start_date }: IManifestationOnSubmit) => {
    const response = await fetch('/api/manifestation', {
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
  };

  if (loading) {
    return <SuspenseLoader children={<></>} />;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return <ManifestationListingComponent
    data={data}
    open={open}
    handleOpen={handleOpen}
    handleClose={handleClose}
    register={register}
    handleSubmit={handleSubmit}
    onSubmit={onSubmit}
  />;
};
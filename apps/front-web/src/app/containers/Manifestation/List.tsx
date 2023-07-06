import useGet from '../../hooks/useGet';
import React, { useEffect, useState } from 'react';
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

const usePost = (url: string, body: any) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data)
        setData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, error, loading };
};

export const Manifestations = () => {
  const { data, error, loading } = usePost(`${import.meta.env.VITE_APP_BACKEND_URL}/api/manifestation/me`, {});
  const [ open, setOpen ] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ManifestationData>();
  const [errorForm, setError] = useState<any>(null);

  const onSubmit = async ({ title, description, address, start_date }: IManifestationOnSubmit) => {
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

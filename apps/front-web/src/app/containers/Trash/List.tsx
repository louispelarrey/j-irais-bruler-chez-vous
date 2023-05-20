import useGet from '../../hooks/useGet';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TrashListingComponent } from '../../components/Trash/Listing/TrashListingComponent';

export interface TrashData {
  reference: string;
  description: string;
}

export interface ITrashOnSubmit {
  reference: string;
  description: string;
}

export const Trashs = () => {
  const { data, error, loading } = useGet('/api/trash');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<TrashData>();

  const onSubmit = async ({ reference, description }: ITrashOnSubmit) => {
    const response = await fetch('/api/trash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        reference,
        description,
      }),
    });
    const data = await response.json();
    if (data.id) {
      navigate(`/trash/${data.id}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <TrashListingComponent
    data={data}
    open={open}
    handleOpen={handleOpen}
    handleClose={handleClose}
    register={register}
    handleSubmit={handleSubmit}
    onSubmit={onSubmit}
  />;
};

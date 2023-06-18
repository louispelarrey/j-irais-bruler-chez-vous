import useGet from '../../hooks/useGet';
import React, {Dispatch, SetStateAction, createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TrashListingComponent } from '../../components/Trash/Listing/TrashListingComponent';
import { TrashData } from '../../components/Trash/Modal/TrashModalComponent';

export const TrashImageContext = createContext({
  trashImage: null as File | null,
  setTrashImage: (() => null) as Dispatch<SetStateAction<File | null>>,
})

export const Trashs = () => {
  const { data, error, loading } = useGet('/api/trash');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<TrashData>();
  const [trashImage, setTrashImage] = useState<File | null>(null);

  const onSubmit = async ({
    reference,
    description,
    address,
  }: TrashData) => {
    const formData = new FormData();
    console.log(trashImage);

    if (trashImage) formData.append('trashImage', trashImage);
    formData.append(
      'data',
      JSON.stringify({
        reference,
        description,
        address,
      })
    );

    const response = await fetch('/api/trash', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (data.id) {
      navigate(`/trash/${data.id}`);
    }
  };

  if (loading) {
    return <div>Chargement ...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <TrashImageContext.Provider value={{ trashImage, setTrashImage }}>
      <TrashListingComponent
        data={data}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </TrashImageContext.Provider>
  );
};

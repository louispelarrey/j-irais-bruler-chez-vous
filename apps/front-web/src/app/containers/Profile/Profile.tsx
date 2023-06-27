import { useCallback, useState } from "react";
import { ProfileComponent } from "../../components/Profile/ProfileComponent";
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
import useGet from '../../hooks/useGet';
import { useNavigate } from 'react-router-dom';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { useForm } from 'react-hook-form';

interface UserData {
  email: string;
  username: string;
}

export const Profile = () => {
  const userId = getUserIdFromToken(localStorage.getItem('token') ?? '');
  const { data, error, loading } = useGet(`/api/users/${userId}`);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserData>();

  const onSubmit = async ({
    username
  }: UserData) => {

    const formData = new FormData();
    formData.append('username', username);

    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    const data = await response.json();

    if (data.statusCode === 401) {
      // navigate('/logout');
      navigate(`/users/${userId}`);
    }
    if (data.id) {
      navigate(`/users/${userId}`);
    }
  };

  if (loading) {
    return <SuspenseLoader children={<></>} />;
  }
  if (error) {
    return <div>Erreur</div>;
  }

  return (
    <ProfileComponent
      data={data}
      register={register}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

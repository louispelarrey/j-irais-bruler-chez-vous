import { ForgotPasswordSpecificComponent } from '../../components/ForgotPassword/ForgotPasswordSpecificComponent';
import {useNavigate, useParams} from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface ForgotPasswordSpecificData {
  password: string;
}

export const ForgotPasswordSpecific = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm<ForgotPasswordSpecificData>();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async ({ password }: ForgotPasswordSpecificData) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/users/forgot-password/${id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
        }),
      }
    );

    const data = await response.json();
    if (response.status !== 201 || !data) {
      setError('Email incorrect');
      return;
    }else {
      navigate('/login');
    }
  };

  if (error) return <div>Une erreur s'est produite</div>;

  return (
    <ForgotPasswordSpecificComponent
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      error={error}
    />
  );
};

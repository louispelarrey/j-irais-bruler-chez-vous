import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginComponent } from '../../components/Login/LoginComponent';
import { UserContext } from '../../contexts/UserContext';
import getUserRoleFromToken from '../../utils/user/getUserRoleFromToken';

export interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>();
  const [error, setError] = useState('');
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: LoginData) => {
    const response = await fetch(
      import.meta.env.VITE_APP_BACKEND_URL + '/api/authentication/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password,
        }),
      }
    );

    const data = await response.json();
    if (response.status !== 201 || !data) {
      setError('Email ou mot de passe incorrect');
      return;
    }

    if (data.access_token) {
      setToken(data.access_token);
      const role = getUserRoleFromToken(localStorage.getItem('token') ?? '');
      if (role?.includes('ADMIN')) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  if (token) return <Navigate to="/" replace />;

  return (
    <LoginComponent
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      error={error}
    />
  );
};

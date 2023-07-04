import { useForm } from "react-hook-form";
import { ForgotPasswordComponent } from "../../components/ForgotPassword/ForgotPasswordComponent"
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export interface ForgotPasswordData {
  email: string;
}

export const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<ForgotPasswordData>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { token, setToken } = useContext(UserContext);

  const onSubmit = async ({ email }: ForgotPasswordData) => {
    const response = await fetch(
      import.meta.env.VITE_APP_BACKEND_URL + '/api/users/forgot-password',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();
    if (response.status !== 201 || !data) {
      setError('Email incorrect');
      return;
    }else {
      setSuccess(true)
    }
  };

  if (token) return <Navigate to="/" replace />;

  return <ForgotPasswordComponent
    handleSubmit={handleSubmit(onSubmit)}
    register={register}
    error={error}
    success={success}
  />
};

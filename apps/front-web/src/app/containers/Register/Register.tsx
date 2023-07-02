import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterComponent } from "../../components/Register/RegisterComponent";
import { sendEvent, eventCollect, initMouseTracking } from "raidalytics";

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export const Register = () => {
  const { register, handleSubmit } = useForm<RegisterData>();
  const navigate = useNavigate();

  useEffect(() => {
    initMouseTracking();
    const trackRegistrationPage = async () => {
      await eventCollect('RegistrationPageVisited', { tag: 'Inscription' });
    };

    trackRegistrationPage();
  }, []);


  const onSubmit = async ({ email, password, username }: RegisterData) => {

    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/users`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username
        }),
      }
    );
    //check status code
    if (response.status === 201) {
      // envoyer un event si l'inscription est réussie
      sendEvent('RegistrationSuccess', { tag: 'Inscription', message: 'Inscription Réussie.' });
      navigate("/login");
    } else {
      // Optionnelle: envoyer un event si l'inscription a échouée
      sendEvent('RegistrationFailed', { tag: 'Inscription', message: 'Échec de l\'inscription.' });
    }
  }

  return <RegisterComponent handleSubmit={handleSubmit} register={register} onSubmit={onSubmit} />;



}

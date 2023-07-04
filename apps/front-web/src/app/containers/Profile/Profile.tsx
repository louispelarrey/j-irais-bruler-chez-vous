import { ProfileComponent } from "../../components/Profile/ProfileComponent";
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
import useGet from '../../hooks/useGet';
import { useNavigate } from 'react-router-dom';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { useForm } from 'react-hook-form';
import { useSnackbarContext } from "react-mui-snackbar";

interface UserData {
  email: string;
  username: string;
}

export const Profile = () => {
  const userId = getUserIdFromToken(localStorage.getItem('token') ?? '');
  const { data, error, loading } = useGet(`/api/users/${userId}`);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserData>();

  const {openSnackbar} = useSnackbarContext() ;

  const onSubmit = async ({
    username
  }: UserData) => {
    const response = await fetch(`
      ${import.meta.env.VITE_APP_BACKEND_URL}/api/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          username
      }),
    });
    const data = await response.json();

    if (data.statusCode === 401) {
      navigate('/logout');
    }
    if (data.id) {
      navigate('/logout');
    }
    openSnackbar({
      message: "Votre profil a bien été modifié",
      type: "success",
    });
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

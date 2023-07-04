import { ProfileComponent } from "../../components/Profile/ProfileComponent";
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
import useGet from '../../hooks/useGet';
import { useNavigate, useParams } from 'react-router-dom';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { useForm } from 'react-hook-form';

interface UserData {
  email: string;
  username: string;
}

export const Profile = () => {
  const userId = getUserIdFromToken(localStorage.getItem('token') ?? '');
  const { id } = useParams();
  const { data, error, loading } = useGet(`/api/users/${id}`);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserData>();

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

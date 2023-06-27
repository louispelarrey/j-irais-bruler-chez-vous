import { useCallback, useState } from "react";
import { ProfileComponent } from "../../components/Profile/ProfileComponent";
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
import useGet from '../../hooks/useGet';

interface UserData {
  email: string;
  username: string;
}

export const Profile = () => {
  const userId = getUserIdFromToken(localStorage.getItem('token') ?? '');
  const { data, error, loading } = useGet(`/api/users/${userId}`);
  return (
    <div>
      <ProfileComponent data={data} />
    </div>
  );
};

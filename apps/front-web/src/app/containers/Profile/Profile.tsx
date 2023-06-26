import { useEffect, useState } from "react";
import { ProfileComponent } from "../../components/Profile/ProfileComponent";
import useGet from '../../hooks/useGet';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';


export const Profile = () => {
  const { data, error, loading } = useGet(`/api/user/me`);
  const [formData, setFormData] = useState(null);

  if (loading) {
    return <SuspenseLoader children={<></>} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  return (
    <div>
      <ProfileComponent data={formData} />
    </div>
  );
};

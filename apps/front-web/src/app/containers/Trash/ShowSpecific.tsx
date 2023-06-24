import { useParams } from 'react-router-dom';
import useGet from '../../hooks/useGet';
import { ContractView } from '../../components/Trash/View/ContractView';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';

export const ShowSpecific = () => {
  const { id } = useParams();
  const { data, error, loading } = useGet(`/api/trash/${id}`);

  if (loading) {
    return <SuspenseLoader children={<></>} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <ContractView data={data} />;
};

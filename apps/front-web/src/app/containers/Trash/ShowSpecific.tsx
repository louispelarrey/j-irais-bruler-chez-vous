import { useParams } from 'react-router-dom';
import useGet from '../../hooks/useGet';
import { ContractView } from '../../components/Trash/View/ContractView';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { useCallback } from 'react';

export const ShowSpecific = () => {
  const { id } = useParams();
  const { data, error, loading } = useGet(`/api/trash/${id}`);

  const onContractTaken = useCallback(() => async () => {
    const response = await fetch(`/api/trash/${id}/contract`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    if (data.statusCode === 401) {
      window.location.href = '/logout';
    }

    if (data.id) {
      window.location.reload();
    }
  }, [id]);

  if (loading) {
    return <SuspenseLoader children={<></>} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <ContractView
    data={data}
    onContractTaken={onContractTaken}
  />;
};

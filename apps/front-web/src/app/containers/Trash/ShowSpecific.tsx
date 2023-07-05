import { useNavigate, useParams } from 'react-router-dom';
import useGet from '../../hooks/useGet';
import { ContractView } from '../../components/Trash/View/ContractView';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { useCallback, useEffect, useState } from 'react';
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
import { Chat } from '../Chat/Chat';

export const ShowSpecific = () => {
  const { id } = useParams();
  const { data, error, loading } = useGet(`/api/trash/${id}`);
  const [isContractTaken, setIsContractTaken] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const navigate = useNavigate();

  const onContractTaken = useCallback(
    () => async () => {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/trash/${id}/contract`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (response.status === 401) {
        navigate('logout');
      }

      if (data.id) {
        setIsContractTaken(true);
      }
    },
    [id]
  );

  const onContractCanceled = useCallback(
    () => async () => {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/trash/${id}/contract`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (response.status === 401) {
        navigate('/logout');
      }

      if (data.id) {
        setIsContractTaken(false);
      }
    },
    [id, navigate]
  );

  const onContractDeleted = useCallback(
    () => async () => {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/trash/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (response.status === 401) {
        navigate('/logout');
      }

      navigate('/posting');
    },
    [id, navigate]
  );

  const onContractEnded = useCallback(
    () => async () => {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/trash/${id}/end`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (response.status === 401) {
        navigate('/logout');
      }

      navigate('/posting');
    },
    [id, navigate]
  );

  /**
   * Checks if the user is the creator of the contract
   *  or if the user has already taken the contract
   */
  useEffect(() => {
    if (!localStorage.getItem('token') || !data) {
      return;
    }

    const userId = getUserIdFromToken(localStorage.getItem('token') ?? '');

    if (data?.posterId.id === userId) {
      setIsCreator(true);
      return;
    }

    if (data?.burners.find((burner: any) => burner.id === userId)) {
      setIsContractTaken(true);
    }
  }, [data]);

  if (loading) {
    return <SuspenseLoader children={<></>} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ContractView
      data={data}
      onContractTaken={onContractTaken}
      onContractCanceled={onContractCanceled}
      onContractDeleted={onContractDeleted}
      onContractEnded={onContractEnded}
      isContractTaken={isContractTaken}
      isCreator={isCreator}
    >
      <Chat roomName={id} heightVh={30} />
    </ContractView>
  );
};

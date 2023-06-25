import { useParams } from 'react-router-dom';
import useGet from '../../hooks/useGet';
import { ContractView } from '../../components/Trash/View/ContractView';
import { SuspenseLoader } from '../../suspense/SuspenseLoader';
import { useCallback, useEffect, useState } from 'react';
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
import { useChat } from '../../hooks/useChat';
import { Chat } from '../Chat/Chat';

export const ShowSpecific = () => {
  const { id } = useParams();
  const { data, error, loading } = useGet(`/api/trash/${id}`);
  const [isContractTaken, setIsContractTaken] = useState<boolean>(false);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  const onContractTaken = useCallback(
    () => async () => {
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
    },
    [id]
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
      isContractTaken={isContractTaken}
      isCreator={isCreator}
    >
      <Chat
        roomName={id}
        heightVh={30}
      />
    </ContractView>
  );
};

import { useState, useEffect, useCallback, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { ChatComponent } from '../../components/Chat/ChatComponent';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../contexts/UserContext';
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
import { transformApiResponse } from '../../utils/message/transformApiResponse';

export interface ChatForm {
  newMessage: string;
}

export interface Message {
  username: string;
  userId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiMessage {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  sender: User;
}

interface User {
  id: string;
  username: string;
  email: string;
  roles: UserRole[];
  password: string;
}

type UserRole = 'USER';

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {register, handleSubmit} = useForm<ChatForm>();
  const [socket, setSocket] = useState<Socket>();
  const {token} = useContext(UserContext);
  const userId = getUserIdFromToken(token);
  const roomName = 'default';

  const onNewMessage = useCallback((messages: ApiMessage | ApiMessage[]) => {
    const transformedMessages = transformApiResponse(messages);
    Array.isArray(transformedMessages) ? setMessages(transformedMessages) :
      setMessages((messages) => [...messages, transformedMessages]);
  }, []);

  const sendMessage = useCallback(({newMessage}: ChatForm) => {
    socket && socket.emit('createMessage', {
      senderId: userId,
      message: newMessage,
      roomName,
    });
  }, [socket, userId]);

  useEffect(() => {
    const newSocket = io(':3001');
    setSocket(newSocket);

    const onConnect = () => {
      newSocket.emit('joinRoom', roomName);
      newSocket.emit('findAllMessageByRoom', roomName);
    };

    newSocket.on('connect', onConnect);
    newSocket.on('newMessage', onNewMessage);

    return () => {
      newSocket.off('connect', onConnect);
      newSocket.off('newMessage', onNewMessage);
      newSocket.disconnect();
    };
  }, [onNewMessage, userId]);

  return (
    <ChatComponent
      messages={messages}
      handleSubmit={handleSubmit(sendMessage)}
      register={register}
      userId={userId}
    />
  );
};

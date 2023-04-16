import { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import io from 'socket.io-client';
import { ChatComponent } from '../../components/Chat/ChatComponent';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../contexts/UserContext';
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
import transformApiResponse from '../../utils/message/transformApiResponse';
export interface ChatForm {
  newMessage: string;
}

export interface Message {
  username: string;
  userId: string;
  message: string;
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
  const {token} = useContext(UserContext);
  const userId = getUserIdFromToken(token);
  const socket = useMemo(() => {
    return io("http://localhost:3000/messages");
  }, []);

  const roomName = 'default';

  const receiveMessage = useCallback((message: Message | ApiMessage[]) => {
    //Check if message is of type ApiMessage
    if (Array.isArray(message)) {
      const transformedMessages = transformApiResponse(message);
      setMessages(transformedMessages);
      return;
    }

    setMessages([...messages, message]);
  }, [messages]);

  const sendMessage = useCallback(({newMessage}: ChatForm) => {
    socket.emit('createMessage', {
      userId: userId,
      message: newMessage,
      roomName,
    });
  }, [socket, userId]);

  useEffect(() => {
    socket.emit('joinRoom', roomName);
    socket.emit('findAllMessageByRoom', roomName);
    socket.on('newMessage', receiveMessage);

    return () => {
      socket.emit('leaveRoom', roomName);
      socket.off('newMessage', receiveMessage);
    }
  }, [socket, roomName, receiveMessage]);

  return (
    <ChatComponent
      messages={messages}
      handleSubmit={handleSubmit(sendMessage)}
      register={register}
      userId={userId}
    />
  );
};

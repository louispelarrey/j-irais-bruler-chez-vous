import { useState, useEffect, useCallback, useContext } from 'react';
import io from 'socket.io-client';
import { ChatComponent } from '../../components/Chat/ChatComponent';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../contexts/UserContext';
import getUserIdFromToken from '../../utils/user/getUserIdFromToken';
export interface ChatForm {
  newMessage: string;
}

export interface Message {
  username: string;
  userId: string;
  message: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {register, handleSubmit} = useForm<ChatForm>();
  const {token} = useContext(UserContext);
  const userId = getUserIdFromToken(token);
  const socket = io(':3001');

  const receiveMessage = useCallback((message: Message) => {
    setMessages([...messages, message]);
  }, [messages]);

  const sendMessage = useCallback(({newMessage}: ChatForm) => {
    socket.emit('sendMessage', {
      userId: userId,
      message: newMessage
    });

  }, [socket, userId]);

  useEffect(() => {
    socket.on('newMessage', receiveMessage);
    console.log('messages', messages)

    return () => {
      socket.off('newMessage', receiveMessage);
    };
  }, [receiveMessage, messages, socket]);

  return (
    <ChatComponent
      messages={messages}
      handleSubmit={handleSubmit(sendMessage)}
      register={register}
      userId={userId}
    />
  );
};

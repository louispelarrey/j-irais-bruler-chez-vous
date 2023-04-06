import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { ChatComponent } from '../../components/Chat/ChatComponent';
import { useForm } from 'react-hook-form';

export interface ChatForm {
  newMessage: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket] = useState(() => io(':3001'));
  const {register, handleSubmit} = useForm<ChatForm>();

  const messageListener = useCallback(({message}: {message: string}) => {
    setMessages([...messages, message]);
  }, [messages]);

  const sendMessage = useCallback(({newMessage}: ChatForm) => {
    socket.emit('sendMessage', { message: newMessage });
  }, [socket]);

  useEffect(() => {
    socket.on('newMessage', messageListener);

    return () => {
      socket.off('newMessage', messageListener);
    };
  }, [messageListener, messages, socket]);

  return (
    <ChatComponent
      messages={messages}
      handleSubmit={handleSubmit(sendMessage)}
      register={register}
    />
  );
};

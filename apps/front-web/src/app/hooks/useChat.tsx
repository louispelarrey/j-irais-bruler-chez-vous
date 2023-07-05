import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../contexts/UserContext';
import getUserIdFromToken from '../utils/user/getUserIdFromToken';
import { io } from 'socket.io-client';
import { transformApiResponse } from '../utils/message/transformApiResponse';

export interface ChatForm {
  newMessage: string;
}

export interface Message {
  id: string;
  username: string;
  userId: string;
  message: string;
  isReported: boolean;
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

interface ChatProps {
  roomName?: string;
}

type UserRole = 'USER';

export const useChat = ({ roomName = 'default' }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {register, handleSubmit, reset} = useForm<ChatForm>();
  const {token} = useContext(UserContext);
  const userId = getUserIdFromToken(token);
  const socket = useMemo(() => {
    // Socket.io instanciation
    return io(`${import.meta.env.VITE_APP_BACKEND_URL}`, {
      query: {
        roomName,
      },
    });
  }, [roomName]);

  const onNewMessage = useCallback((messages: ApiMessage | ApiMessage[]) => {
    const transformedMessages = transformApiResponse(messages);
    Array.isArray(transformedMessages)
      ? setMessages(transformedMessages)
      : setMessages((messages) => [...messages, transformedMessages]);
  }, []);

  const onModerateMessage = useCallback((messageId: string) => {
    //Change the message content to "This message has been moderated"
    setMessages((messages) =>
      messages.map((message) => {
        if (message.id === messageId) {
          return {
            ...message,
            message: 'Ce message a été modéré. Sachez aussi que l\'ia peut se montrer excessivement fragile, du coup sorry but not sorry.',
          };
        }
        return message;
      })
    );
  }, []);

  const sendMessage = useCallback(({ newMessage }: ChatForm) => {
    reset();
    socket && socket.emit('createMessage', {
      senderId: userId,
      message: newMessage,
      roomName,
    });
  },[reset, socket, userId, roomName]);

  const handleReport = useCallback((messageId: string) => {
    socket && socket.emit('reportMessage', {
      messageId
    });
  }, [socket]);

  useEffect(() => {
    socket.on('newMessage', onNewMessage);
    socket.on('moderateMessage', onModerateMessage);

    return () => {
      socket.off('newMessage', onNewMessage);
    };
  }, [onModerateMessage, onNewMessage, socket]);

  const scrollTarget = useRef<any>(null);

  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  return {
    messages,
    handleSubmit,
    register,
    scrollTarget,
    sendMessage,
    userId,
    handleReport,
  };
};

import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/UserContext";
import getUserIdFromToken from "../utils/user/getUserIdFromToken";
import { io } from "socket.io-client";
import { transformApiResponse } from "../utils/message/transformApiResponse";

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

interface ChatProps {
  roomName?: string;
}

type UserRole = 'USER';

export const useChat = ({ roomName = 'default' }: ChatProps) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const {register, handleSubmit} = useForm<ChatForm>();
  const {token} = useContext(UserContext);
  const userId = getUserIdFromToken(token);
  const socket = useMemo(() => {
    // Socket.io instanciation
    return io(':3001',
      {
        query: {
          roomName,
        },
      });
  }, [roomName]);

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
  }, [socket, userId, roomName]);

  useEffect(() => {
    socket.on('newMessage', onNewMessage);

    return () => {
      socket.off('newMessage', onNewMessage);
    };
  }, [onNewMessage, socket]);

  const scrollTarget = useRef<any>(null);

  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return {
    messages,
    handleSubmit,
    register,
    scrollTarget,
    sendMessage,
    userId
  }
};

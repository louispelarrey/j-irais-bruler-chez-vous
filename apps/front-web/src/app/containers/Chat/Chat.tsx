import { ChatComponent } from '../../components/Chat/ChatComponent';
import { useChat } from '../../hooks/useChat';

export interface ChatProps {
  roomName?: string;
}

export const Chat = ({ roomName = 'default' }: ChatProps) => {
  const { messages, userId, scrollTarget, handleSubmit, register, sendMessage } = useChat({
    roomName,
  });

  return (
    <ChatComponent
      messages={messages}
      handleSubmit={handleSubmit(sendMessage)}
      register={register}
      userId={userId}
      scrollTarget={scrollTarget}
      heightPercentage={100}
      widthPercentage={100}
    />
  );
};

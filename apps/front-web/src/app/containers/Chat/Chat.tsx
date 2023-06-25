import { ChatComponent } from '../../components/Chat/ChatComponent';
import { useChat } from '../../hooks/useChat';

interface ChatProps {
  roomName?: string;
  widthPercentage?: number;
  heightVh?: number;
}

export const Chat = ({roomName, widthPercentage, heightVh}: ChatProps) => {
  const { messages, userId, scrollTarget, handleSubmit, register, sendMessage } = useChat({
    roomName: roomName ?? 'default',
  });

  return (
    <ChatComponent
      messages={messages}
      handleSubmit={handleSubmit(sendMessage)}
      register={register}
      userId={userId}
      scrollTarget={scrollTarget}
      heightVh={heightVh ?? 100}
      widthPercentage={widthPercentage ?? 100}
    />
  );
};

import { ChatComponent } from '../../components/Chat/ChatComponent';
import { useChat } from '../../hooks/useChat';

export const Chat = () => {
  const { messages, userId, scrollTarget, handleSubmit, register, sendMessage } = useChat({
    roomName: 'default',
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

import { ApiMessage, Message } from '../../containers/Chat/Chat';

export const transformApiResponse = (
  apiMessages: ApiMessage | ApiMessage[]
): Message | Message[] => {
  if (Array.isArray(apiMessages)) {
    return apiMessages.map((apiMessage) => ({
      username: apiMessage.sender.username,
      userId: apiMessage.sender.id,
      message: apiMessage.message,
      createdAt: apiMessage.createdAt,
      updatedAt: apiMessage.updatedAt,
    }));
  }

  return {
    username: apiMessages.sender.username,
    userId: apiMessages.sender.id,
    message: apiMessages.message,
    createdAt: apiMessages.createdAt,
    updatedAt: apiMessages.updatedAt,
  };
};

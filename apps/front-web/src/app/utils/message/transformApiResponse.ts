import { ApiMessage, Message } from "../../hooks/useChat";

export const transformApiResponse = (
  apiMessages: ApiMessage | ApiMessage[]
): Message | Message[] => {
  if (Array.isArray(apiMessages)) {
    return apiMessages.map((apiMessage) => ({
      username: apiMessage.sender.username,
      userId: apiMessage.senderId,
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

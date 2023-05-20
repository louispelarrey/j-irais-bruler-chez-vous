import { ApiMessage, Message } from "../../hooks/useChat";

export const transformApiResponse = (
  apiMessages: ApiMessage | ApiMessage[]
): Message | Message[] => {
  if (Array.isArray(apiMessages)) {
    return apiMessages.map((apiMessage) => ({
      id: apiMessage.id,
      username: apiMessage.sender.username,
      userId: apiMessage.sender.id,
      message: apiMessage.message,
      createdAt: apiMessage.createdAt,
      updatedAt: apiMessage.updatedAt,
    }));
  }

  return {
    id: apiMessages.id,
    username: apiMessages.sender.username,
    userId: apiMessages.sender.id,
    message: apiMessages.message,
    createdAt: apiMessages.createdAt,
    updatedAt: apiMessages.updatedAt,
  };
};

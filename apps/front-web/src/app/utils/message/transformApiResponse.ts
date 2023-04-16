import { ApiMessage, Message } from "../../containers/Chat/Chat";

const transformApiResponse = (apiMessages: ApiMessage[]): Message[] => {
  return apiMessages.map((apiMessage) => ({
    username: apiMessage.sender.username,
    userId: apiMessage.sender.id,
    message: apiMessage.message,
  }));
}

export default transformApiResponse;

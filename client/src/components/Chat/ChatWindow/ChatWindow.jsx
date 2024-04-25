import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";

export const ChatWindow = () => {
  return (
    <div className="flex flex-col flex-grow rounded-lg shadow-lg">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
};

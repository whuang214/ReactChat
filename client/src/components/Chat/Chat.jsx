import { ChatWindow } from "./ChatWindow/ChatWindow";
import { ChatList } from "./ChatList";
import { SearchBar } from "./SearchBar";

export const Chat = () => {
  return (
    <div>
      <SearchBar />
      <ChatList />
      <ChatWindow />
    </div>
  );
};

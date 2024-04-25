import { ChatWindow } from "./ChatWindow/ChatWindow";
import { ChatList } from "./ChatList";
import { GroupList } from "./GroupList";
import { SearchBar } from "./SearchBar";

export const Chat = () => {
  return (
    <div className="flex flex-grow m-7 p-4 border-2 border-black">
      <div className="flex flex-col flex-grow">
        <SearchBar />
        <GroupList />
        <ChatList />
      </div>
      <div className="flex flex-col flex-grow">
        <ChatWindow />
      </div>
    </div>
  );
};

import { ChatWindow } from "./ChatWindow/ChatWindow";
import { ContactList } from "./ContactList";
import { GroupList } from "./GroupList";

export const Chat = () => {
  return (
    <div className="flex flex-grow m-7 ml-0">
      <div className="flex flex-col flex-grow p-4 rounded-lg mr-7">
        <GroupList />
        <ContactList />
      </div>
      <div className="flex flex-col flex-grow p-4 rounded-lg">
        <ChatWindow />
      </div>
    </div>
  );
};

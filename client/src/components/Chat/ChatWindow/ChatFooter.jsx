import { useState, useCallback } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export const ChatFooter = ({ handleMessageSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(() => {
    if (message.trim() !== "") {
      handleMessageSubmit(message);
      setMessage("");
    }
  }, [message, handleMessageSubmit]);

  return (
    <div className="flex items-center p-4 pb-5 rounded-xl">
      <input
        type="text"
        placeholder="Type your message here..."
        className="flex-grow pl-4 pr-2 py-3 rounded-full bg-gray-200 focus:outline-none mr-2" // Increased py-3 for larger text box
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <button
        className="btn-primary"
        onClick={handleSubmit}
        aria-label="Send Message"
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

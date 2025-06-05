import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import ChatHeader from "./ChatHeader";
import MessagesInput from "./MessagesInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
//optional
// import axios from "../lib/axios";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subsMessages,
    unsubsMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Optional : Context menu state
  // const [contextMenu, setContextMenu] = useState({
  //   visible: false,
  //   x: 0,
  //   y: 0,
  //   messageId: null,
  // });

  // const handleContextMenu = (e, messageId) => {
  //   e.preventDefault();
  //   setContextMenu({
  //     visible: true,
  //     x: e.pageX,
  //     y: e.pageY,
  //     messageId,
  //   });
  // };

  // const handleOutsideClick = () => {
  //   if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
  // };

  // const handleDelete = async () => {
  //   try {
  //     const { messageId } = contextMenu;
  //     await axios.delete(`/messages/${messageId}`);

  //     const socket = useChatStore.getState().socket;
  //     if (socket) socket.emit("delete message", messageId);

  //     useChatStore
  //       .getState()
  //       .setMessages((msgs) => msgs.filter((msg) => msg._id !== messageId));
  //   } catch (err) {
  //     console.error("Error deleting message:", err);
  //   } finally {
  //     setContextMenu({ visible: false, x: 0, y: 0, messageId: null });
  //   }
  // };

  useEffect(() => {
    getMessages(selectedUser._id);
    subsMessages();
    return () => unsubsMessages();
  }, [selectedUser._id, getMessages, subsMessages, unsubsMessages]);

  //optional
  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => document.removeEventListener("click", handleOutsideClick);
  // }, [contextMenu]);

  // useEffect(() => {
  //   if (messageEndRef.current) {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }

  // Scroll to the bottom when messages change : Optional
  //   const socket = useChatStore.getState().socket;
  //   if (!socket) return;

  //   const onMessageDeleted = (deletedId) => {
  //     useChatStore
  //       .getState()
  //       .setMessages((msgs) => msgs.filter((msg) => msg._id !== deletedId));
  //   };

  //   socket.on("message deleted", onMessageDeleted);
  //   return () => socket.off("message deleted", onMessageDeleted);
  // }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessagesInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 space-y-auto p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/dp.png"
                      : selectedUser.profilePic || "/dp.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "Just now"}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.text && (
                <img
                  src={message.image}
                  // alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* 👇 Context Menu */}
      {/* {contextMenu.visible && (
        <div
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          className="absolute bg-white shadow-md rounded px-4 py-2 z-50 border text-sm"
        >
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      )} */}

      <MessagesInput />
    </div>
  );
};

export default ChatContainer;

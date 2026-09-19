import { useState, useEffect, useRef } from "react";
import Spinner from "../components/Spinner";
import { useSocket } from "../context/useSocket";
import { useAuth } from "../context/useAuth";
import { getMessages, markMessagesRead } from "../services/message";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const { socket, setUnreadCount } = useSocket();
  const { user } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    getMessages()
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    markMessagesRead()
      .then(() => setUnreadCount(0))
      .catch((err) => console.log(err?.response?.data?.message));
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
      if (message.sender !== user?.id) {
        markMessagesRead();
      }
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [socket, user?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !socket) return;

    socket.emit("message:send", { text: trimmed });
    setText("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-[calc(100dvh-10rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="border-b border-border px-5 py-4">
        <h1 className="text-lg font-semibold text-heading">
          Chat with {user?.partner?.username}
        </h1>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <p className="m-auto text-sm text-muted">No messages yet. Say hi.</p>
        )}

        {messages.map((message) => {
          const isMine = message.sender === user?.id;
          return (
            <div
              key={message._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] break-words rounded-2xl px-4 py-2 text-sm ${
                  isMine
                    ? "rounded-br-sm bg-primary text-white"
                    : "rounded-bl-sm bg-background text-body"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`mt-1 text-right text-[10px] ${
                    isMine ? "text-white/70" : "text-muted"
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center gap-3 border-t border-border px-4 py-3"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
          placeholder="Write a message"
          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={!socket || !text.trim()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;

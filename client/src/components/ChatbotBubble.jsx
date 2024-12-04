import React, { useState } from "react";
import { FiMessageCircle, FiSend } from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";

export const ChatbotBubble = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I assist you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    const token = await getToken();

    // Create new message
    const userMessage = { role: "user", content: inputMessage.trim() };

    // Create updated messages array
    const updatedMessages = [...messages, userMessage];

    // Update state
    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: updatedMessages, // Use the updated messages array
        }),
      });

      const data = await response.json();
      const message = data.response.content;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: message || "Sorry, I couldn't process your request.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your message.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Bubble - Only show when chat is closed */}
      {!isChatOpen && (
        <div
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-50"
          onClick={toggleChat}
          title="Open Chatbot"
        >
          <FiMessageCircle size={28} />
        </div>
      )}

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 w-full h-[80vh] sm:h-96 sm:w-80 sm:bottom-20 sm:right-6 bg-base-100 rounded-none sm:rounded-lg shadow-xl flex flex-col z-40">
          {/* Header */}
          <div className="bg-primary text-white flex items-center justify-between p-4">
            <span className="text-lg font-bold">Chatbot</span>
            <button
              className="btn btn-sm btn-circle btn-error"
              onClick={toggleChat}
            >
              ✕
            </button>
          </div>

          {/* Chat History */}
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm">Typing...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer with Input */}
          <div className="p-4 bg-base-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="input input-bordered flex-1"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="btn btn-primary"
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

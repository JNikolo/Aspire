import React, { useState, useEffect, useRef } from "react";
import { FiMessageCircle, FiSend, FiTrash2 } from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";

const STORAGE_KEY = "chatbot_history";

export const ChatbotBubble = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    // Initialize messages from localStorage or use default message
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            role: "assistant",
            content: "Hi! How can I assist you today?",
            completed: true,
          },
        ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreamingIndex, setCurrentStreamingIndex] = useState(null);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const chatContainerRef = useRef(null);
  const { getToken } = useAuth();

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const clearHistory = () => {
    const initialMessage = {
      role: "assistant",
      content: "Chat history cleared. How can I help you?",
      completed: true,
    };
    setMessages([initialMessage]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([initialMessage]));
    setShowClearConfirmation(false);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateStreaming = async (fullMessage, messageIndex) => {
    setCurrentStreamingIndex(messageIndex);
    const chars = fullMessage.split("");
    let currentText = "";

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === messageIndex
            ? { ...msg, content: currentText, completed: false }
            : msg
        )
      );
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 20 + 10)
      );
    }

    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === messageIndex ? { ...msg, completed: true } : msg
      )
    );
    setCurrentStreamingIndex(null);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    const token = await getToken();

    const userMessage = {
      role: "user",
      content: inputMessage.trim(),
      completed: true,
    };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();
      const message = data.response.content;

      const newMessageIndex = updatedMessages.length;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          completed: false,
        },
      ]);

      setIsLoading(false);
      await simulateStreaming(
        message || "Sorry, I couldn't process your request.",
        newMessageIndex
      );
    } catch (error) {
      const errorMessage = "Sorry, there was an error processing your message.";
      const newMessageIndex = updatedMessages.length;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          completed: false,
        },
      ]);

      setIsLoading(false);
      await simulateStreaming(errorMessage, newMessageIndex);
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
      {/* Floating Chat Bubble */}
      {!isChatOpen && (
        <button
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary hover:bg-primary-focus text-primary-content rounded-full shadow-lg flex items-center justify-center cursor-pointer transform hover:scale-105 transition-all duration-200 ease-in-out z-50"
          onClick={toggleChat}
          title="Open Chatbot"
        >
          <FiMessageCircle size={32} className="animate-pulse" />
        </button>
      )}

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 w-full h-[80vh] sm:h-[32rem] sm:w-96 sm:bottom-20 sm:right-6 bg-base-100 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col z-40 border border-base-300 transform transition-all duration-200 ease-in-out">
          {/* Header */}
          <div className="bg-primary text-primary-content flex items-center justify-between px-6 py-4 rounded-t-2xl border-b border-primary-focus">
            <div className="flex items-center gap-3">
              <FiMessageCircle size={24} />
              <span className="text-lg font-bold">Chat Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-circle btn-sm btn-ghost hover:bg-primary-focus"
                onClick={() => setShowClearConfirmation(true)}
                title="Clear chat history"
              >
                <FiTrash2 size={16} />
              </button>
              <button
                className="btn btn-circle btn-sm btn-ghost hover:bg-primary-focus"
                onClick={toggleChat}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div
            ref={chatContainerRef}
            className="p-4 flex-1 overflow-y-auto bg-base-200/50"
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-fadeIn`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                      message.role === "user"
                        ? "bg-primary text-primary-content"
                        : "bg-base-100 text-base-content"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">
                      {message.content}
                      {currentStreamingIndex === index &&
                        !message.completed && (
                          <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                        )}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="bg-base-100 rounded-2xl px-4 py-3 shadow-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer with Input */}
          <div className="p-4 bg-base-100 border-t border-base-300 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="input input-bordered flex-1 focus:input-primary"
                disabled={isLoading || currentStreamingIndex !== null}
              />
              <button
                onClick={sendMessage}
                disabled={
                  isLoading ||
                  !inputMessage.trim() ||
                  currentStreamingIndex !== null
                }
                className="btn btn-primary"
                title="Send message"
              >
                <FiSend size={18} className={isLoading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear History Confirmation Modal */}
      {showClearConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Clear Chat History</h3>
            <p className="py-4">
              Are you sure you want to clear the chat history? This action
              cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowClearConfirmation(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={clearHistory}>
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

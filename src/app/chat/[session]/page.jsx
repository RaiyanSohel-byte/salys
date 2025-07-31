"use client";
import React, { Suspense, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';
import { useAxios } from '@/providers/AxiosProvider';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { MdArrowUpward, MdOutlineKeyboardVoice } from 'react-icons/md';
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import remarkGfm from 'remark-gfm';

// Loading component for Suspense
const ChatLoading = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <div className="text-center text-white">
      <div className="flex space-x-2 mb-4">
        <div className="w-4 h-4 bg-[#0059FF] rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-[#0059FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-4 h-4 bg-[#0059FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <p className="text-xl text-[#C5C5C5]">Loading your conversation...</p>
    </div>
  </div>
);

// Main chat session component
const ChatSession = () => {
  const params = useParams();
  const sessionId = params.session;
  console.log("Session ID:", sessionId);
  const axios = useAxios();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { message: "" },
  });

  const [chatData, setChatData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMessageId, setLoadingMessageId] = useState(null);

  // Fetch chat session data
  useEffect(() => {
    const fetchChatSession = async () => {
      if (!sessionId) return;

      try {
        setLoading(true);
        const response = await axios.get(`/api/therapy/sessions/${sessionId}/messages`);
        console.log("Chat session response:", response.data);

        if (response.status === 200) {
          const transformedMessages = [];

          if (Array.isArray(response.data)) {
            response.data.forEach((item) => {
              transformedMessages.push({
                id: `user-${item.id}`,
                message: item.user_message,
                sender: "user",
                status: "success",
                timestamp: item.timestamp,
              });

              transformedMessages.push({
                id: `bot-${item.id}`,
                message: item.ai_response,
                sender: "bot",
                status: "success",
                timestamp: item.timestamp,
              });
            });
          }

          setMessages(transformedMessages);
          setChatData({
            id: sessionId,
            createdAt: response.data[0]?.timestamp || new Date().toISOString(),
          });
        } else {
          setError('Failed to load chat session');
        }
      } catch (err) {
        console.error('Error fetching chat session:', err);
        setError(err.response?.data?.message || 'Failed to load chat session');
      } finally {
        setLoading(false);
      }
    };

    fetchChatSession();
  }, [sessionId, axios]);

  // Send new message
  const onSubmit = async (data) => {
    if (!data.message.trim()) return;

    const userMessageId = Date.now();
    const newUserMessage = {
      id: userMessageId,
      message: data.message,
      sender: "user",
      status: "success",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    const botMessageId = userMessageId + 1;
    setLoadingMessageId(botMessageId);
    const loadingBotMessage = {
      id: botMessageId,
      message: "",
      sender: "bot",
      status: "loading",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, loadingBotMessage]);
    reset();

    try {
      console.log("Sending message:", data.message);
      console.log("Session ID:", sessionId);
      const response = await axios.post(`/api/therapy/chat/`, {
        message: data.message,
        session_id: sessionId,
      });

      if (response.status === 200 || response.status === 201) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? {
                  ...msg,
                  message: response.data.response.text,
                  status: "success",
                }
              : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? {
                  ...msg,
                  message: "Error sending message",
                  status: "error",
                }
              : msg
          )
        );
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                message: "Network error. Please try again.",
                status: "error",
              }
            : msg
        )
      );
      console.error("Error sending message:", error);
    } finally {
      setLoadingMessageId(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  if (loading) return <ChatLoading />;

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-xl text-[#C5C5C5] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#0059FF] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .markdown-content ol, .markdown-content ul {
          padding-left: 20px; /* Ensure proper indentation */
          margin: 0; /* Reset default margins */
        }
        .markdown-content li {
          margin-bottom: 8px; /* Consistent spacing */
        }
        .markdown-content p {
          margin: 0 0 10px; /* Spacing between paragraphs */
        }
      `}</style>

      <main className="h-screen w-full flex flex-col relative overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-52">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              {messages.length === 0 ? (
                <div className="text-center text-[#C5C5C5] py-8">
                  <p>No messages in this session yet.</p>
                  <p className="text-sm mt-2">Start the conversation below!</p>
                </div>
              ) : (
                messages.map((item) => (
                  <div
                    key={item.id}
                    className={`flex animate-fadeInUp ${
                      item.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`text-start max-w-2xl p-3 rounded-lg markdown-content ${
                        item.sender === "user"
                          ? "bg-[#0059FF24] text-white ml-auto"
                          : "bg-[#FFFFFF1A] text-white mr-auto"
                      }`}
                    >
                      {item.status === "loading" ? (
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-300">Thinking...</span>
                        </div>
                      ) : (
                        <div>
                          {item.sender === "bot" ? (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p({ children }) {
                                  return <p className="mb-4">{children}</p>; 
                                },
                                ol({ children }) {
                                  return <ol className="list-decimal">{children}</ol>; 
                                },
                                ul({ children }) {
                                  return <ul className="list-disc">{children}</ul>; 
                                },
                                li({ children }) {
                                  return <li className="ml-4">{children}</li>; 
                                },
                              }}
                            >
                              {console.log("Raw Bot message content:", item.message) || item.message}
                            </ReactMarkdown>
                          ) : (
                            <p className="text-lg">{item.message}</p>
                          )}
                          {item.timestamp && (
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(item.timestamp).toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Input Form - Fixed at bottom */}
        <div className="-translate-x-1/2 -translate-y-1/3 absolute bottom-5 left-1/2 transform w-full px-6 z-50">
          <form className="lg:w-[920px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <Input
                {...register("message")}
                className="py-10 pr-20 text-white w-full bg-[#FFFFFF33] outline-none border-0 backdrop-blur-md  border-white/20"
                type="text"
                placeholder="Continue the conversation..."
                autofill="off"
                autoComplete="off"
               
                onKeyPress={handleKeyPress}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4 text-2xl text-gray-800">
                {/* <MdOutlineKeyboardVoice className="cursor-pointer text-white" /> */}
                <MdArrowUpward
                  className="bg-gray-400 text-white rounded-sm p-1 cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

// Main page component with Suspense
const Page = () => {
  return (
    <>
      <Suspense fallback={<ChatLoading />}>
        <ChatSession />
      </Suspense>
    </>
  );
};

export default Page;
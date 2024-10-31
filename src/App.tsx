import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ModelSelector } from './components/ModelSelector';
import { Sparkles } from 'lucide-react';
import type { Chat, Message } from './types';

function App() {
  const [chats, setChats] = useState<Chat[]>([{
    id: 1,
    title: 'New Chat',
    timestamp: new Date().toLocaleTimeString(),
    model: 'gpt-4',
    messages: [{
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
      type: 'text'
    }]
  }]);
  const [activeChat, setActiveChat] = useState(1);

  const handleSendMessage = (text: string, imageFile?: File) => {
    const messages: Message[] = [];

    if (imageFile) {
      messages.push({
        id: Date.now(),
        text: text || 'Uploaded image',
        isBot: false,
        timestamp: new Date().toLocaleTimeString(),
        type: 'image',
        imageUrl: URL.createObjectURL(imageFile)
      });
    }

    if (text.trim()) {
      messages.push({
        id: Date.now() + 1,
        text,
        isBot: false,
        timestamp: new Date().toLocaleTimeString(),
        type: 'text'
      });
    }

    const botMessage: Message = {
      id: Date.now() + 2,
      text: "I'm a demo chat interface. To make me functional, you'll need to integrate with an AI backend service.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
      type: 'text'
    };

    messages.push(botMessage);

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, ...messages] }
          : chat
      )
    );
  };

  const handleFileUpload = async (file: File) => {
    // This is now handled in the ChatInput component
  };

  const handleNewChat = () => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    const newChat: Chat = {
      id: Date.now(),
      title: 'New Chat',
      timestamp: new Date().toLocaleTimeString(),
      model: currentChat?.model || 'gpt-4',
      messages: []
    };
    setChats(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
  };

  const handleDeleteChat = (id: number) => {
    setChats(prev => prev.filter(chat => chat.id !== id));
    if (activeChat === id) {
      setActiveChat(chats[0]?.id);
    }
  };

  const handleCodeEdit = (messageId: number, newCode: string) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChat
          ? {
              ...chat,
              messages: chat.messages.map(msg =>
                msg.id === messageId ? { ...msg, text: newCode } : msg
              )
            }
          : chat
      )
    );
  };

  const handleModelChange = (model: string) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChat ? { ...chat, model } : chat
      )
    );
  };

  const currentChat = chats.find(chat => chat.id === activeChat);

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-500" />
            <h1 className="text-xl font-semibold">
              {currentChat?.title || 'AI Chat Assistant'}
            </h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto relative">
          {currentChat && (
            <ModelSelector
              model={currentChat.model}
              onModelChange={handleModelChange}
            />
          )}
          <div className="max-w-3xl mx-auto divide-y pt-12">
            {currentChat?.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onCodeEdit={handleCodeEdit}
              />
            ))}
          </div>
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
}

export default App;
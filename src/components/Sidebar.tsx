import React from 'react';
import { PlusCircle, MessageSquare, X } from 'lucide-react';
import type { Chat } from '../types';

interface SidebarProps {
  chats: Chat[];
  activeChat: number;
  onChatSelect: (id: number) => void;
  onNewChat: () => void;
  onDeleteChat: (id: number) => void;
}

export function Sidebar({ chats, activeChat, onChatSelect, onNewChat, onDeleteChat }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 m-4 p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        <span>New Chat</span>
      </button>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-800 transition-colors ${
              activeChat === chat.id ? 'bg-gray-800' : ''
            }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="flex-1 truncate">{chat.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { Bot, User } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  onCodeEdit?: (messageId: number, newCode: string) => void;
}

export function ChatMessage({ message, onCodeEdit }: ChatMessageProps) {
  const renderContent = () => {
    switch (message.type) {
      case 'code':
        return (
          <CodeBlock
            code={message.text}
            language={message.language || 'plaintext'}
            onEdit={onCodeEdit ? (newCode) => onCodeEdit(message.id, newCode) : undefined}
          />
        );
      case 'image':
        return (
          <img
            src={message.imageUrl}
            alt="Uploaded content"
            className="max-w-full rounded-lg"
          />
        );
      default:
        return <p className="text-gray-700 leading-relaxed">{message.text}</p>;
    }
  };

  return (
    <div className={`flex gap-4 p-6 ${message.isBot ? 'bg-gray-50' : 'bg-white'}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.isBot ? 'bg-emerald-500' : 'bg-violet-500'
        }`}
      >
        {message.isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">{message.isBot ? 'AI Assistant' : 'You'}</span>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
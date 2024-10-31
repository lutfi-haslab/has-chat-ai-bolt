import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { FileUpload } from './FileUpload';
import type { ImagePreview } from '../types';

interface ChatInputProps {
  onSendMessage: (message: string, imageFile?: File) => void;
  onFileUpload: (file: File) => void;
}

export function ChatInput({ onSendMessage, onFileUpload }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || imagePreview) {
      onSendMessage(message, imagePreview?.file);
      setMessage('');
      setImagePreview(null);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setImagePreview({
        url: URL.createObjectURL(file),
        file
      });
      onFileUpload(file);
    }
  };

  const clearImagePreview = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview.url);
      setImagePreview(null);
    }
  };

  return (
    <div className="border-t bg-white">
      {imagePreview && (
        <div className="max-w-3xl mx-auto p-4 border-b">
          <div className="relative inline-block">
            <img
              src={imagePreview.url}
              alt="Preview"
              className="max-h-48 rounded-lg"
            />
            <button
              onClick={clearImagePreview}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="max-w-3xl mx-auto flex gap-4">
          <FileUpload onFileSelect={handleFileSelect} />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={imagePreview ? "Add a message about this image..." : "Type your message..."}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim() && !imagePreview}
            className="bg-violet-500 text-white p-3 rounded-lg hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
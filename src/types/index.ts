export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
  type: 'text' | 'code' | 'image';
  language?: string;
  imageUrl?: string;
}

export interface Chat {
  id: number;
  title: string;
  timestamp: string;
  model: string;
  messages: Message[];
}

export interface ImagePreview {
  url: string;
  file: File;
}
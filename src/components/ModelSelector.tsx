import React from 'react';
import { Cpu } from 'lucide-react';

interface ModelSelectorProps {
  model: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ model, onModelChange }: ModelSelectorProps) {
  const models = [
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    { id: 'claude-2', name: 'Claude 2' },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 bg-white border-b z-10">
      <div className="max-w-3xl mx-auto px-6 py-2 flex items-center gap-2">
        <Cpu className="w-4 h-4 text-violet-500" />
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          className="text-sm border-0 focus:ring-0 text-gray-600 cursor-pointer hover:text-gray-900"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
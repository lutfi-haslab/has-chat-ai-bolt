import React, { useState } from 'react';
import { Check, Copy, Edit2 } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  onEdit?: (newCode: string) => void;
}

export function CodeBlock({ code, language, onEdit }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCode, setEditedCode] = useState(code);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onEdit?.(editedCode);
    setIsEditing(false);
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-sm text-gray-400">{language}</span>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className="p-4">
          <textarea
            value={editedCode}
            onChange={(e) => setEditedCode(e.target.value)}
            className="w-full bg-gray-800 text-white font-mono p-2 rounded"
            rows={code.split('\n').length}
          />
          <div className="flex justify-end mt-2 gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-violet-500 text-white rounded hover:bg-violet-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <pre className="p-4 text-white overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
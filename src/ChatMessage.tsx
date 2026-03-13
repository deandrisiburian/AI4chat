import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  modelName?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  timestamp,
  modelName,
}) => {
  const isUser = role === 'user';

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    // Handle code blocks
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.slice(3, -3);
        const firstNewline = codeContent.indexOf('\n');
        const language = firstNewline > 0 ? codeContent.slice(0, firstNewline).trim() : '';
        const code = firstNewline > 0 ? codeContent.slice(firstNewline + 1) : codeContent;
        
        return (
          <div key={index} className="my-3 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
            {language && (
              <div className="px-4 py-2 bg-gray-800 text-xs text-gray-400 border-b border-gray-700">
                {language}
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">{code}</code>
            </pre>
          </div>
        );
      }
      
      // Handle inline formatting
      return (
        <span key={index} className="whitespace-pre-wrap">
          {part.split(/(\*\*.*?\*\*|\`.*?\`)/g).map((segment, i) => {
            if (segment.startsWith('**') && segment.endsWith('**')) {
              return <strong key={i} className="font-semibold">{segment.slice(2, -2)}</strong>;
            }
            if (segment.startsWith('`') && segment.endsWith('`')) {
              return (
                <code key={i} className="px-1.5 py-0.5 bg-gray-700 rounded text-sm text-purple-300">
                  {segment.slice(1, -1)}
                </code>
              );
            }
            return segment;
          })}
        </span>
      );
    });
  };

  return (
    <div className={`flex items-start gap-4 mb-6 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
            : 'bg-gradient-to-br from-purple-500 to-pink-500'
        }`}
      >
        {isUser ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : ''}`}>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {isUser ? (
            <>
              <span className="text-xs text-gray-500">
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="font-medium text-blue-400">You</span>
            </>
          ) : (
            <>
              <span className="font-medium text-purple-400">{modelName || 'Assistant'}</span>
              <span className="text-xs text-gray-500">
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </>
          )}
        </div>
        <div
          className={`inline-block rounded-2xl px-4 py-3 max-w-full ${
            isUser
              ? 'bg-blue-600 text-white rounded-tr-md'
              : 'bg-gray-800 text-gray-100 rounded-tl-md'
          }`}
        >
          <div className={`text-sm leading-relaxed ${isUser ? '' : 'prose prose-invert prose-sm max-w-none'}`}>
            {renderContent(content)}
          </div>
        </div>
      </div>
    </div>
  );
};

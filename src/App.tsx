import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { WelcomeScreen } from './components/WelcomeScreen';
import { sendChatMessage, checkHealth, Message } from './api/chat';
import { modelProviders } from './data/models';

interface ChatMessageType {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

function App() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check server health on mount
  useEffect(() => {
    const checkServer = async () => {
      const isHealthy = await checkHealth();
      setServerStatus(isHealthy ? 'online' : 'offline');
    };
    checkServer();
    
    // Check every 30 seconds
    const interval = setInterval(checkServer, 30000);
    return () => clearInterval(interval);
  }, []);

  const getModelDisplayName = (modelId: string): string => {
    for (const provider of modelProviders) {
      const model = provider.models.find(m => m.id === modelId);
      if (model) return model.name;
    }
    return modelId;
  };

  const getProviderForModel = (modelId: string): string => {
    for (const provider of modelProviders) {
      const model = provider.models.find(m => m.id === modelId);
      if (model) return provider.name;
    }
    return 'Unknown';
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    setError(null);

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build messages array for API
      const apiMessages: Message[] = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));
      apiMessages.push({ role: 'user', content: content.trim() });

      const response = await sendChatMessage(apiMessages, selectedModel);

      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.choices[0].message.content,
        timestamp: new Date(),
        model: selectedModel,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      // Add error message to chat
      const errorMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ **Error:** ${errorMessage}\n\nPlease make sure the backend server is running:\n\`\`\`bash\nnode server/index.js\n\`\`\``,
        timestamp: new Date(),
        model: selectedModel,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        onNewChat={handleNewChat}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          selectedModel={selectedModel}
          modelName={getModelDisplayName(selectedModel)}
          provider={getProviderForModel(selectedModel)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          serverStatus={serverStatus}
        />

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen 
              onSelectModel={setSelectedModel}
              onSelectPrompt={handleSelectPrompt}
            />
          ) : (
            <div className="max-w-4xl mx-auto py-6 px-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  model={message.model}
                  modelName={message.model ? getModelDisplayName(message.model) : undefined}
                />
              ))}
              {isLoading && (
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-purple-400">{getModelDisplayName(selectedModel)}</span>
                      <span className="text-xs text-gray-500">typing...</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={serverStatus === 'offline'}
        />

        {/* Server Status Warning */}
        {serverStatus === 'offline' && (
          <div className="bg-red-900/50 border-t border-red-700 px-4 py-3 text-center">
            <p className="text-red-300 text-sm">
              ⚠️ Backend server is offline. Run <code className="bg-red-800 px-2 py-0.5 rounded">node server/index.js</code> to start.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

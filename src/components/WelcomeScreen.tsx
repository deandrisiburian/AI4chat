import React from 'react';

interface WelcomeScreenProps {
  onSelectModel: (model: string) => void;
  onSelectPrompt: (prompt: string) => void;
}

const featuredModels = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', icon: '🟢', description: 'Fast and efficient' },
  { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5', provider: 'Anthropic', icon: '🟠', description: 'Quick responses' },
  { id: 'gemini-2.5-flash-preview', name: 'Gemini 2.5 Flash', provider: 'Google', icon: '🔵', description: 'Multimodal AI' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', icon: '🟣', description: 'Advanced reasoning' },
  { id: 'llama-v3.3-70b', name: 'Llama 3.3 70B', provider: 'Meta', icon: '🔴', description: 'Open source' },
  { id: 'grok-2', name: 'Grok 2', provider: 'xAI', icon: '⚫', description: 'Real-time knowledge' },
];

const samplePrompts = [
  { icon: '💡', text: 'Explain quantum computing in simple terms' },
  { icon: '📝', text: 'Write a creative short story about time travel' },
  { icon: '💻', text: 'Help me debug a React component' },
  { icon: '🎨', text: 'Suggest color palettes for a modern website' },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectModel, onSelectPrompt }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          Welcome to AI4Chat
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Access 100+ AI models from OpenAI, Anthropic, Google, Meta, and more — all in one place.
        </p>
      </div>

      {/* Featured Models */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
          Featured Models
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {featuredModels.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelectModel(model.id)}
              className="flex items-start gap-3 p-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-purple-500 rounded-xl transition-all text-left group"
            >
              <span className="text-2xl">{model.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate group-hover:text-purple-400 transition-colors">
                  {model.name}
                </h3>
                <p className="text-xs text-gray-500">{model.provider}</p>
                <p className="text-xs text-gray-400 mt-1">{model.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sample Prompts */}
      <div className="w-full max-w-2xl">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
          Try a Prompt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {samplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onSelectPrompt(prompt.text)}
              className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 rounded-xl transition-all text-left"
            >
              <span className="text-xl">{prompt.icon}</span>
              <span className="text-sm text-gray-300">{prompt.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 mt-12 text-center">
        <div>
          <div className="text-2xl font-bold text-purple-400">100+</div>
          <div className="text-xs text-gray-500">AI Models</div>
        </div>
        <div className="w-px h-8 bg-gray-700"></div>
        <div>
          <div className="text-2xl font-bold text-pink-400">25+</div>
          <div className="text-xs text-gray-500">Providers</div>
        </div>
        <div className="w-px h-8 bg-gray-700"></div>
        <div>
          <div className="text-2xl font-bold text-orange-400">Free</div>
          <div className="text-xs text-gray-500">To Use</div>
        </div>
      </div>
    </div>
  );
};

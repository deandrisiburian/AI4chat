import React, { useState } from 'react';
import { modelProviders } from '../data/models';

interface SidebarProps {
  isOpen: boolean;
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onNewChat: () => void;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  selectedModel,
  onSelectModel,
  onNewChat,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set(['OpenAI', 'Anthropic', 'Google']));

  const toggleProvider = (providerName: string) => {
    setExpandedProviders(prev => {
      const next = new Set(prev);
      if (next.has(providerName)) {
        next.delete(providerName);
      } else {
        next.add(providerName);
      }
      return next;
    });
  };

  const filteredProviders = modelProviders.map(provider => ({
    ...provider,
    models: provider.models.filter(model =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.id.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(provider => provider.models.length > 0);

  const totalModels = modelProviders.reduce((sum, p) => sum + p.models.length, 0);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-gray-800 border-r border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-0 lg:overflow-hidden'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="font-bold text-lg">AI4Chat</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={`Search ${totalModels} models...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Model List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {filteredProviders.map(provider => (
            <div key={provider.name} className="mb-2">
              <button
                onClick={() => toggleProvider(provider.name)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${provider.color}`}>{provider.icon}</span>
                  <span>{provider.name}</span>
                  <span className="text-xs text-gray-500">({provider.models.length})</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedProviders.has(provider.name) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedProviders.has(provider.name) && (
                <div className="ml-2 mt-1 space-y-0.5">
                  {provider.models.map(model => (
                    <button
                      key={model.id}
                      onClick={() => onSelectModel(model.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                        selectedModel === model.id
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{model.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-500 text-center">
            {totalModels} models available
          </div>
        </div>
      </aside>
    </>
  );
};

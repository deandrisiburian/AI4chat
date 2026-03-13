export interface Model {
  id: string;
  name: string;
}

export interface ModelProvider {
  name: string;
  models: Model[];
  icon: string;
  color: string;
}

export const modelProviders: ModelProvider[] = [
  {
    name: 'OpenAI',
    icon: '🤖',
    color: 'from-green-500 to-emerald-600',
    models: [
      { id: 'gpt-3.5', name: 'ChatGPT (GPT 3.5)' },
      { id: 'gpt-4o-mini', name: 'GPT 4o Mini' },
      { id: 'gpt-4.1', name: 'GPT 4.1' },
      { id: 'gpt-4.1-mini', name: 'GPT 4.1 Mini' },
      { id: 'gpt-4.1-nano', name: 'GPT 4.1 Nano' },
      { id: 'codex-mini', name: 'Codex Mini' },
      { id: 'o3-mini', name: 'o3-mini' },
      { id: 'o4-mini', name: 'o4 Mini' },
      { id: 'o4-mini-high', name: 'o4 Mini High' },
      { id: 'o3-mini-high', name: 'o3-mini-high' },
      { id: 'gpt-5-mini', name: 'GPT-5 Mini' },
      { id: 'gpt-5-nano', name: 'GPT-5 Nano' },
      { id: 'gpt-5', name: 'GPT-5' },
      { id: 'gpt-5.1', name: 'GPT 5.1' },
    ],
  },
  {
    name: 'Anthropic',
    icon: '🧠',
    color: 'from-orange-500 to-amber-600',
    models: [
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
      { id: 'claude-3.5-haiku', name: 'Claude 3.5 Haiku' },
      { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5' },
    ],
  },
  {
    name: 'Google',
    icon: '🔮',
    color: 'from-blue-500 to-indigo-600',
    models: [
      { id: 'gemini-flash-lite-2.0', name: 'Gemini Flash Lite 2.0' },
      { id: 'gemini-flash-2.0', name: 'Gemini Flash 2.0' },
      { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite' },
      { id: 'gemini-2.5-flash-preview', name: 'Gemini 2.5 Flash Preview' },
      { id: 'gemma-2-9b', name: 'Gemma 2 9B' },
      { id: 'gemma-2-27b', name: 'Gemma 2 27B' },
      { id: 'gemma-3-27b', name: 'Gemma 3 27B' },
      { id: 'gemini-3-flash', name: 'Gemini 3 Flash' },
    ],
  },
  {
    name: 'DeepSeek',
    icon: '🔍',
    color: 'from-purple-500 to-violet-600',
    models: [
      { id: 'deepseek-v3', name: 'DeepSeek V3' },
      { id: 'deepseek-v3.1', name: 'DeepSeek v3.1' },
      { id: 'deepseek-v3.2', name: 'DeepSeek v3.2' },
      { id: 'r1-distill-qwen-1.5b', name: 'R1 Distill Qwen 1.5B' },
      { id: 'r1-distill-qwen-14b', name: 'R1 Distill Qwen 14B' },
      { id: 'r1-distill-qwen-32b', name: 'R1 Distill Qwen 32B' },
      { id: 'r1-distill-llama-70b', name: 'R1 Distill Llama 70B' },
      { id: 'r1', name: 'R1' },
    ],
  },
  {
    name: 'Meta',
    icon: '🦙',
    color: 'from-sky-500 to-cyan-600',
    models: [
      { id: 'llama-v3-8b', name: 'Llama v3 8B' },
      { id: 'llama-v3-70b', name: 'Llama v3 70B' },
      { id: 'llama-v3.1-8b', name: 'Llama v3.1 8B' },
      { id: 'llama-v3.1-70b', name: 'Llama v3.1 70B' },
      { id: 'llama-v3.1-405b', name: 'Llama v3.1 405B' },
      { id: 'llama-v3.2-1b', name: 'Llama v3.2 1B' },
      { id: 'llama-v3.2-3b', name: 'Llama v3.2 3B' },
      { id: 'llama-v3.2-11b', name: 'Llama v3.2 11B' },
      { id: 'llama-v3.2-90b', name: 'Llama v3.2 90B' },
      { id: 'llama-v3.3-70b', name: 'Llama v3.3 70B' },
      { id: 'llama-4-scout', name: 'Llama 4 Scout' },
      { id: 'llama-4-maverick', name: 'Llama 4 Maverick' },
    ],
  },
  {
    name: 'Mistral',
    icon: '💨',
    color: 'from-rose-500 to-pink-600',
    models: [
      { id: 'mistral-7b-instruct', name: 'Mistral 7B Instruct' },
      { id: 'mixtral-8x7b-instruct', name: 'Mixtral 8x7B Instruct' },
      { id: 'mixtral-8x22b-instruct', name: 'Mixtral 8x22B Instruct' },
      { id: 'mistral-nemo', name: 'Mistral Nemo' },
      { id: 'mistral-large-2', name: 'Mistral Large 2' },
      { id: 'mistral-large-3', name: 'Mistral Large 3' },
      { id: 'mistral-small-3', name: 'Mistral Small 3' },
      { id: 'codestral', name: 'Codestral' },
      { id: 'devstral-small-1.1', name: 'Devstral Small 1.1' },
      { id: 'devstral-medium', name: 'Devstral Medium' },
    ],
  },
  {
    name: 'Alibaba Cloud',
    icon: '☁️',
    color: 'from-orange-400 to-red-500',
    models: [
      { id: 'qwen-2.5-7b', name: 'Qwen 2.5 7B' },
      { id: 'qwen-2.5-72b', name: 'Qwen 2.5 72B' },
      { id: 'qwen-2.5-coder-32b', name: 'Qwen 2.5 Coder 32B' },
      { id: 'qwen-3-14b', name: 'Qwen 3 14B' },
      { id: 'qwen-3-32b', name: 'Qwen 3 32B' },
      { id: 'qwen-plus', name: 'Qwen Plus' },
      { id: 'qwen-max', name: 'Qwen Max' },
      { id: 'qwq-32b', name: 'QwQ 32B' },
    ],
  },
  {
    name: 'xAI',
    icon: '⚡',
    color: 'from-gray-700 to-gray-900',
    models: [
      { id: 'grok-2', name: 'Grok 2' },
      { id: 'grok-3-mini-beta', name: 'Grok 3 Mini Beta' },
      { id: 'grok-4-fast', name: 'Grok 4 Fast' },
      { id: 'grok-code-fast-1', name: 'Grok Code Fast 1' },
      { id: 'grok-4.1-fast', name: 'Grok 4.1 Fast' },
    ],
  },
  {
    name: 'Cohere',
    icon: '🌀',
    color: 'from-teal-500 to-emerald-600',
    models: [
      { id: 'command', name: 'Command' },
      { id: 'command-r', name: 'Command R' },
      { id: 'command-r7b', name: 'Command R7B' },
      { id: 'command-r-plus', name: 'Command R+' },
      { id: 'command-a', name: 'Command A' },
    ],
  },
  {
    name: 'Microsoft',
    icon: '🪟',
    color: 'from-blue-600 to-blue-800',
    models: [
      { id: 'phi-3-mini-instruct', name: 'Phi-3 Mini Instruct' },
      { id: 'phi-3.5-mini-128k-instruct', name: 'Phi-3.5 Mini 128K' },
      { id: 'phi-4-reasoning-plus', name: 'Phi 4 Reasoning Plus' },
      { id: 'wizardlm-2-8x22b', name: 'WizardLM-2 8x22B' },
      { id: 'phi-4', name: 'Phi 4' },
    ],
  },
  {
    name: 'MiniMax',
    icon: '🔷',
    color: 'from-indigo-500 to-purple-600',
    models: [
      { id: 'minimax-01', name: 'MiniMax-01' },
      { id: 'minimax-m1', name: 'MiniMax M1' },
      { id: 'minimax-m2', name: 'MiniMax M2' },
      { id: 'minimax-m2.1', name: 'MiniMax M2.1' },
      { id: 'minimax-m2.5', name: 'MiniMax M2.5' },
    ],
  },
  {
    name: 'Perplexity',
    icon: '🔎',
    color: 'from-cyan-500 to-blue-600',
    models: [
      { id: 'sonar', name: 'Sonar' },
      { id: 'sonar-reasoning', name: 'Sonar Reasoning' },
    ],
  },
  {
    name: 'Amazon',
    icon: '📦',
    color: 'from-yellow-500 to-orange-600',
    models: [
      { id: 'nova-lite-1.0', name: 'Nova Lite 1.0' },
      { id: 'nova-micro-1.0', name: 'Nova Micro 1.0' },
      { id: 'nova-pro-1.0', name: 'Nova Pro 1.0' },
      { id: 'nova-premier-1.0', name: 'Nova Premier 1.0' },
      { id: 'nova-2-lite', name: 'Nova 2 Lite' },
    ],
  },
  {
    name: 'Z.AI',
    icon: '🎯',
    color: 'from-red-500 to-rose-600',
    models: [
      { id: 'glm-4-32b', name: 'GLM 4 32B' },
      { id: 'glm-4.5-air', name: 'GLM 4.5 Air' },
      { id: 'glm-4.5', name: 'GLM 4.5' },
      { id: 'glm-4.6', name: 'GLM 4.6' },
      { id: 'glm-5', name: 'GLM 5' },
    ],
  },
];

export const getAllModels = () => {
  return modelProviders.flatMap((provider) =>
    provider.models.map((model) => ({
      ...model,
      provider: provider.name,
      icon: provider.icon,
      color: provider.color,
    }))
  );
};

export const getModelById = (id: string) => {
  for (const provider of modelProviders) {
    const model = provider.models.find((m) => m.id === id);
    if (model) {
      return {
        ...model,
        provider: provider.name,
        icon: provider.icon,
        color: provider.color,
      };
    }
  }
  return null;
};

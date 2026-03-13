// @ts-ignore
const API_BASE = import.meta.env?.PROD ? '' : 'http://localhost:3001';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function sendChatMessage(
  messages: Message[],
  model: string
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, model }),
  });

  const result: ApiResponse<ChatResponse> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to get response');
  }

  return result.data;
}

export async function getModels(): Promise<{
  models: any[];
  modelList: Record<string, Record<string, string>>;
}> {
  const response = await fetch(`${API_BASE}/api/models`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch models');
  }

  return {
    models: result.data,
    modelList: result.modelList,
  };
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    const result = await response.json();
    return result.success;
  } catch {
    return false;
  }
}

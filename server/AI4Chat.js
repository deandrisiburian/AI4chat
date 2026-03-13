const axios = require('axios');
const crypto = require('crypto');
const cheerio = require('cheerio');
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');

class AI4Chat {
    constructor() {
        this.initialize = false;
        
        this.inst = axios.create({
            baseURL: 'https://ai4chat.co',
            headers: {
                accept: '*/*',
                'content-type': 'application/json',
                origin: 'https://ai4chat.co',
                referer: 'https://ai4chat.co/',
                'user-agent': 'Mozilla/5.0 (Linux; Android 15; SM-F958 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.86 Mobile Safari/537.36'
            }
        });
        
        this.inst.interceptors.response.use(res => {
            const cookies = res.headers['set-cookie'];
            if (cookies?.length) this.inst.defaults.headers.common['cookie'] = cookies.map(c => c.split(';')[0]).join('; ');
            return res;
        });
        
        this.modelList = {
            'OpenAI': {
                'gpt-3.5': 'ChatGPT (GPT 3.5)',
                'gpt-4o-mini': 'GPT 4o Mini',
                'gpt-4.1': 'GPT 4.1',
                'gpt-4.1-mini': 'GPT 4.1 Mini',
                'gpt-4.1-nano': 'GPT 4.1 Nano',
                'codex-mini': 'Codex Mini',
                'o3-mini': 'o3-mini',
                'o4-mini': 'o4 Mini',
                'o4-mini-high': 'o4 Mini High',
                'o3-mini-high': 'o3-mini-high',
                'gpt-oss-20b': 'GPT OSS 20B',
                'gpt-oss-120b': 'GPT OSS 120B',
                'gpt-5-mini': 'GPT-5 Mini',
                'gpt-5-nano': 'GPT-5 Nano',
                'gpt-5.1-codex-mini': 'GPT 5.1 Codex-Mini',
                'gpt-5': 'GPT-5',
                'gpt-5.1-codex': 'GPT 5.1 Codex',
                'gpt-5.1': 'GPT 5.1',
            },
            'Anthropic': {
                'claude-3-haiku': 'Claude 3 Haiku',
                'claude-3.5-haiku': 'Claude 3.5 Haiku',
                'claude-haiku-4.5': 'Claude Haiku 4.5',
            },
            'Google': {
                'gemini-flash-lite-2.0': 'Gemini Flash Lite 2.0',
                'gemini-flash-2.0': 'Gemini Flash 2.0',
                'gemini-2.5-flash-lite': 'Gemini 2.5 Flash Lite',
                'gemini-2.5-flash-preview': 'Gemini 2.5 Flash Preview',
                'gemini-2.5-flash-preview-thinking': 'Gemini 2.5 Flash Preview (thinking)',
                'gemma-2-9b': 'Gemma 2 9B',
                'gemma-2-27b': 'Gemma 2 27B',
                'gemma-3-27b': 'Gemma 3 27B',
                'gemini-3-flash': 'Gemini 3 Flash',
            },
            'DeepSeek': {
                'deepseek-v3': 'DeepSeek V3',
                'deepseek-v3.1': 'DeepSeek v3.1',
                'deepseek-v3.2': 'DeepSeek v3.2',
                'r1-distill-qwen-1.5b': 'R1 Distill Qwen 1.5B',
                'r1-distill-qwen-14b': 'R1 Distill Qwen 14B',
                'r1-distill-qwen-32b': 'R1 Distill Qwen 32B',
                'r1-distill-llama-70b': 'R1 Distill Llama 70B',
                'r1': 'R1',
            },
            'Meta': {
                'llama-v3-8b': 'Llama v3 8B',
                'llama-v3-70b': 'Llama v3 70B',
                'llama-v3.1-8b': 'Llama v3.1 8B',
                'llama-v3.1-70b': 'Llama v3.1 70B',
                'llama-v3.1-405b': 'Llama v3.1 405B',
                'llama-v3.2-1b': 'Llama v3.2 1B',
                'llama-v3.2-3b': 'Llama v3.2 3B',
                'llama-v3.2-11b': 'Llama v3.2 11B',
                'llama-v3.2-90b': 'Llama v3.2 90B',
                'llama-v3.3-70b': 'Llama v3.3 70B',
                'llama-4-scout': 'Llama 4 Scout',
                'llama-4-maverick': 'Llama 4 Maverick',
            },
            'Mistral': {
                'mistral-7b-instruct': 'Mistral 7B Instruct',
                'mistral-7b-instruct-v0.1': 'Mistral 7B Instruct v0.1',
                'mistral-7b-instruct-v0.3': 'Mistral 7B Instruct v0.3',
                'mixtral-8x7b-instruct': 'Mixtral 8x7B Instruct',
                'mixtral-8x22b-instruct': 'Mixtral 8x22B Instruct',
                'mistral-nemo': 'Mistral Nemo',
                'mistral-large-2': 'Mistral Large 2',
                'mistral-large-3': 'Mistral Large 3',
                'ministral-3b': 'Ministral 3B',
                'ministral-8b': 'Ministral 8B',
                'pixtral-12b': 'Pixtral 12B',
                'mistral-small-3': 'Mistral Small 3',
                'mistral-small-3.1-24b': 'Mistral Small 3.1 24B',
                'mistral-small-3.2-24b': 'Mistral Small 3.2 24B',
                'mistral-medium-3': 'Mistral Medium 3',
                'codestral': 'Codestral',
                'saba': 'Saba',
                'devstral-small-1.1': 'Devstral Small 1.1',
                'devstral-medium': 'Devstral Medium',
                'devstral-2': 'Devstral 2',
                'ministral-3-3b': 'Ministral 3 3B',
                'ministral-3-8b': 'Ministral 3 8B',
                'ministral-3-14b': 'Ministral 3 14B',
            },
            'AI21': {
                'jamba-mini-1.7': 'Jamba Mini 1.7',
                'jamba-large-1.7': 'Jamba Large 1.7',
            },
            'Amazon': {
                'nova-lite-1.0': 'Nova Lite 1.0',
                'nova-micro-1.0': 'Nova Micro 1.0',
                'nova-pro-1.0': 'Nova Pro 1.0',
                'nova-premier-1.0': 'Nova Premier 1.0',
                'nova-2-lite': 'Nova 2 Lite',
            },
            'Alibaba Cloud': {
                'qwen-2.5-7b': 'Qwen 2.5 7B',
                'qwen-2.5-72b': 'Qwen 2.5 72B',
                'qwen-2.5-coder-32b': 'Qwen 2.5 Coder 32B',
                'qwen-2.5-32b': 'Qwen 2.5 32B',
                'qwen-3-14b': 'Qwen 3 14B',
                'qwen-3-32b': 'Qwen 3 32B',
                'qwen-3-30b-a3b': 'Qwen 3 30B A3B',
                'qwen-3-235b-a22b': 'Qwen 3 235B A22B',
                'qwen-plus': 'Qwen Plus',
                'qwen-max': 'Qwen Max',
                'qwen-turbo': 'Qwen Turbo',
                'qwq-32b': 'QwQ 32B',
                'qwen-3-max-thinking': 'Qwen 3 Max Thinking',
                'qwen-3-coder-next': 'Qwen 3 Coder Next',
                'qwen-3.5-397b-a17b': 'Qwen 3.5 397B A17B',
                'qwen-3.5-plus': 'Qwen 3.5 Plus',
            },
            'Cohere': {
                'command': 'Command',
                'command-r': 'Command R',
                'command-r7b': 'Command R7B',
                'command-r-plus': 'Command R+',
                'command-a': 'Command A',
            },
            'Dolphin': {
                'dolphin-2.9.2-mixtral-8x22b': 'Dolphin 2.9.2 Mixtral 8x22B',
            },
            'Inception': {
                'inception-mercury': 'Inception Mercury',
            },
            'Inflection AI': {
                'inflection-3-pi': 'Inflection 3 Pi',
                'inflection-3-productivity': 'Inflection 3 Productivity',
            },
            'Liquid': {
                'lfm-3b': 'LFM 3B',
                'lfm-7b': 'LFM 7B',
                'lfm2-2.6b': 'LFM2 2.6B',
                'lfm2-8b': 'LFM2 8B',
            },
            'Magnum': {
                'magnum-v4-72b': 'Magnum v4 72B',
            },
            'Microsoft': {
                'phi-3-mini-instruct': 'Phi-3 Mini Instruct',
                'phi-3.5-mini-128k-instruct': 'Phi-3.5 Mini 128K Instruct',
                'phi-3-medium-instruct': 'Phi-3 Medium Instruct',
                'phi-4-reasoning-plus': 'Phi 4 Reasoning Plus',
                'wizardlm-2-8x22b': 'WizardLM-2 8x22B',
                'phi-4': 'Phi 4',
            },
            'Midnight Rose': {
                'midnight-rose-70b': 'Midnight Rose 70B',
            },
            'MiniMax': {
                'minimax-01': 'MiniMax-01',
                'minimax-m1': 'MiniMax M1',
                'minimax-m2': 'MiniMax M2',
                'minimax-m2.1': 'MiniMax M2.1',
                'minimax-m2.5': 'MiniMax M2.5',
            },
            'MoonshotAI': {
                'kimi-k2': 'Kimi K2',
                'kimi-k2-thinking': 'Kimi K2 Thinking',
            },
            'MythoMax': {
                'mythomax-13b': 'MythoMax 13B',
            },
            'Noromaid': {
                'noromaid-20b': 'Noromaid 20B',
            },
            'NousResearch': {
                'hermes-2-pro-llama-3-8b': 'Hermes 2 Pro - Llama-3 8B',
                'hermes-2-mistral-7b-dpo': 'Hermes 2 - Mistral 7B DPO',
                'hermes-2-mixtral-8x7b-dpo': 'Hermes 2 Mixtral 8x7B DPO',
                'hermes-3-70b-instruct': 'Hermes 3 70B Instruct',
                'hermes-3-405b-instruct': 'Hermes 3 405B Instruct',
            },
            'NVIDIA': {
                'nvidia-llama-3.1-nemotron-70b': 'NVIDIA Llama 3.1 Nemotron 70B',
            },
            'Perplexity': {
                'sonar': 'Sonar',
                'sonar-reasoning': 'Sonar Reasoning',
            },
            'Rocinante': {
                'rocinante-12b': 'Rocinante 12B',
                'unslopnemo-v4.1': 'UnslopNemo v4.1',
            },
            'xAI': {
                'grok-2': 'Grok 2',
                'grok-3-mini-beta': 'Grok 3 Mini Beta',
                'grok-4-fast': 'Grok 4 Fast',
                'grok-code-fast-1': 'Grok Code Fast 1',
                'grok-4.1-fast': 'Grok 4.1 Fast',
            },
            'Z.AI': {
                'glm-4-32b': 'GLM 4 32B',
                'glm-4.5-air': 'GLM 4.5 Air',
                'glm-4.5': 'GLM 4.5',
                'glm-4.6': 'GLM 4.6',
                'glm-4.7-flash': 'GLM 4.7 Flash',
                'glm-5': 'GLM 5',
            },
        };
    }
    
    async register() {
        try {
            const { data: html } = await this.inst.get('/register');
            
            const registerId = html.match(/\/register\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i)?.[1];
            if (!registerId) throw new Error('Failed to retrieve UUID register from HTML.');
            
            const $ = cheerio.load(html);
            const question = $('#captcha-question').text().trim();
            const match = question.match(/(\d+)\s*([+\-*])\s*(\d+)/);
            if (!match) throw new Error(`Failed to parse captcha: "${question}".`);
            
            const [, a, op, b] = match;
            const captchaAnswer = String({ '+': +a + +b, '-': +a - +b, '*': +a * +b }[op]);
            
            const prefix = uniqueNamesGenerator({
                dictionaries: [adjectives, animals],
                separator: '',
                length: 2,
                style: 'lowerCase'
            }) + Math.floor(Math.random() * 1000);
            const email = `${prefix}@gmail.com`;
            const password = crypto.randomBytes(8).toString('hex');
            
            await this.inst.post(`/register/${registerId}`, {
                name: prefix,
                email,
                password,
                password2: password,
                captchaAnswer
            });
            
            this.initialize = true;
            console.log(`[AI4Chat] Registered new account: ${email}`);
            return { email, password, name: prefix };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async models() {
        const created = Math.floor(Date.now() / 1000);
        return Object.entries(this.modelList).flatMap(([owned_by, models]) =>
            Object.keys(models).map(id => ({
                id,
                object: 'model',
                created,
                owned_by,
                aliases: []
            }))
        );
    }
    
    resolveModel(modelId) {
        for (const models of Object.values(this.modelList)) {
            if (models[modelId]) return models[modelId];
        }
        return null;
    }
    
    async chat({ messages, model = 'gpt-3.5', ...conf } = {}) {
        try {
            if (!Array.isArray(messages)) throw new Error('Messages must be an array.');
            if (messages.some(m => Array.isArray(m.content) && m.content.some(p => p.type !== 'text'))) throw new Error('Only text inputs are supported.');
            
            const modelName = this.resolveModel(model);
            if (!modelName) {
                const allIds = Object.values(this.modelList).flatMap(m => Object.keys(m));
                throw new Error(`Model "${model}" not found. Available models: ${allIds.join(', ')}.`);
            }
            
            if (!this.initialize) await this.register();
            
            const { data } = await this.inst.post('/chatgpt', {
                chatid: crypto.randomUUID(),
                aiengine: modelName,
                conversation: messages,
                branches: [messages.map((m, i) => ({
                    id: i + 1,
                    sender: m.role,
                    text: m.content,
                    messageSentBy: m.role,
                    messageContent: m.content
                }))],
                activeBranchIndex: 0,
                timezoneOffset: -420,
                language: 'English',
                tone: 'Default',
                wordcount: 'Default',
                googleSearchStatus: false,
                humanizerStatus: false,
                ...conf
            });
            
            if (data?.includes('You do not have enough credits for this generation. Please review your credit balance.')) {
                console.log('[AI4Chat] Credits exhausted, re-registering...');
                await this.register();
                return this.chat({ messages, model, ...conf });
            }
            
            const promptText = messages.map(m => m.content).join(' ');
            const promptTokens = Math.ceil(promptText.length / 4);
            const completionTokens = Math.ceil(data.length / 4);
            
            return {
                id: `chatcmpl-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`,
                object: 'chat.completion',
                created: Math.floor(Date.now() / 1000),
                model,
                choices: [
                    {
                        index: 0,
                        message: {
                            role: 'assistant',
                            content: data,
                        },
                        finish_reason: 'stop',
                    }
                ],
                usage: {
                    prompt_tokens: promptTokens,
                    completion_tokens: completionTokens,
                    total_tokens: promptTokens + completionTokens,
                }
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AI4Chat;

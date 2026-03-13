# AI4Chat - Multi-Model AI Chat Interface

A beautiful web interface to chat with 100+ AI models from OpenAI, Anthropic, Google, Meta, Mistral, xAI, and more.

![AI4Chat](https://img.shields.io/badge/Models-100+-purple)
![Providers](https://img.shields.io/badge/Providers-25+-pink)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- 🤖 **100+ AI Models** - Access models from OpenAI, Anthropic, Google, DeepSeek, Meta, Mistral, xAI, and more
- 🎨 **Beautiful UI** - Modern dark theme with smooth animations
- 🔍 **Model Search** - Quickly find any model by name
- 💬 **Chat History** - Maintain conversation context
- ⚡ **Auto-registration** - Automatically handles API registration and credit refresh
- 📱 **Responsive** - Works on desktop and mobile

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Frontend

```bash
npm run build
```

### 3. Start Backend Server

```bash
node server/index.js
```

The application will be available at **http://localhost:3001**

## Development Mode

To run frontend and backend separately for development:

### Terminal 1 - Backend Server
```bash
node server/index.js
```

### Terminal 2 - Frontend Dev Server
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/models` | List all available models |
| POST | `/api/chat` | Send a chat message |
| GET | `/api/health` | Check server status |

### Chat Request Example

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

## Project Structure

```
├── server/
│   ├── index.js        # Express server with API routes
│   └── AI4Chat.js      # AI4Chat client class
├── src/
│   ├── api/
│   │   └── chat.ts     # Frontend API client
│   ├── components/
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── WelcomeScreen.tsx
│   ├── data/
│   │   └── models.ts   # Model definitions
│   └── App.tsx         # Main application
├── dist/               # Built frontend (served by Express)
└── package.json
```

## Available Models

### OpenAI
- GPT-3.5, GPT-4o Mini, GPT-4.1, o3-mini, o4-mini, and more

### Anthropic
- Claude 3 Haiku, Claude 3.5 Haiku, Claude Haiku 4.5

### Google
- Gemini Flash 2.0, Gemini 2.5 Flash, Gemma 2/3

### DeepSeek
- DeepSeek V3, R1, R1 Distill variants

### Meta
- Llama 3.x series (8B to 405B), Llama 4 Scout/Maverick

### Mistral
- Mistral 7B, Mixtral 8x7B/8x22B, Codestral, and more

### xAI
- Grok 2, Grok 3/4 variants

...and many more from AI21, Amazon, Alibaba Cloud, Cohere, Microsoft, NVIDIA, Perplexity, etc.

## How It Works

1. **Frontend** - React + Vite + Tailwind CSS for the UI
2. **Backend** - Express.js server that proxies requests to AI4Chat
3. **Auto-registration** - The server automatically registers new accounts when needed
4. **Credit Management** - Automatically re-registers when credits are exhausted

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |

## License

MIT

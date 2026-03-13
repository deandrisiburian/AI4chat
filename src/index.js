const express = require('express');
const cors = require('cors');
const path = require('path');
const AI4Chat = require('./AI4Chat');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize AI4Chat instance
const ai = new AI4Chat();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Serve static files from dist folder in production
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes

// Get available models
app.get('/api/models', async (req, res) => {
    try {
        const models = await ai.models();
        res.json({
            success: true,
            data: models,
            modelList: ai.modelList
        });
    } catch (error) {
        console.error('[API] Error fetching models:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, model } = req.body;
        
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({
                success: false,
                error: 'Messages array is required'
            });
        }
        
        console.log(`[API] Chat request - Model: ${model}, Messages: ${messages.length}`);
        
        const response = await ai.chat({ messages, model });
        
        res.json({
            success: true,
            data: response
        });
    } catch (error) {
        console.error('[API] Chat error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        initialized: ai.initialize,
        timestamp: new Date().toISOString()
    });
});

// Serve frontend for any other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════╗
║           AI4Chat Server Running                 ║
╠══════════════════════════════════════════════════╣
║  Local:   http://localhost:${PORT}                  ║
║  API:     http://localhost:${PORT}/api              ║
╠══════════════════════════════════════════════════╣
║  Endpoints:                                      ║
║    GET  /api/models  - List available models     ║
║    POST /api/chat    - Send chat message         ║
║    GET  /api/health  - Health check              ║
╚══════════════════════════════════════════════════╝
    `);
});

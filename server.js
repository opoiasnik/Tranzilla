const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Tranzilla configuration
const TRANZILLA_CONFIG = {
    terminal: 'myloai',
    currency: '2'
};

// Generate simple thtk token
function generateThtk() {
    // Простая генерация токена - timestamp + случайная строка
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(16).toString('hex');
    return `${timestamp}_${randomString}`;
}

// Handshake endpoint
app.post('/api/tranzila/handshake', (req, res) => {
    try {
        const { sum, currency, orderid } = req.body;
        
        // Validate required parameters
        if (!sum || !currency || !orderid) {
            return res.status(400).json({
                error: 'Missing required parameters: sum, currency, orderid'
            });
        }
        
        // Log the request for debugging
        console.log('Handshake request:', { sum, currency, orderid });
        
        // Generate thtk
        const thtk = generateThtk();
        
        // Return successful response
        const response = {
            success: true,
            thtk: thtk,
            timestamp: new Date().toISOString(),
            orderid: orderid
        };
        
        console.log('Handshake response:', response);
        
        res.json(response);
        
    } catch (error) {
        console.error('Handshake error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        server: 'Tranzilla Local Server'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Tranzilla Local Server is running',
        endpoints: {
            handshake: 'POST /api/tranzila/handshake',
            health: 'GET /health'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Tranzilla server running on http://localhost:${PORT}`);
    console.log(`📝 Handshake endpoint: http://localhost:${PORT}/api/tranzila/handshake`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;

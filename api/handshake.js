import crypto from 'crypto';

// Generate simple thtk token
function generateThtk() {
    // Простая генерация токена - timestamp + случайная строка
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(16).toString('hex');
    return `${timestamp}_${randomString}`;
}

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
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
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Handshake error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}

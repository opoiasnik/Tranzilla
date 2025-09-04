export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    res.status(200).json({
        message: 'Tranzilla Server is running on Vercel',
        endpoints: {
            handshake: 'POST /api/handshake',
            health: 'GET /api/health'
        },
        timestamp: new Date().toISOString()
    });
}

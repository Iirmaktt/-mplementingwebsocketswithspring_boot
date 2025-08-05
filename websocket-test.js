#!/usr/bin/env node

const WebSocket = require('ws');

// WebSocket test script
const ws = new WebSocket('ws://localhost:8080/ws/shapes');

console.log('🔌 WebSocket Test Script');
console.log('Connecting to ws://localhost:8080/ws/shapes...');

ws.on('open', function open() {
    console.log('✅ Connected to WebSocket!');
    
    // Send a test message
    const testMessage = {
        circles: 2,
        rectangles: 3,
        triangles: 1
    };
    
    console.log('📤 Sending test message:', JSON.stringify(testMessage));
    ws.send(JSON.stringify({
        destination: '/app/initializeShapes',
        body: JSON.stringify(testMessage)
    }));
});

ws.on('message', function message(data) {
    console.log('📥 Received message:');
    try {
        const parsed = JSON.parse(data.toString());
        console.log('   Shapes count:', parsed.length);
        console.log('   Moving shapes:', parsed.filter(s => s.isMoving).length);
        if (parsed.length > 0) {
            console.log('   First shape:', {
                id: parsed[0].id,
                type: parsed[0].type,
                position: `(${parsed[0].x.toFixed(1)}, ${parsed[0].y.toFixed(1)})`,
                moving: parsed[0].isMoving
            });
        }
    } catch (e) {
        console.log('   Raw data:', data.toString());
    }
});

ws.on('error', function error(err) {
    console.log('❌ WebSocket error:', err.message);
});

ws.on('close', function close() {
    console.log('🔌 WebSocket connection closed');
});

// Auto-close after 10 seconds
setTimeout(() => {
    console.log('⏰ Auto-closing connection...');
    ws.close();
    process.exit(0);
}, 10000); 
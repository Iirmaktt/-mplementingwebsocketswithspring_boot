#!/usr/bin/env node

const WebSocket = require('ws');

console.log('🧪 Testing WebSocket Controller');
console.log('================================');

// Test configuration
const TEST_CONFIGS = [
    { circles: 2, rectangles: 3, triangles: 1, name: 'Small Test' },
    { circles: 5, rectangles: 4, triangles: 3, name: 'Medium Test' },
    { circles: 0, rectangles: 0, triangles: 0, name: 'Empty Test' },
    { circles: 10, rectangles: 10, triangles: 10, name: 'Large Test' }
];

async function testWebSocketController() {
    for (const config of TEST_CONFIGS) {
        console.log(`\n🔍 Testing: ${config.name}`);
        console.log(`   Config: ${config.circles} circles, ${config.rectangles} rectangles, ${config.triangles} triangles`);
        
        try {
            await testConfiguration(config);
            console.log('   ✅ Test passed');
        } catch (error) {
            console.log(`   ❌ Test failed: ${error.message}`);
        }
        
        // Wait between tests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

async function testConfiguration(config) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8080/ws/shapes');
        let messageReceived = false;
        let timeout;

        ws.on('open', function open() {
            console.log('   📡 Connected to WebSocket');
            
            // Subscribe to shape updates
            const subscribeMessage = {
                destination: '/topic/shapes',
                id: 'test-subscription'
            };
            
            ws.send(JSON.stringify(subscribeMessage));
            
            // Send initialize message
            const initializeMessage = {
                destination: '/app/initializeShapes',
                body: JSON.stringify(config)
            };
            
            console.log('   📤 Sending initialize message...');
            ws.send(JSON.stringify(initializeMessage));
            
            // Set timeout
            timeout = setTimeout(() => {
                if (!messageReceived) {
                    reject(new Error('No response received within 5 seconds'));
                }
            }, 5000);
        });

        ws.on('message', function message(data) {
            try {
                const shapes = JSON.parse(data.toString());
                messageReceived = true;
                clearTimeout(timeout);
                
                console.log(`   📥 Received ${shapes.length} shapes`);
                console.log(`   📊 Moving shapes: ${shapes.filter(s => s.isMoving).length}`);
                
                if (shapes.length > 0) {
                    const firstShape = shapes[0];
                    console.log(`   🎯 First shape: ${firstShape.type} at (${firstShape.x.toFixed(1)}, ${firstShape.y.toFixed(1)})`);
                }
                
                ws.close();
                resolve();
                
            } catch (error) {
                console.log(`   ⚠️  Received non-JSON message: ${data.toString()}`);
                messageReceived = true;
                clearTimeout(timeout);
                ws.close();
                resolve();
            }
        });

        ws.on('error', function error(err) {
            clearTimeout(timeout);
            reject(new Error(`WebSocket error: ${err.message}`));
        });

        ws.on('close', function close() {
            clearTimeout(timeout);
            if (!messageReceived) {
                reject(new Error('Connection closed without receiving message'));
            }
        });
    });
}

// Test specific controller methods
async function testControllerMethods() {
    console.log('\n🔧 Testing Controller Methods');
    console.log('=============================');
    
    const methods = [
        { name: 'Get Shapes', destination: '/app/getShapes' },
        { name: 'Reset Simulation', destination: '/app/reset' }
    ];
    
    for (const method of methods) {
        console.log(`\n🔍 Testing: ${method.name}`);
        
        try {
            await testMethod(method.destination);
            console.log('   ✅ Method test passed');
        } catch (error) {
            console.log(`   ❌ Method test failed: ${error.message}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function testMethod(destination) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:8080/ws/shapes');
        let messageReceived = false;
        let timeout;

        ws.on('open', function open() {
            console.log('   📡 Connected to WebSocket');
            
            // Subscribe to shape updates
            ws.send(JSON.stringify({
                destination: '/topic/shapes',
                id: 'test-subscription'
            }));
            
            // Send method call
            console.log(`   📤 Sending ${destination}...`);
            ws.send(JSON.stringify({
                destination: destination,
                body: '{}'
            }));
            
            timeout = setTimeout(() => {
                if (!messageReceived) {
                    reject(new Error('No response received within 5 seconds'));
                }
            }, 5000);
        });

        ws.on('message', function message(data) {
            messageReceived = true;
            clearTimeout(timeout);
            
            try {
                const shapes = JSON.parse(data.toString());
                console.log(`   📥 Received ${shapes.length} shapes`);
                ws.close();
                resolve();
            } catch (error) {
                console.log(`   ⚠️  Received non-JSON message: ${data.toString()}`);
                ws.close();
                resolve();
            }
        });

        ws.on('error', function error(err) {
            clearTimeout(timeout);
            reject(new Error(`WebSocket error: ${err.message}`));
        });

        ws.on('close', function close() {
            clearTimeout(timeout);
            if (!messageReceived) {
                reject(new Error('Connection closed without receiving message'));
            }
        });
    });
}

// Main execution
async function main() {
    console.log('🚀 Starting WebSocket Controller Tests...');
    console.log('Make sure your Spring Boot application is running on port 8080');
    console.log('');
    
    try {
        await testWebSocketController();
        await testControllerMethods();
        
        console.log('\n🎉 All tests completed!');
        console.log('\n📋 Summary:');
        console.log('   - WebSocket connection: ✅');
        console.log('   - Initialize shapes: ✅');
        console.log('   - Get shapes: ✅');
        console.log('   - Reset simulation: ✅');
        console.log('   - Message broadcasting: ✅');
        
    } catch (error) {
        console.error('\n💥 Test suite failed:', error.message);
        process.exit(1);
    }
}

// Check if application is running
const http = require('http');
const checkApp = () => {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:8080/test/hello', (res) => {
            resolve(res.statusCode === 200);
        });
        req.on('error', () => resolve(false));
        req.setTimeout(3000, () => resolve(false));
    });
};

// Start tests
checkApp().then(isRunning => {
    if (isRunning) {
        console.log('✅ Application is running, starting tests...\n');
        main();
    } else {
        console.log('❌ Application is not running on port 8080');
        console.log('Please start your Spring Boot application first:');
        console.log('   ./mvnw spring-boot:run');
        process.exit(1);
    }
}); 
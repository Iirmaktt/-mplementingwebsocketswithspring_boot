# WebSocket Connection Guide

## Overview
This guide explains how the WebSocket connection is configured and how to troubleshoot connection issues between the React frontend and Spring Boot backend.

## Architecture

### Backend (Spring Boot - Port 8080)
- **WebSocket Endpoint**: `/ws/shapes`
- **STOMP Configuration**: Enabled with message broker
- **CORS**: Configured to allow all origins
- **SockJS**: Enabled for fallback support

### Frontend (React - Port 3000/3001)
- **WebSocket Client**: SockJS client
- **STOMP Protocol**: Manual STOMP frame handling
- **Connection URL**: `http://localhost:8080/ws/shapes` (development)

## Configuration

### 1. Backend Configuration (`WebSocketConfig.java`)
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/shapes")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
}
```

### 2. Frontend Configuration (`constants.js`)
```javascript
const getWebSocketEndpoint = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8080/ws/shapes';
  }
  return '/ws/shapes';
};

export const WEBSOCKET_CONFIG = {
  ENDPOINT: getWebSocketEndpoint(),
  // ... other config
};
```

## Connection Flow

### 1. Initial Connection
```
Frontend → SockJS → Backend (Port 8080)
```

### 2. STOMP Handshake
```
1. WebSocket Opens
2. Send STOMP CONNECT frame
3. Receive STOMP CONNECTED frame
4. Connection established
```

### 3. Message Exchange
```
Frontend → STOMP SEND → Backend
Backend → STOMP MESSAGE → Frontend
```

## Troubleshooting

### 1. Connection Issues

#### Problem: "Connection refused"
**Solution**: Ensure backend is running on port 8080
```bash
# Check if server is running
curl -I http://localhost:8080

# Start the server if needed
cd /path/to/simsoft
./mvnw spring-boot:run
```

#### Problem: "InvalidStateError: The connection has not been established yet"
**Solution**: This was fixed by adding proper connection state management
- Added `stompConnected` state
- Added delays before sending STOMP frames
- Improved error handling

#### Problem: CORS errors
**Solution**: Backend is configured with `setAllowedOriginPatterns("*")`
- Check browser console for CORS errors
- Ensure backend CORS configuration is correct

### 2. Development vs Production

#### Development
- Frontend: `http://localhost:3000` (React dev server)
- Backend: `http://localhost:8080` (Spring Boot)
- WebSocket: `http://localhost:8080/ws/shapes`

#### Production
- Both frontend and backend on same server
- WebSocket: `/ws/shapes` (relative path)

### 3. Debugging Tools

#### Browser Developer Tools
1. **Network Tab**: Monitor WebSocket connections
2. **Console**: Check for connection logs
3. **Application Tab**: View WebSocket frames

#### Frontend Debug Components
- **WebSocketDebug**: Shows connection status and messages
- **Debug Controls**: Manual test buttons
- **Console Logs**: Detailed connection information

### 4. Common Issues and Solutions

#### Issue: Frontend can't connect to backend
**Check**:
1. Backend server is running on port 8080
2. No firewall blocking port 8080
3. WebSocket endpoint is accessible: `curl http://localhost:8080/ws/shapes`

#### Issue: STOMP connection fails
**Check**:
1. STOMP CONNECT frame is properly formatted
2. Backend STOMP configuration is correct
3. CORS is properly configured

#### Issue: Messages not received
**Check**:
1. Subscription to correct topic (`/topic/shapes`)
2. Backend is sending messages to correct topic
3. STOMP MESSAGE frame parsing is correct

## Testing

### 1. Manual Testing
```bash
# Test backend endpoint
curl -I http://localhost:8080/ws/shapes

# Test WebSocket connection
wscat -c ws://localhost:8080/ws/shapes
```

### 2. Frontend Testing
1. Open browser developer tools
2. Check console for connection logs
3. Use WebSocketDebug component
4. Test manual buttons (Initialize, Reset, Get Shapes)

### 3. Backend Testing
```bash
# Test STOMP endpoint
curl -X POST http://localhost:8080/app/initializeShapes \
  -H "Content-Type: application/json" \
  -d '{"circles": 5, "rectangles": 3, "triangles": 2}'
```

## Monitoring

### 1. Connection Status
- **WebSocket Status**: Shows if SockJS connection is established
- **STOMP Status**: Shows if STOMP protocol handshake is complete
- **Message Count**: Number of messages received

### 2. Error Handling
- **Connection Errors**: Logged to console
- **STOMP Errors**: Handled with proper error states
- **Message Parsing Errors**: Logged with raw message data

### 3. Performance
- **Reconnection**: Automatic reconnection on disconnect
- **Heartbeat**: STOMP heartbeat to maintain connection
- **Message Queuing**: Messages queued when connection not ready

## Best Practices

### 1. Connection Management
- Always check connection state before sending messages
- Handle connection errors gracefully
- Implement automatic reconnection

### 2. Message Handling
- Validate message format before parsing
- Handle STOMP frame parsing errors
- Log raw messages for debugging

### 3. Error Handling
- Provide user-friendly error messages
- Log detailed error information for debugging
- Implement fallback mechanisms

## Configuration Reference

### Frontend Constants (`constants.js`)
```javascript
export const WEBSOCKET_CONFIG = {
  ENDPOINT: getWebSocketEndpoint(),
  TOPICS: {
    SHAPES: '/topic/shapes',
    DEBUG: '/topic/debug'
  },
  DESTINATIONS: {
    INITIALIZE: '/app/initializeShapes',
    RESET: '/app/reset',
    GET_SHAPES: '/app/getShapes'
  },
  RECONNECT_DELAY: 5000,
  HEARTBEAT_INTERVAL: 10000
};
```

### Backend Configuration (`application.properties`)
```properties
# WebSocket configuration
spring.websocket.enabled=true
```

## Next Steps

1. **Production Deployment**: Configure for same-server deployment
2. **Load Testing**: Test with multiple concurrent connections
3. **Security**: Implement authentication for WebSocket connections
4. **Monitoring**: Add connection health monitoring
5. **Error Recovery**: Implement more sophisticated error recovery 
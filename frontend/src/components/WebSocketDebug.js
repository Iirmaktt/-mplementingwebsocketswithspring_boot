import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { WEBSOCKET_CONFIG } from '../utils/constants';

const WebSocketDebug = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [stompConnected, setStompConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [testResult, setTestResult] = useState('');

  useEffect(() => {
    const sock = new SockJS(WEBSOCKET_CONFIG.ENDPOINT);
    setSocket(sock);
    
    sock.onopen = () => {
      console.log('Debug WebSocket connected');
      setConnected(true);
      setMessages(prev => [...prev, 'Connected to WebSocket']);
      
      // Wait before sending STOMP CONNECT
      setTimeout(() => {
        try {
          const connectFrame = `CONNECT
accept-version:1.2
heart-beat:${WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL},${WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL}

\0`;
          sock.send(connectFrame);
          setMessages(prev => [...prev, 'Sent STOMP CONNECT']);
        } catch (err) {
          console.error('Error sending STOMP CONNECT:', err);
          setMessages(prev => [...prev, `Error sending STOMP CONNECT: ${err}`]);
        }
      }, 100);
    };
    
    sock.onclose = () => {
      console.log('Debug WebSocket disconnected');
      setConnected(false);
      setStompConnected(false);
      setMessages(prev => [...prev, 'Disconnected from WebSocket']);
    };
    
    sock.onerror = (error) => {
      console.log('Debug WebSocket error:', error);
      setMessages(prev => [...prev, `Error: ${error}`]);
    };
    
    sock.onmessage = (event) => {
      console.log('Debug received:', event.data);
      setMessages(prev => [...prev, `Received: ${event.data}`]);
      
      // Handle STOMP frames
      const lines = event.data.split('\n');
      if (lines[0] === 'CONNECTED') {
        console.log('STOMP connection established');
        setStompConnected(true);
        setMessages(prev => [...prev, 'STOMP connection established']);
      }
    };
    
    return () => {
      sock.close();
    };
  }, []);

  const testInitialize = () => {
    if (socket && stompConnected) {
      const message = { circles: 2, rectangles: 3, triangles: 1 };
      const stompMessage = `SEND
destination:${WEBSOCKET_CONFIG.DESTINATIONS.INITIALIZE}
content-type:application/json
content-length:${JSON.stringify(message).length}

${JSON.stringify(message)}\0`;
      console.log('Sending STOMP test message:', stompMessage);
      socket.send(stompMessage);
      setTestResult('Sent STOMP initialize message');
    } else {
      setTestResult(`Cannot send - socket: ${!!socket}, stompConnected: ${stompConnected}`);
    }
  };

  const testGetShapes = () => {
    if (socket && stompConnected) {
      const message = {};
      const stompMessage = `SEND
destination:${WEBSOCKET_CONFIG.DESTINATIONS.GET_SHAPES}
content-type:application/json
content-length:${JSON.stringify(message).length}

${JSON.stringify(message)}\0`;
      console.log('Sending STOMP getShapes message:', stompMessage);
      socket.send(stompMessage);
      setTestResult('Sent STOMP getShapes message');
    } else {
      setTestResult(`Cannot send - socket: ${!!socket}, stompConnected: ${stompConnected}`);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
      <h3>WebSocket Debug</h3>
      <p>WebSocket Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>STOMP Status: {stompConnected ? 'Connected' : 'Disconnected'}</p>
      
      <div style={{ margin: '10px 0' }}>
        <button onClick={testInitialize} style={{ margin: '5px' }}>
          Test Initialize
        </button>
        <button onClick={testGetShapes} style={{ margin: '5px' }}>
          Test Get Shapes
        </button>
      </div>
      
      <div style={{ margin: '10px 0' }}>
        <strong>Test Result:</strong> {testResult}
      </div>
      
      <div style={{ margin: '10px 0' }}>
        <strong>Messages:</strong>
        <div style={{ maxHeight: '200px', overflow: 'auto', background: 'white', padding: '10px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ fontSize: '12px', margin: '2px 0' }}>
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebSocketDebug; 
import { useState, useEffect, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { WEBSOCKET_CONFIG } from '../utils/constants';

export const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [stompConnected, setStompConnected] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [error, setError] = useState(null);

  const connect = useCallback(() => {
    try {
      console.log('Attempting to connect to:', WEBSOCKET_CONFIG.ENDPOINT);
      const sock = new SockJS(WEBSOCKET_CONFIG.ENDPOINT);
      setSocket(sock);
      
      sock.onopen = () => {
        console.log('SockJS connected successfully, sending STOMP CONNECT');
        setConnected(true);
        setError(null);
        
        // Wait a bit before sending STOMP CONNECT to ensure socket is ready
        setTimeout(() => {
          try {
            // Send STOMP CONNECT frame
            const connectFrame = `CONNECT
accept-version:1.2
heart-beat:${WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL},${WEBSOCKET_CONFIG.HEARTBEAT_INTERVAL}

\0`;
            sock.send(connectFrame);
          } catch (err) {
            console.error('Error sending STOMP CONNECT:', err);
            setError(err);
          }
        }, 100);
      };
      
      sock.onclose = () => {
        console.log('WebSocket disconnected');
        setConnected(false);
        setStompConnected(false);
      };
      
      sock.onerror = (error) => {
        console.error('WebSocket connection error:', error);
        setConnected(false);
        setStompConnected(false);
        setError(error);
      };
      
    } catch (err) {
      setError(err);
      console.error('WebSocket connection error:', err);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setConnected(false);
      setSocket(null);
    }
  }, [socket]);

  const send = useCallback((destination, message) => {
    if (socket && stompConnected) {
      try {
        console.log('Sending STOMP message:', { destination, message });
        
        // Create STOMP SEND frame
        const stompMessage = `SEND
destination:${destination}
content-type:application/json
content-length:${JSON.stringify(message).length}

${JSON.stringify(message)}\0`;
        
        socket.send(stompMessage);
      } catch (err) {
        console.error('Error sending STOMP message:', err);
        setError(err);
      }
    } else {
      console.log('Cannot send message - socket:', !!socket, 'stompConnected:', stompConnected);
    }
  }, [socket, stompConnected]);

  const subscribe = useCallback((topic, callback) => {
    if (socket && stompConnected) {
      console.log('Setting up STOMP subscription for topic:', topic);
      
      // Send STOMP SUBSCRIBE frame
      const subscribeFrame = `SUBSCRIBE
id:sub-0
destination:${topic}

\0`;
      socket.send(subscribeFrame);
      
      socket.onmessage = (event) => {
        console.log('Received STOMP message:', event.data);
        
        // Handle STOMP frames
        const lines = event.data.split('\n');
        if (lines[0] === 'CONNECTED') {
          console.log('STOMP connection established');
          setStompConnected(true);
        } else if (lines[0] === 'MESSAGE') {
          try {
            // Extract the JSON payload from STOMP MESSAGE frame
            const bodyIndex = lines.findIndex(line => line === '');
            if (bodyIndex !== -1 && bodyIndex < lines.length - 1) {
              const jsonData = lines.slice(bodyIndex + 1).join('\n');
              const data = JSON.parse(jsonData);
              setMessageCount(prev => prev + 1);
              callback(data);
            }
          } catch (err) {
            console.error('Error parsing STOMP message:', err);
            console.log('Raw STOMP message:', event.data);
          }
        } else {
          console.log('Other STOMP frame:', lines[0]);
        }
      };
    } else {
      console.log('Cannot subscribe - socket:', !!socket, 'stompConnected:', stompConnected);
    }
  }, [socket, stompConnected]);

  // Auto-connect on mount - only run once
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, []); // Empty dependency array - only run on mount

  return {
    connect,
    disconnect,
    subscribe,
    send,
    connected: stompConnected, // Use stompConnected for the public API
    messageCount,
    error
  };
}; 
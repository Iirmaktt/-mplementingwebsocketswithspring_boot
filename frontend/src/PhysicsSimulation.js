import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import './PhysicsSimulation.css';

// Use global Stomp from CDN
const Stomp = window.Stomp;

const PhysicsSimulation = () => {
  const [shapes, setShapes] = useState([]);
  const [circles, setCircles] = useState(4);
  const [rectangles, setRectangles] = useState(5);
  const [triangles, setTriangles] = useState(3);
  const [messageCount, setMessageCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [totalShapes, setTotalShapes] = useState(0);
  const [movingShapes, setMovingShapes] = useState(0);
  const [fps, setFps] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('-');

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const stompClientRef = useRef(null);
  const frameCountRef = useRef(0);
  const lastFpsTimeRef = useRef(Date.now());

  // Connect to WebSocket
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws/shapes');
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      setConnected(true);
      
      // Subscribe to shape updates
      stompClient.subscribe('/topic/shapes', function (message) {
        const receivedShapes = JSON.parse(message.body);
        setShapes(receivedShapes);
        setMessageCount(prev => prev + 1);
        setTotalShapes(receivedShapes.length);
        setMovingShapes(receivedShapes.filter(s => s.isMoving).length);
        setLastUpdate(new Date().toLocaleTimeString());
      });
    }, function (error) {
      console.log('STOMP error: ' + error);
      setConnected(false);
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
  }, []);

  // Animation loop
  useEffect(() => {
    const draw = () => {
      if (!ctxRef.current) return;

      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw all shapes
      shapes.forEach(drawShape);
      
      // Update FPS
      frameCountRef.current++;
      const now = Date.now();
      if (now - lastFpsTimeRef.current >= 1000) {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
        lastFpsTimeRef.current = now;
      }
      
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [shapes]);

  const drawShape = (shape) => {
    if (!ctxRef.current) return;
    
    const ctx = ctxRef.current;
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.angle);
    
    // Set color and opacity based on movement
    const alpha = shape.isMoving ? 1.0 : 0.6;
    ctx.fillStyle = shape.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    ctx.strokeStyle = shape.isMoving ? '#FFFFFF' : '#CCCCCC';
    ctx.lineWidth = shape.isMoving ? 2 : 1;
    
    const halfSize = shape.size / 2;
    
    switch (shape.type) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, halfSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'rectangle':
        ctx.fillRect(-halfSize, -halfSize, shape.size, shape.size);
        ctx.strokeRect(-halfSize, -halfSize, shape.size, shape.size);
        break;
        
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -halfSize);
        ctx.lineTo(-halfSize, halfSize);
        ctx.lineTo(halfSize, halfSize);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
    }
    
    ctx.restore();
  };

  const initializeShapes = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send("/app/initializeShapes", {}, JSON.stringify({
        circles: circles,
        rectangles: rectangles,
        triangles: triangles
      }));
    }
  };

  const resetSimulation = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send("/app/reset", {}, {});
    }
  };

  const getShapes = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send("/app/getShapes", {}, {});
    }
  };

  return (
    <div className="physics-simulation">
      <div className="container">
        <div className="header">
          <h1>🎯 Physics Shape Simulation</h1>
          <p>Real-time WebSocket physics simulation with rotating movement patterns</p>
        </div>
        
        <div className="controls">
          <div className="control-group">
            <label htmlFor="circles">Circles:</label>
            <input 
              type="number" 
              id="circles" 
              value={circles} 
              onChange={(e) => setCircles(parseInt(e.target.value) || 0)}
              min="0" 
              max="20"
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="rectangles">Rectangles:</label>
            <input 
              type="number" 
              id="rectangles" 
              value={rectangles} 
              onChange={(e) => setRectangles(parseInt(e.target.value) || 0)}
              min="0" 
              max="20"
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="triangles">Triangles:</label>
            <input 
              type="number" 
              id="triangles" 
              value={triangles} 
              onChange={(e) => setTriangles(parseInt(e.target.value) || 0)}
              min="0" 
              max="20"
            />
          </div>
          
          <div className="control-group">
            <button onClick={initializeShapes} disabled={!connected}>
              🚀 Start Simulation
            </button>
            <button onClick={resetSimulation} disabled={!connected}>
              🔄 Reset
            </button>
            <button onClick={getShapes} disabled={!connected}>
              📊 Get Current State
            </button>
          </div>
        </div>
        
        <div className="canvas-container">
          <canvas 
            ref={canvasRef}
            id="simulationCanvas" 
            width="800" 
            height="600"
          />
        </div>
        
        <div className="status">
          <strong>Connection Status:</strong>
          <span className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
          <span>Messages: {messageCount}</span>
        </div>
        
        <div className="stats">
          <div className="stat-card">
            <div className="stat-value">{totalShapes}</div>
            <div>Total Shapes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{movingShapes}</div>
            <div>Moving Shapes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{fps}</div>
            <div>FPS</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{lastUpdate}</div>
            <div>Last Update</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsSimulation; 
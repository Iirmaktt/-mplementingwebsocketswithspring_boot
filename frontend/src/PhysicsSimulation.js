import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Controls from './components/Controls';
import Status from './components/Status';
import './styles/PhysicsSimulation.css';

// Use global Stomp from CDN
const Stomp = window.Stomp;

const PhysicsSimulation = () => {
  // State management
  const [shapes, setShapes] = useState([]);
  const [circles, setCircles] = useState(4);
  const [rectangles, setRectangles] = useState(5);
  const [triangles, setTriangles] = useState(3);
  const [connected, setConnected] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [totalShapes, setTotalShapes] = useState(0);
  const [movingShapes, setMovingShapes] = useState(0);
  const [panelConfig, setPanelConfig] = useState({ width: 800, height: 600 });

  // Refs
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const stompClientRef = useRef(null);

  // WebSocket connection
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws/shapes');
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      setConnected(true);
      
      // Subscribe to shape updates
      stompClient.subscribe('/topic/shapes', function (message) {
        const data = JSON.parse(message.body);
        
        // Check if this is a panel config message
        if (data.width && data.height && data.message && data.message.includes('Panel configured')) {
          setPanelConfig({ width: data.width, height: data.height });
          return;
        }
        
        if (Array.isArray(data)) {
          setShapes(data);
          setMessageCount(prev => prev + 1);
          setTotalShapes(data.length);
          setMovingShapes(data.filter(s => s.isMoving).length);
        }
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

  // Initialize canvas and get panel config
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    
    // Get initial panel configuration
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send('/app/getPanelConfig', {}, {});
    }
  }, [connected]);

  // Update canvas size when panel config changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && (canvas.width !== panelConfig.width || canvas.height !== panelConfig.height)) {
      canvas.width = panelConfig.width;
      canvas.height = panelConfig.height;
    }
  }, [panelConfig]);

  // Animation loop
  useEffect(() => {
    const draw = () => {
      if (!ctxRef.current) return;

      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid
      drawGrid(ctx, canvas.width, canvas.height);
      
      // Draw all shapes
      shapes.forEach(drawShape);
      
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [shapes, panelConfig]);

  // Helper functions
  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

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
        
      default:
        console.warn('Unknown shape type:', shape.type);
    }
    
    ctx.restore();
  };

  // WebSocket actions
  const initializeShapes = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send("/app/initializeShapes", {}, JSON.stringify({
        circles: circles,
        rectangles: rectangles,
        triangles: triangles,
        panelWidth: panelConfig.width,
        panelHeight: panelConfig.height
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

  const setPanelSize = (width, height) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.send("/app/setPanelSize", {}, JSON.stringify({
        width: width,
        height: height
      }));
    }
  };

  return (
    <div className="physics-simulation">
      <div className="header">
        <h1>🎯 Shape Simulation</h1>
      </div>

      <div className="main-content">
        {/* Controls Panel */}
        <div className="controls-panel">
          <Controls 
            circles={circles}
            setCircles={setCircles}
            rectangles={rectangles}
            setRectangles={setRectangles}
            triangles={triangles}
            setTriangles={setTriangles}
            panelConfig={panelConfig}
            setPanelSize={setPanelSize}
            onInitialize={initializeShapes}
            onReset={resetSimulation}
            onGetShapes={getShapes}
            connected={connected}
          />
        </div>

        {/* Canvas Panel */}
        <div className="canvas-panel">
          <canvas 
            ref={canvasRef}
            className="simulation-canvas"
            width={panelConfig.width}
            height={panelConfig.height}
          />
        </div>

        {/* Status Panel */}
        <div className="status-panel">
          <Status 
            connected={connected}
            totalShapes={totalShapes}
            movingShapes={movingShapes}
            messageCount={messageCount}
            panelConfig={panelConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default PhysicsSimulation; 
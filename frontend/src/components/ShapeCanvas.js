import React, { useRef, useEffect } from 'react';
import { CANVAS_CONFIG, SHAPE_CONFIG } from '../utils/constants';
import { validateShape } from '../utils/shapeUtils';
import './ShapeCanvas.css';

const ShapeCanvas = ({ shapes = [], width = CANVAS_CONFIG.DEFAULT_WIDTH, height = CANVAS_CONFIG.DEFAULT_HEIGHT }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (!ctxRef.current || !shapes) return;

    const ctx = ctxRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background grid
    ctx.strokeStyle = CANVAS_CONFIG.GRID_COLOR;
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += CANVAS_CONFIG.GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += CANVAS_CONFIG.GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw all shapes
    shapes.forEach(shape => {
      if (validateShape(shape)) {
        drawShape(ctx, shape);
      }
    });
  }, [shapes, width, height]);

  const drawShape = (ctx, shape) => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.angle);
    
    // Set color and opacity based on movement
    const alpha = shape.isMoving ? SHAPE_CONFIG.MOVING_ALPHA : SHAPE_CONFIG.STATIC_ALPHA;
    ctx.fillStyle = shape.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    ctx.strokeStyle = shape.isMoving ? SHAPE_CONFIG.MOVING_STROKE_COLOR : SHAPE_CONFIG.STATIC_STROKE_COLOR;
    ctx.lineWidth = shape.isMoving ? SHAPE_CONFIG.MOVING_LINE_WIDTH : SHAPE_CONFIG.STATIC_LINE_WIDTH;
    
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

  return (
    <div className="canvas-container">
      <canvas 
        ref={canvasRef}
        className="shape-canvas"
        width={width} 
        height={height}
      />
    </div>
  );
};

export default ShapeCanvas; 
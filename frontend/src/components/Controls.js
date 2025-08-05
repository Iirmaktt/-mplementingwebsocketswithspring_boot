import React from 'react';
import './Controls.css';

const Controls = ({ 
  circles, 
  setCircles, 
  rectangles, 
  setRectangles, 
  triangles, 
  setTriangles,
  onInitialize,
  onReset,
  onGetShapes,
  connected
}) => {
  console.log('Controls rendering - connected:', connected);
  return (
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
          disabled={!connected}
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
          disabled={!connected}
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
          disabled={!connected}
        />
      </div>
      
      <div className="control-group">
        <button 
          onClick={onInitialize}
          disabled={!connected}
          className="btn-primary"
        >
          🚀 Start Simulation
        </button>
        <button 
          onClick={onReset}
          disabled={!connected}
          className="btn-secondary"
        >
          🔄 Reset
        </button>
        <button 
          onClick={onGetShapes}
          disabled={!connected}
          className="btn-info"
        >
          📊 Get Current State
        </button>
      </div>
    </div>
  );
};

export default Controls; 
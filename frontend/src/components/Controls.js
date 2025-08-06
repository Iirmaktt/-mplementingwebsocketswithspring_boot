import React from 'react';
import '../styles/Controls.css';

const Controls = ({ 
  circles, 
  setCircles, 
  rectangles, 
  setRectangles,
  triangles, 
  setTriangles,
  panelConfig,
  setPanelSize,
  onInitialize,
  onReset,
  onGetShapes,
  connected
}) => {
  console.log('Controls rendering - connected:', connected);
  
  const handlePanelWidthChange = (e) => {
    const newWidth = parseInt(e.target.value) || 800;
    setPanelSize(newWidth, panelConfig.height);
  };

  const handlePanelHeightChange = (e) => {
    const newHeight = parseInt(e.target.value) || 600;
    setPanelSize(panelConfig.width, newHeight);
  };

  return (
    <div className="controls">
      <div className="control-section">
        <h3>🎯 Shape Configuration</h3>
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
      </div>

      <div className="control-section">
        <h3> Panel Configuration</h3>
        <div className="control-group">
          <label htmlFor="panelWidth">Panel Width:</label>
          <input 
            type="number" 
            id="panelWidth" 
            value={panelConfig.width} 
            onChange={handlePanelWidthChange}
            min="200" 
            max="2000"
            disabled={!connected}
          />
        </div>
        
        <div className="control-group">
          <label htmlFor="panelHeight">Panel Height:</label>
          <input 
            type="number" 
            id="panelHeight" 
            value={panelConfig.height} 
            onChange={handlePanelHeightChange}
            min="200" 
            max="2000"
            disabled={!connected}
          />
        </div>
      </div>
      
      <div className="control-section">
        <h3>🎮 Actions</h3>
        <div className="control-group">
          <button 
            onClick={onInitialize}
            disabled={!connected}
            className="btn-primary"
          >
             Start Simulation
          </button>
          <button 
            onClick={onReset}
            disabled={!connected}
            className="btn-secondary"
          >
             Reset
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
    </div>
  );
};

export default Controls; 
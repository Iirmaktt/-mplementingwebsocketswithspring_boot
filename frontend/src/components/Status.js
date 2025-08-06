import React from 'react';
import '../styles/Status.css';

const Status = ({ 
  connected, 
  totalShapes, 
  movingShapes, 
  messageCount,
  panelConfig
}) => {
  return (
    <div className="status">
      <div className="status-header">
        <h3>📊 Status & Metrics</h3>
      </div>
      
      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">
            {connected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
          <div className="stat-label">Connection Status</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{totalShapes}</div>
          <div className="stat-label">Total Shapes</div>
          <div className="stat-subtitle">Moving: {movingShapes}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{messageCount}</div>
          <div className="stat-label">Messages Received</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{panelConfig.width}×{panelConfig.height}</div>
          <div className="stat-label">Panel Size</div>
          <div className="stat-subtitle">Width × Height</div>
        </div>
      </div>
    </div>
  );
};

export default Status;
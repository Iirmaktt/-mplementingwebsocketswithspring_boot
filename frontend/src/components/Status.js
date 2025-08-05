import React from 'react';
import '../styles/Status.css';

const Status = ({ connected, messageCount, totalShapes, movingShapes, lastUpdate }) => {
  return (
    <div className="status">
      <div className="status-header">
        <strong>Connection Status:</strong>
        <span className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
        <span className="message-count">Messages: {messageCount}</span>
      </div>
      
      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{totalShapes}</div>
          <div className="stat-label">Total Shapes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{movingShapes}</div>
          <div className="stat-label">Moving Shapes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalShapes}</div>
          <div className="stat-label">Current Shapes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{lastUpdate}</div>
          <div className="stat-label">Last Update</div>
        </div>
      </div>
    </div>
  );
};

export default Status; 
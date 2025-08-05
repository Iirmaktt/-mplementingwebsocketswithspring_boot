import React from 'react';

const SimpleTest = () => {
  return (
    <div style={{ 
      background: 'red', 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid black',
      color: 'white',
      fontSize: '16px'
    }}>
      <h3>🔍 SIMPLE TEST - If you see this, React is working!</h3>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{
          background: 'blue',
          color: 'white',
          padding: '10px 20px',
          margin: '10px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px'
        }}
      >
        🎯 TEST BUTTON - Click Me!
      </button>
      <p>This should be visible with a red background and a blue button.</p>
    </div>
  );
};

export default SimpleTest; 
// Shape utilities and helper functions

/**
 * Logs messages with timestamps and color coding
 * @param {string} message - The message to log
 * @param {string} type - The type of message ('info', 'success', 'error')
 */
export const log = (message, type = 'info') => {
  const timestamp = new Date().toLocaleTimeString();
  const color = type === 'error' ? 'red' : type === 'success' ? 'green' : 'black';
  console.log(`[${timestamp}] ${message}`);
  
  // If we're in a browser environment with a log div, we could also update it
  const logDiv = document.getElementById('messageLog');
  if (logDiv) {
    const logEntry = document.createElement('div');
    logEntry.style.color = color;
    logEntry.textContent = `[${timestamp}] ${message}`;
    logDiv.appendChild(logEntry);
    logDiv.scrollTop = logDiv.scrollHeight;
  }
};

/**
 * Clears the message log
 */
export const clearLog = () => {
  const logDiv = document.getElementById('messageLog');
  if (logDiv) {
    logDiv.innerHTML = '';
  }
};

/**
 * Updates connection status display
 * @param {boolean} connected - Whether the connection is active
 */
export const updateStatus = (connected) => {
  const statusDiv = document.getElementById('connectionStatus');
  if (statusDiv) {
    statusDiv.textContent = connected ? 'Connected' : 'Disconnected';
    statusDiv.className = `connection-status ${connected ? 'connected' : 'disconnected'}`;
  }
};

/**
 * Validates shape data
 * @param {Object} shape - The shape object to validate
 * @returns {boolean} - Whether the shape is valid
 */
export const validateShape = (shape) => {
  if (!shape || typeof shape !== 'object') return false;
  
  const requiredFields = ['id', 'type', 'x', 'y', 'size', 'color'];
  return requiredFields.every(field => shape.hasOwnProperty(field));
};

/**
 * Generates a random color for shapes
 * @returns {string} - Hex color string
 */
export const generateRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Calculates distance between two points
 * @param {number} x1 - First point x coordinate
 * @param {number} y1 - First point y coordinate
 * @param {number} x2 - Second point x coordinate
 * @param {number} y2 - Second point y coordinate
 * @returns {number} - Distance between points
 */
export const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * Checks if two shapes are colliding
 * @param {Object} shape1 - First shape
 * @param {Object} shape2 - Second shape
 * @returns {boolean} - Whether shapes are colliding
 */
export const checkCollision = (shape1, shape2) => {
  const distance = calculateDistance(shape1.x, shape1.y, shape2.x, shape2.y);
  const minDistance = (shape1.size + shape2.size) / 2;
  return distance < minDistance;
};

/**
 * Formats a number for display
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num, decimals = 2) => {
  return Number(num).toFixed(decimals);
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttles a function call
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}; 
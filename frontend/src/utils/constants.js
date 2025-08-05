// Application constants and configuration

// Canvas configuration
export const CANVAS_CONFIG = {
  DEFAULT_WIDTH: 800,
  DEFAULT_HEIGHT: 600,
  GRID_SIZE: 50,
  BACKGROUND_COLOR: 'rgba(0, 0, 0, 0.3)',
  GRID_COLOR: 'rgba(255, 255, 255, 0.1)',
  BORDER_COLOR: 'rgba(255, 255, 255, 0.3)'
};

// Shape configuration
export const SHAPE_CONFIG = {
  DEFAULT_SIZE: 30,
  MIN_SIZE: 10,
  MAX_SIZE: 100,
  MOVING_ALPHA: 1.0,
  STATIC_ALPHA: 0.6,
  MOVING_STROKE_COLOR: '#FFFFFF',
  STATIC_STROKE_COLOR: '#CCCCCC',
  MOVING_LINE_WIDTH: 2,
  STATIC_LINE_WIDTH: 1
};

// WebSocket configuration
const getWebSocketEndpoint = () => {
  // In development, use the full URL since we're running on different ports
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8080/ws/shapes';
  }
  // In production, use relative path since they'll be on the same server
  return '/ws/shapes';
};

export const WEBSOCKET_CONFIG = {
  ENDPOINT: getWebSocketEndpoint(),
  TOPICS: {
    SHAPES: '/topic/shapes',
    DEBUG: '/topic/debug'
  },
  DESTINATIONS: {
    INITIALIZE: '/app/initializeShapes',
    RESET: '/app/reset',
    GET_SHAPES: '/app/getShapes'
  },
  RECONNECT_DELAY: 5000,
  HEARTBEAT_INTERVAL: 10000
};

// Default shape counts
export const DEFAULT_SHAPE_COUNTS = {
  CIRCLES: 4,
  RECTANGLES: 5,
  TRIANGLES: 3
};

// Shape types
export const SHAPE_TYPES = {
  CIRCLE: 'circle',
  RECTANGLE: 'rectangle',
  TRIANGLE: 'triangle'
};

// Color palette for shapes
export const SHAPE_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
];

// Animation configuration
export const ANIMATION_CONFIG = {
  FPS: 60,
  FRAME_RATE: 1000 / 60,
  SMOOTHING: 0.1
};

// UI configuration
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  TOOLTIP_DELAY: 500
};

// Error messages
export const ERROR_MESSAGES = {
  WEBSOCKET_CONNECTION: 'Failed to connect to WebSocket server',
  SHAPE_VALIDATION: 'Invalid shape data received',
  CANVAS_CONTEXT: 'Failed to get canvas context',
  MESSAGE_PARSE: 'Failed to parse WebSocket message'
};

// Success messages
export const SUCCESS_MESSAGES = {
  WEBSOCKET_CONNECTED: 'Connected to WebSocket server',
  SHAPES_INITIALIZED: 'Shapes initialized successfully',
  SIMULATION_RESET: 'Simulation reset successfully'
}; 
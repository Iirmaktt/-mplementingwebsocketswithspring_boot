# Physics Simulation Component

## Overview
A simplified React component based on the `physics-simulation.html` file that provides a clean, standalone physics simulation interface.

## Features

### 🎯 Core Functionality
- **Real-time WebSocket Connection**: Connects to server on port 8080
- **Canvas Rendering**: Smooth 60 FPS animation with HTML5 Canvas
- **Shape Controls**: Adjust number of circles, rectangles, and triangles
- **Live Statistics**: FPS, total shapes, moving shapes, message count
- **Connection Status**: Real-time connection monitoring

### 🎨 Visual Features
- **Beautiful UI**: Gradient background with glassmorphism effects
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Hardware-accelerated canvas rendering
- **Visual Feedback**: Buttons disabled when disconnected

### 🔧 Technical Features
- **STOMP Protocol**: Full STOMP over WebSocket implementation
- **SockJS Fallback**: Reliable connection with fallback support
- **React Hooks**: Modern React with functional components
- **Performance Optimized**: Efficient rendering and state management

## Usage

### 1. Start the Backend Server
```bash
# Navigate to the project root
cd /path/to/simsoft

# Start the Spring Boot server on port 8080
./mvnw spring-boot:run
```

### 2. Start the Frontend
```bash
# Navigate to the frontend directory
cd frontend

# Start the React development server
npm start
```

### 3. Use the Application
1. **Connect**: The app automatically connects to `http://localhost:8080/ws/shapes`
2. **Configure**: Set the number of circles, rectangles, and triangles
3. **Start**: Click "🚀 Start Simulation" to initialize shapes
4. **Monitor**: Watch the real-time statistics and FPS
5. **Control**: Use "🔄 Reset" and "📊 Get Current State" buttons

## Component Structure

### Files
- **`PhysicsSimulation.js`**: Main React component
- **`PhysicsSimulation.css`**: Styling with glassmorphism effects
- **`index.html`**: Includes SockJS and Stomp.js CDN

### Key Functions
```javascript
// WebSocket Connection
const socket = new SockJS('http://localhost:8080/ws/shapes');
const stompClient = Stomp.over(socket);

// Shape Initialization
stompClient.send("/app/initializeShapes", {}, JSON.stringify({
  circles: circles,
  rectangles: rectangles,
  triangles: triangles
}));

// Canvas Rendering
const drawShape = (shape) => {
  // Draw circle, rectangle, or triangle based on shape.type
};
```

## Configuration

### WebSocket Endpoint
- **Development**: `http://localhost:8080/ws/shapes`
- **Production**: `/ws/shapes` (relative path)

### Canvas Settings
- **Width**: 800px
- **Height**: 600px
- **Grid**: 50px spacing
- **Background**: Semi-transparent with blur effect

### Shape Types
- **Circle**: Filled circle with stroke
- **Rectangle**: Filled square with stroke
- **Triangle**: Filled triangle with stroke

## Dependencies

### CDN Libraries
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.5.1/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
```

### NPM Packages
```json
{
  "sockjs-client": "^1.6.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

## Troubleshooting

### Connection Issues
1. **Check Server**: Ensure backend is running on port 8080
2. **Check Console**: Look for WebSocket connection errors
3. **Check Network**: Verify no firewall blocking port 8080

### Rendering Issues
1. **Check Canvas**: Ensure canvas element is properly initialized
2. **Check FPS**: Monitor FPS counter for performance issues
3. **Check Shapes**: Verify shape data is being received

### Performance Issues
1. **Reduce Shapes**: Lower the number of shapes in controls
2. **Check FPS**: Monitor the FPS counter
3. **Browser**: Try a different browser or update current one

## Development

### Adding New Features
1. **New Shape Types**: Add to `drawShape()` function
2. **New Controls**: Add to the controls section
3. **New Statistics**: Add to the stats grid

### Styling
- **CSS Classes**: All styles are prefixed with `.physics-simulation`
- **Responsive**: Mobile-friendly with media queries
- **Theming**: Easy to customize colors and effects

## Production Deployment

### Build
```bash
npm run build
```

### Serve
```bash
# Install serve globally
npm install -g serve

# Serve the build folder
serve -s build
```

### Backend Integration
- Copy the `build` folder to your Spring Boot `src/main/resources/static` directory
- The app will work with the same backend on the same server

## Benefits

### 1. Simplicity
- **Single Component**: Everything in one file
- **No Complex State**: Simple React hooks
- **Clear Structure**: Easy to understand and modify

### 2. Performance
- **Optimized Rendering**: Efficient canvas updates
- **Minimal Dependencies**: Only essential libraries
- **Fast Loading**: Small bundle size

### 3. Reliability
- **STOMP Protocol**: Robust WebSocket communication
- **Error Handling**: Graceful connection management
- **Fallback Support**: SockJS for compatibility

### 4. Maintainability
- **Clean Code**: Well-structured React component
- **Modular CSS**: Organized styling
- **Documentation**: Clear comments and structure

The PhysicsSimulation component provides a clean, efficient, and reliable way to run the physics simulation with a modern React interface! 
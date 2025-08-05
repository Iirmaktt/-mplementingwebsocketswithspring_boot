# SimSoft React Frontend

A modern React application for the SimSoft physics simulation with real-time WebSocket communication.

## 🚀 Features

- **Real-time WebSocket Communication**: Live updates from the Spring Boot backend
- **Canvas Rendering**: Smooth shape rendering with HTML5 Canvas
- **Physics Simulation**: Visual representation of moving shapes
- **Responsive Design**: Modern UI with glassmorphism effects
- **Error Handling**: Robust error handling and connection status
- **Statistics**: Live statistics and message counting

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── ShapeCanvas.js  # Canvas rendering component
│   │   ├── ShapeCanvas.css
│   │   ├── Controls.js     # Control panel component
│   │   ├── Controls.css
│   │   ├── Status.js       # Status and statistics component
│   │   └── Status.css
│   ├── hooks/
│   │   └── useWebSocket.js # Custom WebSocket hook
│   ├── App.js              # Main application component
│   ├── App.css
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 🔧 Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spring Boot backend running on port 8080

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### WebSocket Configuration

The app automatically connects to the WebSocket endpoint at `/ws/shapes` and subscribes to `/topic/shapes` for real-time updates.

## 🎨 Components

### ShapeCanvas
- Renders shapes on HTML5 Canvas
- Handles different shape types (circle, rectangle, triangle)
- Visual feedback for moving vs stationary shapes
- Background grid for reference

### Controls
- Input fields for shape counts
- Buttons for simulation control
- Disabled state when disconnected
- Real-time parameter updates

### Status
- Connection status indicator
- Message counter
- Live statistics
- Last update timestamp

### useWebSocket Hook
- Manages WebSocket connection
- Handles STOMP protocol
- Error handling and reconnection
- Message subscription and sending

## 🌐 API Endpoints

The React app communicates with these WebSocket endpoints:

- **Connect**: `ws://localhost:8080/ws/shapes`
- **Subscribe**: `/topic/shapes`
- **Send**: 
  - `/app/initializeShapes` - Initialize simulation
  - `/app/reset` - Reset simulation
  - `/app/getShapes` - Get current state

## 🎯 Usage

1. **Start the backend:**
   ```bash
   # In the main project directory
   ./mvnw spring-boot:run
   ```

2. **Start the frontend:**
   ```bash
   # In the frontend directory
   npm start
   ```

3. **Use the application:**
   - Set shape counts (circles, rectangles, triangles)
   - Click "Start Simulation" to begin
   - Watch shapes move in real-time
   - Monitor statistics and connection status

## 🔍 Troubleshooting

### Connection Issues
- Ensure the Spring Boot backend is running on port 8080
- Check browser console for WebSocket errors
- Verify proxy configuration in package.json

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Ensure all dependencies are installed

### Performance Issues
- Monitor WebSocket message frequency
- Check canvas rendering performance
- Optimize shape count for your hardware

## 📦 Production Build

To build for production:

```bash
npm run build
```

This creates an optimized build in the `build/` directory that can be served by any static file server.

## 🤝 Contributing

1. Follow React best practices
2. Maintain component separation
3. Add proper error handling
4. Test WebSocket functionality
5. Update documentation

## 📄 License

This project is part of the SimSoft physics simulation system. 
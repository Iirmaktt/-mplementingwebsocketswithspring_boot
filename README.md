# SimSoft - Physics Simulation Project

A real-time physics simulation application with a React frontend and Spring Boot backend.

## Project Structure

```
simsoft/
├── frontend/          # React frontend application
├── backend/           # Spring Boot backend application
├── docs/             # Project documentation
└── README.md         # This file
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build and run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## Features

- **Real-time Physics Simulation**: Shapes move with realistic physics
- **WebSocket Communication**: Real-time updates between frontend and backend
- **REST API**: HTTP endpoints for shape management
- **Interactive Controls**: User-friendly interface for controlling the simulation
- **Responsive Design**: Works on different screen sizes

## Architecture

### Backend (Spring Boot)
- REST API endpoints for shape configuration
- WebSocket support for real-time simulation
- Physics simulation engine
- Global exception handling
- Clean architecture with proper separation of concerns

### Frontend (React)
- Real-time shape rendering
- WebSocket connection management
- Interactive controls
- Responsive UI design

## API Documentation

### REST Endpoints
- `GET /api/setShapes` - Configure shape counts
- `GET /api/getShapes` - Get current shape configuration
- `GET /api/getTotalShapes` - Get total shape count

### WebSocket
- Endpoint: `/ws/shapes`
- Topics: `/topic/shapes`
- Real-time shape updates

## Development

### Backend Development
See [backend/README.md](backend/README.md) for detailed backend documentation.

### Frontend Development
See [frontend/README.md](frontend/README.md) for detailed frontend documentation.

## Technologies Used

### Backend
- Spring Boot 3.5.4
- Spring WebSocket
- Maven
- Java 17
- Lombok

### Frontend
- React
- WebSocket client
- CSS3
- JavaScript ES6+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 
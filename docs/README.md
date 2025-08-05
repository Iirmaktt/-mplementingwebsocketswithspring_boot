# SimSoft - Physics Simulation Application

## Overview
SimSoft is a real-time physics simulation application built with Spring Boot backend and React frontend. The application provides interactive shape manipulation and physics simulation capabilities through WebSocket communication.

## Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.x
- **Communication**: WebSocket for real-time updates
- **Package Structure**: `com.nazli.simsoft`
  - `config/`: WebSocket configuration
  - `controller/`: REST and WebSocket controllers
  - `model/`: Data models
  - `service/`: Business logic services

### Frontend (React)
- **Framework**: React 18.x
- **Communication**: WebSocket for real-time updates
- **Structure**:
  - `components/`: Reusable UI components
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions
  - `styles/`: CSS files
  - `assets/`: Static assets

## Project Structure

```
simsoft/
├── docs/                    # Documentation
├── frontend/               # React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── utils/        # Utility functions
│   │   ├── styles/       # CSS files
│   │   └── assets/       # Static assets
│   └── package.json
├── logs/                  # Application logs
├── src/                   # Spring Boot source
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── tests/                 # Test files
└── pom.xml
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- Maven 3.6+

### Backend Setup
```bash
# Navigate to project root
cd simsoft

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## Features
- Real-time shape manipulation
- Physics simulation
- WebSocket communication
- Interactive controls
- Status monitoring

## API Documentation
- WebSocket endpoint: `/ws`
- REST endpoints: `/api/*`

## Development Guidelines
- Follow Java naming conventions for backend
- Use functional components in React
- Maintain consistent code formatting
- Write unit tests for critical functionality 
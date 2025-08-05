# SimSoft Backend

A Spring Boot application that provides REST API and WebSocket endpoints for the physics simulation frontend.

## Features

- REST API endpoints for shape management
- WebSocket support for real-time physics simulation
- Global exception handling
- Centralized configuration management
- Clean architecture with proper separation of concerns

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/nazli/simsoft/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/       # REST and WebSocket controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── exception/       # Exception handlers
│   │   │   ├── model/           # Domain models
│   │   │   ├── service/         # Business logic
│   │   │   └── util/            # Utility classes and constants
│   │   └── resources/
│   │       └── application.properties
│   └── test/                    # Test classes
├── pom.xml
└── README.md
```

## API Endpoints

### REST API

- `GET /api/setShapes?circles=X&rects=Y&triangles=Z` - Set shape configuration
- `GET /api/getShapes` - Get current shape configuration
- `GET /api/getTotalShapes` - Get total number of shapes

### WebSocket

- Endpoint: `/ws/shapes`
- Topics: `/topic/shapes`
- Messages:
  - `/app/initializeShapes` - Initialize shapes with counts
  - `/app/getShapes` - Get current shapes
  - `/app/reset` - Reset simulation

## Setup and Running

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Running the Application

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## Configuration

The application can be configured through `application.properties`:

- `server.port` - Server port (default: 8080)
- `logging.level.com.nazli.simsoft` - Logging level for the application
- `logging.level.org.springframework.web` - Logging level for Spring Web

## Architecture

### Controllers
- `ShapeController` - Handles REST API endpoints for shape management
- `WebSocketController` - Handles WebSocket messages for real-time simulation

### Services
- `ShapeService` - Business logic for shape configuration
- `PhysicsSimulationService` - Physics simulation logic with real-time updates

### Models
- `Shape` - Domain model for shapes with physics properties

### DTOs
- `ShapeResponse` - API response for shape configuration
- `TotalShapesResponse` - API response for total shapes count

### Configuration
- `WebSocketConfig` - WebSocket configuration
- `GlobalExceptionHandler` - Global exception handling
- `Constants` - Centralized constants and configuration values

## Testing

Run tests with:
```bash
mvn test
```

## Best Practices Implemented

1. **Separation of Concerns**: Controllers, services, and models are properly separated
2. **DTO Pattern**: API responses are separated from internal models
3. **Global Exception Handling**: Centralized error handling with consistent responses
4. **Constants Management**: All configuration values are centralized
5. **Clean Code**: Removed unused code and improved readability
6. **Proper Documentation**: Comprehensive README and code comments 
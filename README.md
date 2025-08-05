# SimSoft Shape Controller

A Spring Boot application that provides REST endpoints for managing shape configurations.

## Endpoints

### 1. Set Shapes
**GET** `/api/setShapes`

Sets the number of circles, rectangles, and triangles.

**Parameters:**
- `circles` (optional, default: 0) - Number of circles
- `rects` (optional, default: 0) - Number of rectangles  
- `triangles` (optional, default: 0) - Number of triangles

**Example:**
```
GET /api/setShapes?circles=4&rects=5&triangles=3
```

**Response:**
```json
{
  "circles": 4,
  "rects": 5,
  "triangles": 3,
  "message": "Shapes set successfully: 4 circles, 5 rectangles, 3 triangles"
}
```

### 2. Get Current Shapes
**GET** `/api/getShapes`

Retrieves the current shape configuration.

**Example:**
```
GET /api/getShapes
```

**Response:**
```json
{
  "circles": 4,
  "rects": 5,
  "triangles": 3,
  "message": "Shapes set successfully: 4 circles, 5 rectangles, 3 triangles"
}
```

### 3. Get Total Shapes
**GET** `/api/getTotalShapes`

Returns the total number of shapes.

**Example:**
```
GET /api/getTotalShapes
```

**Response:**
```json
{
  "totalShapes": 12,
  "message": "Total shapes: 12"
}
```

## Running the Application

1. Make sure you have Java 17+ installed
2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
3. The application will start on `http://localhost:8080`
4. Access the test page at `http://localhost:8080/index.html`

## Testing

You can test the endpoints using:

1. **Web Interface**: Visit `http://localhost:8080/index.html` for a simple web interface
2. **cURL**:
   ```bash
   curl "http://localhost:8080/api/setShapes?circles=4&rects=5&triangles=3"
   curl "http://localhost:8080/api/getShapes"
   curl "http://localhost:8080/api/getTotalShapes"
   ```
3. **Browser**: Directly visit the URLs in your browser

## Project Structure

```
src/main/java/com/nazli/simsoft/
├── SimsoftApplication.java          # Main application class
├── controller/
│   └── ShapeController.java        # REST controller for shape endpoints
└── service/
    └── ShapeService.java           # Business logic for shape operations
```

## Features

- ✅ GET endpoints for shape management
- ✅ Parameter validation (no negative values)
- ✅ Error handling
- ✅ Service layer for business logic
- ✅ Web interface for testing
- ✅ JSON responses
- ✅ Default parameter values

## Future Enhancements

- Database persistence for shape configurations
- WebSocket support for real-time updates
- Additional shape types
- Shape processing and visualization
- Authentication and authorization 
# API Documentation

## WebSocket Endpoints

### `/ws`
Real-time communication endpoint for physics simulation updates.

#### Message Types

##### Shape Update
```json
{
  "type": "SHAPE_UPDATE",
  "data": {
    "id": "shape-1",
    "x": 100,
    "y": 200,
    "width": 50,
    "height": 50,
    "color": "#ff0000"
  }
}
```

##### Physics Update
```json
{
  "type": "PHYSICS_UPDATE",
  "data": {
    "shapes": [
      {
        "id": "shape-1",
        "x": 100,
        "y": 200,
        "velocity": {
          "x": 5,
          "y": -2
        }
      }
    ]
  }
}
```

##### Status Update
```json
{
  "type": "STATUS_UPDATE",
  "data": {
    "status": "RUNNING",
    "message": "Simulation active",
    "timestamp": "2024-08-05T15:30:00Z"
  }
}
```

## REST Endpoints

### GET `/api/shapes`
Retrieve all shapes in the simulation.

**Response:**
```json
{
  "shapes": [
    {
      "id": "shape-1",
      "x": 100,
      "y": 200,
      "width": 50,
      "height": 50,
      "color": "#ff0000"
    }
  ]
}
```

### POST `/api/shapes`
Create a new shape.

**Request Body:**
```json
{
  "x": 100,
  "y": 200,
  "width": 50,
  "height": 50,
  "color": "#ff0000"
}
```

### PUT `/api/shapes/{id}`
Update an existing shape.

### DELETE `/api/shapes/{id}`
Remove a shape from the simulation.

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid shape data",
  "message": "Shape coordinates must be positive numbers"
}
```

### 404 Not Found
```json
{
  "error": "Shape not found",
  "message": "Shape with id 'shape-1' does not exist"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
``` 
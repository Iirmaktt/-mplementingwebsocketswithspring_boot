#!/bin/bash

# SimSoft Docker Startup Script

echo "🚀 Starting SimSoft Physics Simulation..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker is running"
echo "🔨 Building and starting services..."

# Build and start services
docker-compose up --build

echo ""
echo "🎉 SimSoft is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080"
echo "💚 Health Check: http://localhost:8080/actuator/health"
echo ""
echo "To stop the application, run: docker-compose down" 
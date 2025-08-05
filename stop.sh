#!/bin/bash

# SimSoft Docker Stop Script

echo "🛑 Stopping SimSoft Physics Simulation..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running."
    exit 1
fi

# Stop and remove containers
docker-compose down

echo "✅ SimSoft has been stopped!"
echo ""
echo "To start again, run: ./start.sh"
echo "To remove all data, run: docker-compose down -v" 
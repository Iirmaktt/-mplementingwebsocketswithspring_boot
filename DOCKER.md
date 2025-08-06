# Docker Setup for SimSoft

This document explains how to run the SimSoft physics simulation application using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose 2.0 or higher

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build
```

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Backend Health Check**: http://localhost:8080/actuator/health

### 3. Stop the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Docker Architecture

### Services

1. **Backend Service** (`simsoft-backend`)
   - Spring Boot application
   - Port: 8080
   - Health check endpoint: `/actuator/health`
   - JVM-based with multi-stage build

2. **Frontend Service** (`simsoft-frontend`)
   - React application served by Nginx
   - Port: 3000 (mapped to container port 80)
   - Reverse proxy to backend API
   - Static file serving with caching

### Network

- Custom bridge network: `simsoft-network`
- Services communicate via service names
- Frontend proxies API calls to backend

## Docker Commands

### Development

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Start with logs
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Production

```bash
# Build for production
docker-compose -f docker-compose.yml build

# Start production services
docker-compose -f docker-compose.yml up -d

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

### Maintenance

```bash
# Stop all services
docker-compose down

# Remove containers and networks
docker-compose down --remove-orphans

# Remove everything including volumes
docker-compose down -v

# Clean up unused resources
docker system prune -a

# View running containers
docker-compose ps

# Execute commands in containers
docker-compose exec backend sh
docker-compose exec frontend sh
```

## Health Checks

Both services include health checks:

- **Backend**: Checks `/actuator/health` endpoint
- **Frontend**: Checks if nginx is responding on port 80

### Check Health Status

```bash
# View health status
docker-compose ps

# Check specific service health
docker inspect simsoft-backend | grep Health -A 10
docker inspect simsoft-frontend | grep Health -A 10
```

## Environment Variables

### Backend Environment Variables

```yaml
environment:
  - SPRING_PROFILES_ACTIVE=docker
  - SERVER_PORT=8080
```

### Frontend Environment Variables

The frontend automatically detects the environment and configures WebSocket connections accordingly.

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :8080
   
   # Stop conflicting services
   docker-compose down
   ```

2. **Build Failures**
   ```bash
   # Clean build
   docker-compose build --no-cache
   
   # Rebuild specific service
   docker-compose build --no-cache backend
   ```

3. **WebSocket Connection Issues**
   - Ensure both services are healthy
   - Check nginx proxy configuration
   - Verify network connectivity

4. **Memory Issues**
   ```bash
   # Increase Docker memory limit
   # In Docker Desktop: Settings > Resources > Memory
   ```

### Debug Commands

```bash
# View container logs
docker-compose logs backend
docker-compose logs frontend

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh

# Check network connectivity
docker-compose exec frontend ping backend
docker-compose exec backend ping frontend

# View network configuration
docker network ls
docker network inspect simsoft_simsoft-network
```

## Performance Optimization

### Multi-stage Builds

Both Dockerfiles use multi-stage builds to reduce final image size:

- **Backend**: Maven build stage → JRE runtime stage
- **Frontend**: Node.js build stage → Nginx runtime stage

### Caching

- Frontend includes static asset caching
- Backend uses Maven dependency caching
- Nginx includes gzip compression

### Resource Limits

You can add resource limits to the docker-compose.yml:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: '0.25'
```

## Security Considerations

### Container Security

- Non-root user in backend container
- Minimal base images (alpine)
- Security headers in nginx
- Health checks for monitoring

### Network Security

- Isolated network for services
- No direct external access to backend
- All traffic routed through frontend proxy

## Monitoring

### Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific time period
docker-compose logs --since="2023-01-01T00:00:00"
```

### Metrics

- Backend exposes actuator endpoints
- Nginx access logs available
- Health check status in docker-compose ps

## Development Workflow

### Local Development

1. **Backend Development**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Frontend Development**:
   ```bash
   cd frontend
   npm start
   ```

3. **Docker Development**:
   ```bash
   # Start only backend in Docker
   docker-compose up backend
   
   # Start only frontend in Docker
   docker-compose up frontend
   ```

### Testing

```bash
# Run backend tests
docker-compose exec backend mvn test

# Run frontend tests
docker-compose exec frontend npm test
```

## Deployment

### Production Deployment

1. **Environment Setup**:
   ```bash
   # Set production environment
   export NODE_ENV=production
   export SPRING_PROFILES_ACTIVE=production
   ```

2. **Build and Deploy**:
   ```bash
   # Build production images
   docker-compose -f docker-compose.yml build
   
   # Deploy to production
   docker-compose -f docker-compose.yml up -d
   ```

3. **Monitoring**:
   ```bash
   # Check service health
   docker-compose ps
   
   # Monitor logs
   docker-compose logs -f
   ```

### Scaling

```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Scale frontend service
docker-compose up -d --scale frontend=2
```

## File Structure

```
simsoft/
├── docker-compose.yml          # Main compose file
├── backend/
│   ├── Dockerfile.simple      # Backend container (simplified)
│   ├── Dockerfile             # Alternative multi-stage build
│   ├── .dockerignore          # Backend ignore file
│   └── pom.xml               # Maven configuration
├── frontend/
│   ├── Dockerfile             # Frontend container
│   ├── .dockerignore          # Frontend ignore file
│   └── nginx.conf             # Nginx configuration
└── DOCKER.md                  # This documentation
```

## Support

For issues related to Docker setup:

1. Check the troubleshooting section above
2. Review container logs: `docker-compose logs`
3. Verify network connectivity between services
4. Ensure all prerequisites are met 
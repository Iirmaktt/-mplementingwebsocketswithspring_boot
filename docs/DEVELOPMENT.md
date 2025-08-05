# Development Guidelines

## Code Style

### Java (Backend)
- Follow Java naming conventions
- Use meaningful variable and method names
- Add comprehensive JavaDoc comments
- Use proper exception handling
- Follow SOLID principles

### JavaScript/React (Frontend)
- Use functional components with hooks
- Follow ESLint rules
- Use meaningful component and variable names
- Implement proper error boundaries
- Use TypeScript for better type safety (recommended)

## Project Structure Best Practices

### Backend Structure
```
src/main/java/com/nazli/simsoft/
├── config/          # Configuration classes
├── controller/      # REST and WebSocket controllers
├── model/          # Data models and DTOs
├── service/        # Business logic
├── repository/     # Data access layer (if needed)
└── util/          # Utility classes
```

### Frontend Structure
```
frontend/src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── styles/        # CSS files
├── assets/        # Static assets
├── types/         # TypeScript type definitions
└── constants/     # Application constants
```

## Testing Guidelines

### Backend Testing
- Write unit tests for all service methods
- Use Mockito for mocking dependencies
- Test WebSocket functionality with integration tests
- Maintain at least 80% code coverage

### Frontend Testing
- Write unit tests for components using Jest and React Testing Library
- Test custom hooks in isolation
- Write integration tests for user interactions
- Test WebSocket communication

## Git Workflow

### Branch Naming
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/urgent-fix` - Critical fixes
- `refactor/component-name` - Code refactoring

### Commit Messages
- Use conventional commit format
- Be descriptive and concise
- Reference issue numbers when applicable

Example:
```
feat: add shape collision detection
fix: resolve WebSocket connection issues
refactor: improve physics calculation performance
```

## Performance Guidelines

### Backend
- Use connection pooling for database connections
- Implement caching where appropriate
- Monitor memory usage and garbage collection
- Use async processing for heavy computations

### Frontend
- Implement code splitting for large components
- Use React.memo for expensive components
- Optimize bundle size
- Implement proper loading states

## Security Guidelines

### Backend
- Validate all input data
- Use HTTPS in production
- Implement proper authentication and authorization
- Sanitize user inputs
- Use prepared statements for database queries

### Frontend
- Sanitize user inputs
- Implement proper error handling
- Use environment variables for sensitive data
- Validate data before sending to backend

## Documentation

### Code Documentation
- Document all public APIs
- Add inline comments for complex logic
- Keep README files updated
- Document configuration options

### API Documentation
- Use OpenAPI/Swagger for REST APIs
- Document WebSocket message formats
- Provide usage examples
- Keep documentation in sync with code changes

## Deployment

### Environment Configuration
- Use environment variables for configuration
- Separate development, staging, and production configs
- Use Docker for containerization
- Implement proper logging and monitoring

### CI/CD Pipeline
- Automate testing on every commit
- Implement code quality checks
- Use automated deployment for staging
- Monitor application health in production 
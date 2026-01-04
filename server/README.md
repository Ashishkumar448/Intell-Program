# Express Boilerplate

Production-ready Express.js application with MongoDB, metrics, and security features.

## Features

- ES6 modules
- MongoDB integration
- Security middleware (Helmet, CORS, Rate limiting)
- Prometheus metrics
- Structured logging
- Graceful shutdown
- Docker & Kubernetes ready

## Quick Start

```bash
# With Docker Compose
docker-compose up

# Local development
npm install
npm run dev
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `DB_NAME`: Database name (default: express_app)
- `METRICS_PORT`: Metrics port (default: 9100)

## Endpoints

- `GET /health`: Health check
- `GET /api/users`: Get all users
- `POST /api/users`: Create user
- `GET /metrics`: Prometheus metrics
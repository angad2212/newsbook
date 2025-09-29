import dotenv from 'dotenv';

dotenv.config();

export const config = {
  gnews: {
    apiKey: process.env.GNEWS_API_KEY || '77ef58436c389f5459b2e9525d7434a5',
    baseUrl: process.env.GNEWS_BASE_URL || 'https://gnews.io/api/v4',
  },
  grpc: {
    port: process.env.GRPC_PORT || 50051,
    host: process.env.GRPC_HOST || '0.0.0.0',
  },
  backend: {
    grpcHost: process.env.BACKEND_GRPC_HOST || 'localhost',
    grpcPort: process.env.BACKEND_GRPC_PORT || 50052,
  },
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
  }
};

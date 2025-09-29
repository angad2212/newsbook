import NewsService from './services/newsService.js';
import { config } from './config.js';

console.log('🌟 Starting News Fetch Microservice...');

// Create and start the news service
const newsService = new NewsService();

// Start the gRPC server
newsService.start();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  newsService.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  newsService.stop();
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  newsService.stop();
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  newsService.stop();
  process.exit(1);
});

console.log('✅ News Fetch Microservice initialized successfully!');

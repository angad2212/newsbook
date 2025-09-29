import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';
import GNewsClient from './gnewsClient.js';
import { config } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class NewsService {
  constructor() {
    this.gnewsClient = new GNewsClient();
    this.server = new grpc.Server();
    this.setupProto();
  }

  /**
   * Setup proto definitions
   */
  setupProto() {
    const PROTO_PATH = path.join(__dirname, '../proto/news.proto');
    
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const newsProto = grpc.loadPackageDefinition(packageDefinition).news;
    
    // Add the NewsService to the server
    this.server.addService(newsProto.NewsService.service, {
      fetchNews: this.fetchNews.bind(this),
      fetchNewsByCategory: this.fetchNewsByCategory.bind(this),
      fetchNewsByKeywords: this.fetchNewsByKeywords.bind(this),
      healthCheck: this.healthCheck.bind(this),
    });
  }

  /**
   * Fetch news with custom parameters
   */
  async fetchNews(call, callback) {
    try {
      const request = call.request;
      
      const options = {
        category: request.category || undefined,
        country: request.country || undefined,
        language: request.language || undefined,
        keywords: request.keywords || undefined,
        from: request.from_date || undefined,
        to: request.to_date || undefined,
        sortBy: request.sort_by || undefined,
        max: request.max_articles || 10
      };

      console.log('Fetching news with options:', options);
      
      const result = await this.gnewsClient.fetchNews(options);
      
      const response = {
        success: result.success,
        message: 'News fetched successfully',
        articles: result.articles,
        total_articles: result.totalArticles
      };

      callback(null, response);
    } catch (error) {
      console.error('Error in fetchNews:', error);
      callback({
        code: grpc.status.INTERNAL,
        details: error.message
      });
    }
  }

  /**
   * Fetch news by category
   */
  async fetchNewsByCategory(call, callback) {
    try {
      const request = call.request;
      
      if (!request.category) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: 'Category is required'
        });
      }

      const options = {
        country: request.country || undefined,
        language: request.language || undefined,
        max: request.max_articles || 10
      };

      console.log(`Fetching news for category: ${request.category}`);
      
      const result = await this.gnewsClient.fetchByCategory(request.category, options);
      
      const response = {
        success: result.success,
        message: `News fetched for category: ${request.category}`,
        articles: result.articles,
        total_articles: result.totalArticles
      };

      callback(null, response);
    } catch (error) {
      console.error('Error in fetchNewsByCategory:', error);
      callback({
        code: grpc.status.INTERNAL,
        details: error.message
      });
    }
  }

  /**
   * Fetch news by keywords
   */
  async fetchNewsByKeywords(call, callback) {
    try {
      const request = call.request;
      
      if (!request.keywords) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: 'Keywords are required'
        });
      }

      const options = {
        country: request.country || undefined,
        language: request.language || undefined,
        sortBy: request.sort_by || 'publishedAt',
        max: request.max_articles || 10
      };

      console.log(`Fetching news for keywords: ${request.keywords}`);
      
      const result = await this.gnewsClient.fetchByKeywords(request.keywords, options);
      
      const response = {
        success: result.success,
        message: `News fetched for keywords: ${request.keywords}`,
        articles: result.articles,
        total_articles: result.totalArticles
      };

      callback(null, response);
    } catch (error) {
      console.error('Error in fetchNewsByKeywords:', error);
      callback({
        code: grpc.status.INTERNAL,
        details: error.message
      });
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(call, callback) {
    try {
      const response = {
        status: 'healthy',
        message: 'News service is running',
        timestamp: Date.now()
      };

      callback(null, response);
    } catch (error) {
      console.error('Error in healthCheck:', error);
      callback({
        code: grpc.status.INTERNAL,
        details: error.message
      });
    }
  }

  /**
   * Start the gRPC server
   */
  start() {
    const address = `${config.grpc.host}:${config.grpc.port}`;
    
    this.server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        console.error('Failed to start gRPC server:', err);
        return;
      }
      
      console.log(`🚀 News Fetch gRPC server running on ${address}`);
      this.server.start();
    });
  }

  /**
   * Stop the gRPC server
   */
  stop() {
    this.server.forceShutdown();
    console.log('News Fetch gRPC server stopped');
  }
}

export default NewsService;

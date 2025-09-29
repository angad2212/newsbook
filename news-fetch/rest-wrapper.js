import express from 'express';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Load gRPC client
const PROTO_PATH = path.join(__dirname, './proto/news.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const newsProto = grpc.loadPackageDefinition(packageDefinition).news;
const grpcClient = new newsProto.NewsService('localhost:50051', grpc.credentials.createInsecure());

// Helper function to convert gRPC calls to Promises
function grpcCall(method, request) {
  return new Promise((resolve, reject) => {
    grpcClient[method](request, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
}

// REST Endpoints

// Health check
app.get('/health', async (req, res) => {
  try {
    const response = await grpcCall('healthCheck', { service: 'news-fetch' });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get news by category
app.get('/news/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { max_articles = 10, country, language } = req.query;
    
    const response = await grpcCall('fetchNewsByCategory', {
      category,
      max_articles: parseInt(max_articles),
      country: country || undefined,
      language: language || undefined
    });
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get news by keywords
app.get('/news/search', async (req, res) => {
  try {
    const { keywords, max_articles = 10, country, language, sort_by } = req.query;
    
    if (!keywords) {
      return res.status(400).json({ error: 'keywords parameter is required' });
    }
    
    const response = await grpcCall('fetchNewsByKeywords', {
      keywords,
      max_articles: parseInt(max_articles),
      country: country || undefined,
      language: language || undefined,
      sort_by: sort_by || 'publishedAt'
    });
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Advanced news search
app.post('/news/fetch', async (req, res) => {
  try {
    const {
      category,
      keywords,
      country,
      language,
      from_date,
      to_date,
      sort_by,
      max_articles = 10
    } = req.body;
    
    const response = await grpcCall('fetchNews', {
      category,
      keywords,
      country,
      language,
      from_date,
      to_date,
      sort_by,
      max_articles
    });
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🌐 REST API wrapper running on http://localhost:${PORT}`);
  console.log('\n📋 Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/health`);
  console.log(`  GET  http://localhost:${PORT}/news/category/{category}?max_articles=5`);
  console.log(`  GET  http://localhost:${PORT}/news/search?keywords=AI&max_articles=5`);
  console.log(`  POST http://localhost:${PORT}/news/fetch`);
  console.log('\n🧪 Test examples:');
  console.log(`  curl http://localhost:${PORT}/news/category/technology?max_articles=3`);
  console.log(`  curl "http://localhost:${PORT}/news/search?keywords=bitcoin&max_articles=3"`);
});

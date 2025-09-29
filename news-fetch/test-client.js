import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testNewsService() {
  try {
    // Load proto definition
    const PROTO_PATH = path.join(__dirname, './proto/news.proto');
    
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const newsProto = grpc.loadPackageDefinition(packageDefinition).news;
    
    // Create client
    const client = new newsProto.NewsService('localhost:50051', grpc.credentials.createInsecure());

    console.log('🧪 Testing News Fetch Service...\n');

    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await new Promise((resolve, reject) => {
      client.healthCheck({ service: 'news-fetch' }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    console.log('✅ Health Check Response:', healthResponse);

    // Test 2: Fetch news by category
    console.log('\n2️⃣ Testing Fetch News by Category (Technology)...');
    const categoryResponse = await new Promise((resolve, reject) => {
      client.fetchNewsByCategory({
        category: 'technology',
        max_articles: 3
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    console.log('✅ Category Response:', {
      success: categoryResponse.success,
      total_articles: categoryResponse.total_articles,
      articles_count: categoryResponse.articles.length,
      first_article: categoryResponse.articles[0]?.title
    });

    // Test 3: Fetch news by keywords
    console.log('\n3️⃣ Testing Fetch News by Keywords (AI)...');
    const keywordsResponse = await new Promise((resolve, reject) => {
      client.fetchNewsByKeywords({
        keywords: 'artificial intelligence',
        max_articles: 2
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    console.log('✅ Keywords Response:', {
      success: keywordsResponse.success,
      total_articles: keywordsResponse.total_articles,
      articles_count: keywordsResponse.articles.length,
      first_article: keywordsResponse.articles[0]?.title
    });

    // Test 4: Custom fetch
    console.log('\n4️⃣ Testing Custom Fetch (Business + AI)...');
    const customResponse = await new Promise((resolve, reject) => {
      client.fetchNews({
        category: 'business',
        keywords: 'AI',
        max_articles: 2
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    console.log('✅ Custom Response:', {
      success: customResponse.success,
      total_articles: customResponse.total_articles,
      articles_count: customResponse.articles.length,
      first_article: customResponse.articles[0]?.title
    });

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testNewsService();
}

export { testNewsService };

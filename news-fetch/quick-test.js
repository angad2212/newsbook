import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Quick test function
async function quickTest(testType = 'technology') {
  try {
    // Load proto
    const PROTO_PATH = path.join(__dirname, './proto/news.proto');
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const newsProto = grpc.loadPackageDefinition(packageDefinition).news;
    const client = new newsProto.NewsService('localhost:50051', grpc.credentials.createInsecure());

    console.log(`🔍 Testing: ${testType}\n`);

    let response;
    
    switch (testType) {
      case 'technology':
        response = await new Promise((resolve, reject) => {
          client.fetchNewsByCategory({
            category: 'technology',
            max_articles: 2
          }, (error, response) => {
            if (error) reject(error);
            else resolve(response);
          });
        });
        break;
        
      case 'business':
        response = await new Promise((resolve, reject) => {
          client.fetchNewsByCategory({
            category: 'business',
            max_articles: 2
          }, (error, response) => {
            if (error) reject(error);
            else resolve(response);
          });
        });
        break;
        
      case 'ai':
        response = await new Promise((resolve, reject) => {
          client.fetchNewsByKeywords({
            keywords: 'artificial intelligence',
            max_articles: 2
          }, (error, response) => {
            if (error) reject(error);
            else resolve(response);
          });
        });
        break;
        
      case 'crypto':
        response = await new Promise((resolve, reject) => {
          client.fetchNewsByKeywords({
            keywords: 'bitcoin cryptocurrency',
            max_articles: 2
          }, (error, response) => {
            if (error) reject(error);
            else resolve(response);
          });
        });
        break;
        
      default:
        console.log('Available test types: technology, business, ai, crypto');
        return;
    }

    console.log(`📊 Results for ${testType}:`);
    console.log(`✅ Success: ${response.success}`);
    console.log(`📰 Total Articles Available: ${response.total_articles.toLocaleString()}`);
    console.log(`📄 Articles Returned: ${response.articles.length}`);
    console.log('\n📝 Sample Articles:');
    
    response.articles.forEach((article, index) => {
      console.log(`\n${index + 1}. ${article.title}`);
      console.log(`   📅 Published: ${new Date(article.published_at).toLocaleDateString()}`);
      console.log(`   🌐 Source: ${article.source.name}`);
      console.log(`   🏷️  Tags: ${article.tags.join(', ') || 'None'}`);
      console.log(`   🔗 URL: ${article.url}`);
    });

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Get test type from command line argument
const testType = process.argv[2] || 'technology';

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  quickTest(testType);
}

export { quickTest };

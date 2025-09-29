# News Fetch Microservice

A gRPC-based microservice that fetches news from the GNews API and provides it to the main backend service.

## 🏗️ Architecture

```
Backend (Express) ↔ gRPC ↔ News-Fetch Service ↔ GNews API (REST)
```

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   cd news-fetch
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp config.js .env
   # Edit .env with your GNews API key
   ```

3. **Start the service:**
   ```bash
   npm run dev
   ```

4. **Test the service:**
   ```bash
   node test-client.js
   ```

## 📡 gRPC API

### Service Methods

#### `fetchNewsByCategory(request)`
Fetch news by category (e.g., "technology", "business", "health")

**Request:**
```proto
message FetchNewsByCategoryRequest {
  string category = 1;          // Required: category to search
  string country = 2;           // Optional: country filter (us, gb, in, etc.)
  string language = 3;          // Optional: language filter (en, es, fr, etc.)
  int32 max_articles = 4;       // Optional: max articles to return (1-100)
}
```

#### `fetchNewsByKeywords(request)`
Fetch news by keywords (free text search)

**Request:**
```proto
message FetchNewsByKeywordsRequest {
  string keywords = 1;          // Required: keywords to search
  string country = 2;           // Optional: country filter
  string language = 3;          // Optional: language filter
  string sort_by = 4;           // Optional: "publishedAt" or "relevance"
  int32 max_articles = 5;       // Optional: max articles to return
}
```

#### `fetchNews(request)`
Advanced news fetching with multiple parameters

**Request:**
```proto
message FetchNewsRequest {
  string category = 1;           // e.g., "technology", "business"
  string country = 2;           // e.g., "us", "gb", "in"
  string language = 3;          // e.g., "en", "es", "fr"
  string keywords = 4;          // Free text search
  string from_date = 5;         // YYYY-MM-DD format
  string to_date = 6;           // YYYY-MM-DD format
  string sort_by = 7;           // "publishedAt" or "relevance"
  int32 max_articles = 8;       // 1-100
}
```

### Response Format

All methods return:
```proto
message FetchNewsResponse {
  bool success = 1;
  string message = 2;
  repeated Article articles = 3;
  int32 total_articles = 4;
}

message Article {
  string id = 1;
  string title = 2;
  string description = 3;
  string content = 4;
  string url = 5;
  string image_url = 6;
  string published_at = 7;
  string language = 8;
  Source source = 9;
  repeated string tags = 10;
}
```

## 🔍 Available Categories

- `general` - General news
- `world` - World news
- `nation` - National news
- `business` - Business news
- `technology` - Technology news
- `entertainment` - Entertainment news
- `sports` - Sports news
- `science` - Science news
- `health` - Health news
- `food` - Food news

## 🌍 Available Countries

Common country codes: `us`, `gb`, `au`, `ca`, `in`, `ie`, `nz`, `za`, etc.

## 📝 Usage Examples

### From Backend (Node.js)

```javascript
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// Load proto and create client
const packageDefinition = protoLoader.loadSync('./news-fetch/proto/news.proto');
const newsProto = grpc.loadPackageDefinition(packageDefinition).news;
const client = new newsProto.NewsService('localhost:50051', grpc.credentials.createInsecure());

// Fetch technology news
client.fetchNewsByCategory({
  category: 'technology',
  max_articles: 10
}, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Articles:', response.articles);
  }
});

// Search for AI-related news
client.fetchNewsByKeywords({
  keywords: 'artificial intelligence',
  max_articles: 5
}, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('AI Articles:', response.articles);
  }
});
```

## 🔧 Configuration

Edit `config.js` to modify:

- GNews API key
- gRPC server port (default: 50051)
- Backend gRPC client settings
- Service configuration

## 🧪 Testing

Run the test client to verify everything works:

```bash
node test-client.js
```

This will test:
1. Health check
2. Category-based news fetching
3. Keyword-based news fetching
4. Custom parameter combinations

## 📊 Features

- ✅ gRPC communication
- ✅ GNews API integration
- ✅ Multiple search methods
- ✅ Error handling
- ✅ Health checks
- ✅ Graceful shutdown
- ✅ Auto-tagging
- ✅ Content transformation

## 🚨 Error Handling

The service handles:
- Network timeouts
- API rate limits
- Invalid parameters
- Service unavailability
- Data transformation errors

All errors are returned with appropriate gRPC status codes and error messages.

## 🔄 Next Steps

1. Set up the backend gRPC client
2. Create database integration
3. Add caching layer
4. Implement rate limiting
5. Add monitoring and logging

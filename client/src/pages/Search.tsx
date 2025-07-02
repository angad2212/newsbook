
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NewsCard } from '@/components/news/NewsCard';

const mockSearchResults = [
  {
    id: '1',
    title: 'AI Breakthrough in Machine Learning',
    summary: 'Researchers have developed a new approach to machine learning that could revolutionize how AI systems process information.',
    tags: ['AI', 'Technology', 'Research'],
    publishedAt: '2 hours ago',
    readTime: '5 min read',
    youtubeUrl: 'https://youtube.com/watch?v=example1',
  },
  {
    id: '2',
    title: 'Space Exploration Milestone Reached',
    summary: 'NASA announces successful completion of Mars rover mission objectives, paving the way for future exploration.',
    tags: ['Space', 'NASA', 'Mars'],
    publishedAt: '4 hours ago',
    readTime: '3 min read',
    youtubeUrl: 'https://youtube.com/watch?v=example2',
  },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(mockSearchResults);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter results based on search query
    const filtered = mockSearchResults.filter(
      article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.summary.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(filtered);
  };

  const handleReadMore = (id: string) => {
    console.log('Read more:', id);
  };

  const handleBookmark = (id: string) => {
    console.log('Bookmark:', id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search News</h1>
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for news, topics, or tags..."
            className="pl-10 h-12 text-lg"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          {searchQuery ? `Results for "${searchQuery}"` : 'Recent articles'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((article) => (
          <NewsCard
            key={article.id}
            {...article}
            onReadMore={handleReadMore}
            onBookmark={handleBookmark}
          />
        ))}
      </div>

      {results.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No results found for "{searchQuery}"</p>
          <p className="text-sm text-muted-foreground mt-2">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
}

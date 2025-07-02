
import { useState, useEffect } from 'react';
import { NewsCard } from '@/components/news/NewsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, RefreshCw, TrendingUp, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data
const mockNews = [
  {
    id: '1',
    title: 'Revolutionary AI Model Breaks New Ground in Language Understanding',
    summary: 'Scientists have developed a groundbreaking AI system that demonstrates unprecedented capabilities in natural language processing, potentially transforming how we interact with technology.',
    tags: ['AI', 'Technology', 'Research'],
    publishedAt: '2 hours ago',
    readTime: '4 min read',
    youtubeUrl: 'https://youtube.com/watch?v=example1',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop',
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Climate Summit Reaches Historic Agreement on Carbon Emissions',
    summary: 'World leaders have signed a comprehensive agreement to reduce global carbon emissions by 50% over the next decade, marking a significant step in combating climate change.',
    tags: ['Climate', 'Politics', 'Environment'],
    publishedAt: '4 hours ago',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&h=300&fit=crop',
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'SpaceX Successfully Lands Crew on Mars Base Alpha',
    summary: 'In a historic moment for space exploration, SpaceX has successfully transported and landed the first permanent crew at Mars Base Alpha, establishing humanity\'s first settlement on the Red Planet.',
    tags: ['Space', 'Technology', 'Exploration'],
    publishedAt: '6 hours ago',
    readTime: '8 min read',
    youtubeUrl: 'https://youtube.com/watch?v=example3',
    imageUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=300&fit=crop',
    isBookmarked: false,
  },
];

const quickStats = [
  { label: 'Unread Articles', value: '12', icon: Clock, color: 'text-blue-400' },
  { label: 'Trending Topics', value: '8', icon: TrendingUp, color: 'text-green-400' },
  { label: 'Bookmarked', value: '24', icon: Star, color: 'text-yellow-400' },
];

export default function Dashboard() {
  const [news, setNews] = useState(mockNews);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const availableFilters = ['AI', 'Technology', 'Politics', 'Space', 'Climate', 'Health'];

  const handleReadMore = (id: string) => {
    navigate(`/article/${id}`);
  };

  const handleBookmark = (id: string) => {
    setNews(prevNews =>
      prevNews.map(article =>
        article.id === id
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const filteredNews = selectedFilters.length > 0
    ? news.filter(article =>
        article.tags.some(tag => selectedFilters.includes(tag))
      )
    : news;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Good morning! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening in your world</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isLoading}
          variant="outline"
          className="self-start"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="newsbook-card">
            <CardContent className="flex items-center p-6">
              <div className={`p-2 rounded-lg bg-muted mr-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="newsbook-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter by Interest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableFilters.map((filter) => (
              <Badge
                key={filter}
                variant={selectedFilters.includes(filter) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedFilters.includes(filter)
                    ? "newsbook-green-bg hover:bg-primary/90"
                    : "hover:border-primary/50"
                }`}
                onClick={() => handleFilterToggle(filter)}
              >
                {filter}
              </Badge>
            ))}
            {selectedFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilters([])}
                className="h-6 px-2 text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* News Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {selectedFilters.length > 0 ? 'Filtered News' : 'Latest News'}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredNews.length} articles
          </span>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <NewsCard
                key={article.id}
                {...article}
                onReadMore={handleReadMore}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        ) : (
          <Card className="newsbook-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground text-center">
                No articles match your current filters. Try selecting different topics or clear your filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Bookmark, Youtube, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewsCard } from '@/components/news/NewsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockBookmarkedArticles = [
  {
    id: '1',
    title: 'Understanding Climate Change Impact',
    summary: 'A comprehensive look at how climate change is affecting global weather patterns and what we can do about it.',
    tags: ['Climate', 'Environment', 'Science'],
    publishedAt: '1 day ago',
    readTime: '8 min read',
    youtubeUrl: 'https://youtube.com/watch?v=example1',
    isBookmarked: true,
  },
  {
    id: '2',
    title: 'The Future of Renewable Energy',
    summary: 'Exploring the latest developments in solar, wind, and other renewable energy technologies.',
    tags: ['Energy', 'Technology', 'Sustainability'],
    publishedAt: '3 days ago',
    readTime: '6 min read',
    isBookmarked: true,
  },
];

const mockBookmarkedVideos = [
  {
    id: '3',
    title: 'SpaceX Launch Success',
    summary: 'Watch the highlights from the latest SpaceX mission to the International Space Station.',
    tags: ['Space', 'SpaceX', 'Technology'],
    publishedAt: '5 days ago',
    readTime: '12 min watch',
    youtubeUrl: 'https://youtube.com/watch?v=example3',
    isBookmarked: true,
  },
];

export default function Bookmarks() {
  const [articles] = useState(mockBookmarkedArticles);
  const [videos] = useState(mockBookmarkedVideos);

  const handleReadMore = (id: string) => {
    console.log('Read more:', id);
  };

  const handleBookmark = (id: string) => {
    console.log('Remove bookmark:', id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">My Bookmarks</h1>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Articles ({articles.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Youtube className="h-4 w-4" />
            Videos ({videos.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-6">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard
                  key={article.id}
                  {...article}
                  onReadMore={handleReadMore}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No bookmarked articles yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start exploring news and bookmark articles you want to read later
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <NewsCard
                  key={video.id}
                  {...video}
                  onReadMore={handleReadMore}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Youtube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No bookmarked videos yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Bookmark interesting videos to watch them later
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

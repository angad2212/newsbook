
import { Clock, ExternalLink, Bookmark, BookmarkCheck, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  youtubeUrl?: string;
  isBookmarked?: boolean;
  onReadMore: (id: string) => void;
  onBookmark: (id: string) => void;
}

export function NewsCard({
  id,
  title,
  summary,
  tags,
  publishedAt,
  readTime,
  youtubeUrl,
  isBookmarked = false,
  onReadMore,
  onBookmark,
}: NewsCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark(id);
  };

  const handleYouTubeClick = () => {
    if (youtubeUrl) {
      window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="newsbook-card group hover:-translate-y-1 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 
            className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => onReadMore(id)}
          >
            {title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleBookmark}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
          <span>•</span>
          <span>{publishedAt}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {summary}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="newsbook-tag">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={() => onReadMore(id)}
            className="newsbook-green-bg hover:bg-primary/90"
          >
            Read More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>

          {youtubeUrl && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleYouTubeClick}
              className="border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40"
            >
              <Youtube className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

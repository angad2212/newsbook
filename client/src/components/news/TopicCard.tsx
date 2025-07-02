
import { TrendingUp, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TopicCardProps {
  id: string;
  title: string;
  summary: string;
  trendingScore: number;
  discussionCount: number;
  lastUpdated: string;
  imageUrl?: string;
  tags: string[];
  onExplore: (id: string) => void;
}

export function TopicCard({
  id,
  title,
  summary,
  trendingScore,
  discussionCount,
  lastUpdated,
  imageUrl,
  tags,
  onExplore,
}: TopicCardProps) {
  return (
    <Card className="newsbook-card group hover:-translate-y-1 cursor-pointer overflow-hidden">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 
            className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors"
            onClick={() => onExplore(id)}
          >
            {title}
          </h3>
          <div className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs font-medium">{trendingScore}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{discussionCount} discussions</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{lastUpdated}</span>
          </div>
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

        <Button
          onClick={() => onExplore(id)}
          className="w-full newsbook-green-bg hover:bg-primary/90"
        >
          Explore Topic
        </Button>
      </CardContent>
    </Card>
  );
}

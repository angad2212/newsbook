
import { useState } from 'react';
import { TopicCard } from '@/components/news/TopicCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Globe, Zap, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockTrendingTopics = [
  {
    id: '1',
    title: 'The Rise of AI Agents in 2024',
    summary: 'Autonomous AI agents are transforming industries from customer service to scientific research. This comprehensive overview explores the current landscape, key players, and future implications of this technological revolution.',
    trendingScore: 95,
    discussionCount: 1247,
    lastUpdated: '2 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop',
    tags: ['AI', 'Technology', 'Future'],
  },
  {
    id: '2',
    title: 'Global Climate Action: Progress and Challenges',
    summary: 'An in-depth analysis of current climate initiatives worldwide, examining successful policies, emerging technologies, and the urgent challenges that remain in our fight against climate change.',
    trendingScore: 87,
    discussionCount: 892,
    lastUpdated: '4 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&h=300&fit=crop',
    tags: ['Climate', 'Environment', 'Policy'],
  },
  {
    id: '3',
    title: 'Space Exploration: The New Commercial Era',
    summary: 'Private companies are revolutionizing space exploration with innovative technologies and ambitious missions. Explore how commercial spaceflight is opening new frontiers for humanity.',
    trendingScore: 82,
    discussionCount: 654,
    lastUpdated: '6 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=300&fit=crop',
    tags: ['Space', 'Technology', 'Business'],
  },
];

const trendingStats = [
  { label: 'Global Discussions', value: '2.8k', icon: Globe, color: 'text-blue-400' },
  { label: 'Hot Topics', value: '24', icon: Zap, color: 'text-yellow-400' },
  { label: 'Expert Analysis', value: '156', icon: Brain, color: 'text-purple-400' },
];

export default function Trending() {
  const [topics] = useState(mockTrendingTopics);
  const navigate = useNavigate();

  const handleExplore = (id: string) => {
    navigate(`/topic/${id}`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Trending Topics</h1>
          <p className="text-muted-foreground mt-1">Discover what's shaping the world today</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trendingStats.map((stat, index) => (
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

      {/* Trending Topics Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Most Discussed Topics</h2>
          <span className="text-sm text-muted-foreground">
            Updated every hour
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              {...topic}
              onExplore={handleExplore}
            />
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <Card className="newsbook-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Breaking Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <h4 className="font-medium">Quantum Computing Breakthrough</h4>
                <p className="text-sm text-muted-foreground">Discussions increased by 340%</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">+340%</div>
                <div className="text-xs text-muted-foreground">24h change</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <h4 className="font-medium">Sustainable Energy Revolution</h4>
                <p className="text-sm text-muted-foreground">Discussions increased by 210%</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">+210%</div>
                <div className="text-xs text-muted-foreground">24h change</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

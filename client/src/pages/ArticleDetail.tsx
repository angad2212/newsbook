
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Bookmark, BookmarkCheck, Youtube, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

// Mock detailed article data - in a real app, this would come from an API
const mockArticleData: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Revolutionary AI Model Breaks New Ground in Language Understanding',
    summary: 'Scientists have developed a groundbreaking AI system that demonstrates unprecedented capabilities in natural language processing, potentially transforming how we interact with technology.',
    content: `
      <p>In a breakthrough that could reshape the landscape of artificial intelligence, researchers at leading technology institutions have unveiled a revolutionary AI model that demonstrates unprecedented capabilities in natural language understanding and generation.</p>
      
      <p>The new system, developed through a collaborative effort spanning multiple research teams, represents a significant leap forward in machine learning technology. Unlike previous models that relied heavily on pattern recognition, this innovative approach incorporates advanced reasoning capabilities that mirror human cognitive processes.</p>
      
      <p>Dr. Sarah Chen, lead researcher on the project, explains: "What sets this model apart is its ability to truly understand context and nuance in human language. It doesn't just process words; it comprehends meaning, intent, and even subtle emotional undertones."</p>
      
      <p>The implications of this breakthrough extend far beyond academic research. Industries ranging from healthcare to education are already exploring potential applications. In healthcare, the technology could revolutionize patient communication and medical diagnosis. Educational institutions see potential for personalized learning experiences that adapt to individual student needs.</p>
      
      <p>However, the development also raises important questions about the future of human-AI interaction. As these systems become more sophisticated, researchers emphasize the need for responsible development and deployment.</p>
      
      <p>"We're at a pivotal moment in AI development," notes Dr. Chen. "The capabilities we're seeing today were theoretical just a few years ago. It's crucial that we proceed thoughtfully and ensure these tools benefit humanity as a whole."</p>
      
      <p>The research team plans to publish their findings in the upcoming issue of Nature AI, with additional technical details to be released in the coming weeks. Industry experts predict that commercial applications of this technology could emerge within the next 18 months.</p>
    `,
    author: 'Dr. Sarah Chen',
    publishedAt: '2 hours ago',
    readTime: '4 min read',
    tags: ['AI', 'Technology', 'Research'],
    youtubeUrl: 'https://youtube.com/watch?v=example1',
    isBookmarked: false,
  },
  '2': {
    id: '2',
    title: 'Climate Summit Reaches Historic Agreement on Carbon Emissions',
    summary: 'World leaders have signed a comprehensive agreement to reduce global carbon emissions by 50% over the next decade, marking a significant step in combating climate change.',
    content: `
      <p>In a historic moment for global climate action, world leaders from 195 nations have reached a groundbreaking agreement to slash carbon emissions by 50% over the next decade, marking the most ambitious climate commitment in international history.</p>
      
      <p>The agreement, signed after intense negotiations spanning three weeks, establishes binding targets for developed nations while providing support mechanisms for developing countries to transition to clean energy technologies.</p>
      
      <p>UN Climate Chief Maria Rodriguez hailed the agreement as "a turning point in human history." She emphasized that this represents not just a commitment, but a comprehensive action plan with measurable milestones and accountability mechanisms.</p>
      
      <p>Key provisions of the agreement include a $500 billion global climate fund, mandatory renewable energy targets for major economies, and innovative carbon pricing mechanisms that will create market incentives for emission reductions.</p>
      
      <p>The private sector has responded positively, with major corporations already announcing accelerated sustainability initiatives. Tech giants, automotive manufacturers, and energy companies are racing to align their operations with the new global standards.</p>
      
      <p>Environmental groups, while cautiously optimistic, stress that implementation will be crucial. "Agreements on paper mean nothing without concrete action," warns climate activist Dr. James Thompson. "The real work begins now."</p>
      
      <p>The next phase involves national governments developing detailed implementation plans, which must be submitted within six months. International monitoring systems will track progress and ensure accountability.</p>
    `,
    author: 'Maria Rodriguez',
    publishedAt: '4 hours ago',
    readTime: '6 min read',
    tags: ['Climate', 'Politics', 'Environment'],
    youtubeUrl: undefined,
    isBookmarked: true,
  },
  '3': {
    id: '3',
    title: 'SpaceX Successfully Lands Crew on Mars Base Alpha',
    summary: 'In a historic moment for space exploration, SpaceX has successfully transported and landed the first permanent crew at Mars Base Alpha, establishing humanity\'s first settlement on the Red Planet.',
    content: `
      <p>In a moment that will be remembered as a defining achievement in human history, SpaceX has successfully completed its most ambitious mission yet: landing the first permanent crew at Mars Base Alpha, officially establishing humanity's first settlement on the Red Planet.</p>
      
      <p>The six-person crew, consisting of engineers, scientists, and medical specialists from multiple nations, touched down on the Martian surface after a seven-month journey from Earth. The landing marks the culmination of decades of planning and technological development.</p>
      
      <p>Commander Lisa Park, mission leader, transmitted the first message from the surface: "Mars Base Alpha is operational. We are no longer visitors to Mars – we are residents. This is a new chapter for humanity."</p>
      
      <p>The base, constructed using advanced 3D printing technology and materials sourced from the Martian environment, represents a marvel of engineering. Solar arrays, atmospheric processors, and hydroponic gardens are already functioning, creating a self-sustaining ecosystem.</p>
      
      <p>The mission has faced significant challenges, from radiation exposure during transit to the psychological demands of isolation. However, breakthrough technologies in life support systems and mental health monitoring have made long-term habitation possible.</p>
      
      <p>NASA Administrator John Mitchell praised the achievement: "This isn't just about reaching Mars – it's about proving that humanity can thrive beyond Earth. Every system we've developed, every lesson we've learned, brings us closer to becoming a truly spacefaring civilization."</p>
      
      <p>The crew will spend the next two years conducting scientific research, expanding the base infrastructure, and preparing for the arrival of additional settlers. Their work will lay the foundation for larger settlements and eventual terraforming projects.</p>
      
      <p>Back on Earth, space agencies worldwide are accelerating their own Mars programs, inspired by this historic achievement. The era of interplanetary civilization has officially begun.</p>
    `,
    author: 'Commander Lisa Park',
    publishedAt: '6 hours ago',
    readTime: '8 min read',
    tags: ['Space', 'Technology', 'Exploration'],
    youtubeUrl: 'https://youtube.com/watch?v=example3',
    isBookmarked: false,
  },
};

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const article = id ? mockArticleData[id] : null;

  if (!article) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleYouTubeClick = () => {
    if (article.youtubeUrl) {
      window.open(article.youtubeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-muted"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Article Header */}
      <Card className="newsbook-card mb-6">
        <CardContent className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold leading-tight mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>By {article.author}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTime}</span>
              </div>
              <span>•</span>
              <span>{article.publishedAt}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="newsbook-tag">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                className="hover:bg-muted"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 mr-2 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4 mr-2" />
                )}
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hover:bg-muted"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>

              {article.youtubeUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleYouTubeClick}
                  className="border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40"
                >
                  <Youtube className="h-4 w-4 mr-2 text-red-500" />
                  Watch Video
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Article Content */}
      <Card className="newsbook-card">
        <CardContent className="p-8">
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              lineHeight: '1.8',
              fontSize: '1.1rem',
            }}
          />
        </CardContent>
      </Card>

      {/* Related Articles Section */}
      <Card className="newsbook-card mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 cursor-pointer transition-colors">
              <div>
                <h4 className="font-medium">AI Ethics: The Future of Responsible Development</h4>
                <p className="text-sm text-muted-foreground">Exploring the ethical implications of advanced AI systems</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 cursor-pointer transition-colors">
              <div>
                <h4 className="font-medium">Machine Learning Breakthroughs in 2024</h4>
                <p className="text-sm text-muted-foreground">A comprehensive review of this year's major advances</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

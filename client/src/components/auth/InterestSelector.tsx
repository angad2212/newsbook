
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const availableInterests = [
  'Artificial Intelligence',
  'Politics',
  'Space & Astronomy',
  'Movies & Entertainment',
  'Health & Wellness',
  'Finance & Crypto',
  'Sports',
  'Startups & Business',
  'Psychology',
  'History',
  'Climate Change',
  'Technology',
  'Science',
  'Travel',
  'Food & Cooking',
  'Fashion',
  'Gaming',
  'Art & Design',
  'Music',
  'Books & Literature',
];

interface InterestSelectorProps {
  onComplete: (interests: string[]) => void;
  isLoading?: boolean;
  initialInterests?: string[];
}

export function InterestSelector({ 
  onComplete, 
  isLoading = false, 
  initialInterests = [] 
}: InterestSelectorProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleComplete = () => {
    if (selectedInterests.length >= 3) {
      onComplete(selectedInterests);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">
          Select at least 3 topics that interest you
        </p>
        <p className="text-xs text-primary mt-1">
          {selectedInterests.length} selected
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableInterests.map((interest) => (
          <Button
            key={interest}
            variant={selectedInterests.includes(interest) ? "default" : "outline"}
            className={`h-auto p-3 text-sm whitespace-normal text-left justify-start ${
              selectedInterests.includes(interest)
                ? "newsbook-green-bg hover:bg-primary/90"
                : "hover:border-primary/50"
            }`}
            onClick={() => toggleInterest(interest)}
          >
            <div className="flex items-center gap-2 w-full">
              {selectedInterests.includes(interest) && (
                <Check className="h-4 w-4 flex-shrink-0" />
              )}
              <span className="flex-1">{interest}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleComplete}
          disabled={selectedInterests.length < 3 || isLoading}
          className="newsbook-green-bg hover:bg-primary/90 px-8"
        >
          {isLoading ? 'Creating account...' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );
}

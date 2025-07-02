
import { useState } from 'react';
import { User, Edit2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InterestSelector } from '@/components/auth/InterestSelector';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });
  const [currentInterests, setCurrentInterests] = useState([
    'Artificial Intelligence',
    'Space & Astronomy',
    'Technology',
    'Climate Change',
    'Startups & Business',
  ]);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
    console.log('Profile saved:', userInfo);
  };

  const handleUpdateInterests = (newInterests: string[]) => {
    setCurrentInterests(newInterests);
    setIsEditingInterests(false);
    console.log('Interests updated:', newInterests);
  };

  if (isEditingInterests) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="newsbook-card">
          <CardHeader>
            <CardTitle className="text-2xl">Update Your Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <InterestSelector
              initialInterests={currentInterests}
              onComplete={handleUpdateInterests}
            />
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditingInterests(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>

      {/* Profile Information */}
      <Card className="newsbook-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Profile Information</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          {isEditing && (
            <Button onClick={handleSaveProfile} className="newsbook-green-bg">
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="newsbook-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">My Interests</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingInterests(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Interests
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {currentInterests.map((interest, index) => (
              <Badge key={index} className="newsbook-tag">
                {interest}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Your news feed is personalized based on these interests
          </p>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card className="newsbook-card">
        <CardHeader>
          <CardTitle className="text-xl">Activity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground">Articles Read</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">23</div>
              <div className="text-sm text-muted-foreground">Bookmarks</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">45</div>
              <div className="text-sm text-muted-foreground">Videos Watched</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

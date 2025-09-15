import { useState, useEffect } from 'react';
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
    name: '',
    email: '',
    interests: [] as string[],
    bookmarks: [] as any[],
    readArticles: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You are not logged in!');
          setLoading(false);
          return;
        }
        const res = await fetch('http://localhost:3009/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          alert('Session expired. Please log in again.');
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();
        setUserInfo({
          name: data.name,
          email: data.email,
          interests: data.interests || [],
          bookmarks: data.bookmarks || [],
          readArticles: data.readArticles || [],
        });
      } catch (err) {
        alert('Could not load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update profile (name)
  const handleSaveProfile = async () => {
    setIsEditing(false);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3009/api/auth/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userInfo.name,
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      const updatedUser = await res.json();
      setUserInfo((prev) => ({
        ...prev,
        name: updatedUser.name,
      }));
    } catch (err) {
      alert('Could not update profile');
    }
  };

  // Update only interests
  const handleUpdateInterests = async (newInterests: string[]) => {
    setIsEditingInterests(false);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3009/api/auth/interests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          interests: newInterests,
        }),
      });

      if (!res.ok) throw new Error('Failed to update interests');

      const updatedUser = await res.json();
      setUserInfo((prev) => ({
        ...prev,
        interests: updatedUser.interests || [],
      }));
    } catch (err) {
      alert('Could not update interests');
    }
  };

  if (loading) {
    return <div className="p-6 max-w-4xl mx-auto">Loading...</div>;
  }

  if (isEditingInterests) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="newsbook-card">
          <CardHeader>
            <CardTitle className="text-2xl">Update Your Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <InterestSelector
              initialInterests={userInfo.interests}
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
                disabled
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
            {userInfo.interests.map((interest, index) => (
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
              <div className="text-2xl font-bold text-primary">{userInfo.readArticles.length}</div>
              <div className="text-sm text-muted-foreground">Articles Read</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{userInfo.bookmarks.length}</div>
              <div className="text-sm text-muted-foreground">Bookmarks</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Videos Watched</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
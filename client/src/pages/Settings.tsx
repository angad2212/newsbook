
import { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Bell, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: true,
    emailDigest: true,
    pushNotifications: false,
    weeklyDigest: true,
    breakingNews: true,
    autoplay: false,
  });

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    // Save settings logic here
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {/* Appearance Settings */}
      <Card className="newsbook-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
              <div className="text-sm text-muted-foreground">
                Use dark theme across the application
              </div>
            </div>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={() => handleSettingChange('darkMode')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="newsbook-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive notifications for breaking news
              </div>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={() => handleSettingChange('pushNotifications')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="breaking-news" className="text-base">Breaking News Alerts</Label>
              <div className="text-sm text-muted-foreground">
                Get notified about important breaking news
              </div>
            </div>
            <Switch
              id="breaking-news"
              checked={settings.breakingNews}
              onCheckedChange={() => handleSettingChange('breakingNews')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card className="newsbook-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-digest" className="text-base">Daily Email Digest</Label>
              <div className="text-sm text-muted-foreground">
                Receive a daily summary of news in your areas of interest
              </div>
            </div>
            <Switch
              id="email-digest"
              checked={settings.emailDigest}
              onCheckedChange={() => handleSettingChange('emailDigest')}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-digest" className="text-base">Weekly Digest</Label>
              <div className="text-sm text-muted-foreground">
                Get a comprehensive weekly summary every Sunday
              </div>
            </div>
            <Switch
              id="weekly-digest"
              checked={settings.weeklyDigest}
              onCheckedChange={() => handleSettingChange('weeklyDigest')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Media Settings */}
      <Card className="newsbook-card">
        <CardHeader>
          <CardTitle className="text-xl">Media & Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoplay" className="text-base">Autoplay Videos</Label>
              <div className="text-sm text-muted-foreground">
                Automatically play videos when scrolling through articles
              </div>
            </div>
            <Switch
              id="autoplay"
              checked={settings.autoplay}
              onCheckedChange={() => handleSettingChange('autoplay')}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="newsbook-green-bg">
          Save Settings
        </Button>
      </div>
    </div>
  );
}

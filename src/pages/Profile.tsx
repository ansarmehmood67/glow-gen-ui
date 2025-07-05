
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Settings, Globe, Calendar, Edit2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate web developer and AI enthusiast',
    joinDate: 'January 2024'
  });

  const generatedWebsites = [
    { id: 1, title: 'Modern Portfolio', type: 'Portfolio', date: '2024-01-15', status: 'Published' },
    { id: 2, title: 'Tech Startup Landing', type: 'Landing Page', date: '2024-01-12', status: 'Draft' },
    { id: 3, title: 'Restaurant Menu Site', type: 'Business', date: '2024-01-10', status: 'Published' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save user data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 border-border glow mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-white">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold">{userData.name}</h1>
                    <p className="text-muted-foreground">{userData.email}</p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {userData.joinDate}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="websites">My Websites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          value={userData.bio}
                          onChange={(e) => setUserData({...userData, bio: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-cyan-600">
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p><strong>Bio:</strong> {userData.bio}</p>
                      <p><strong>Member since:</strong> {userData.joinDate}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card/50 border-border text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">12</div>
                    <p className="text-muted-foreground">Websites Created</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">8</div>
                    <p className="text-muted-foreground">Published</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">4</div>
                    <p className="text-muted-foreground">Drafts</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="websites" className="space-y-6">
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Generated Websites
                  </CardTitle>
                  <CardDescription>
                    Manage all your AI-generated websites
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedWebsites.map((website) => (
                      <div key={website.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{website.title}</h3>
                          <p className="text-sm text-muted-foreground">{website.type} • Created {website.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={website.status === 'Published' ? 'default' : 'secondary'}>
                            {website.status}
                          </Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={userData.email} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground mt-1">Contact support to change your email</p>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="destructive">Delete Account</Button>
                    <p className="text-xs text-muted-foreground mt-2">This action cannot be undone</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;

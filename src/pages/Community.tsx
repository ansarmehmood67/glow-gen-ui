
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart, Eye, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Community = () => {
  const showcaseItems = [
    {
      id: 1,
      title: 'Modern Portfolio Site',
      author: 'Sarah Chen',
      description: 'A sleek portfolio with smooth animations',
      tags: ['Portfolio', 'Modern', 'Animations'],
      likes: 42,
      views: 256,
      comments: 8
    },
    {
      id: 2,
      title: 'Restaurant Landing Page',
      author: 'Mike Johnson',
      description: 'Beautiful restaurant site with menu integration',
      tags: ['Restaurant', 'Business', 'Food'],
      likes: 38,
      views: 189,
      comments: 12
    },
    {
      id: 3,
      title: 'Tech Startup Website',
      author: 'Alex Rivera',
      description: 'Clean corporate design for a tech company',
      tags: ['Corporate', 'Tech', 'Startup'],
      likes: 51,
      views: 342,
      comments: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Community Showcase
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing websites created by our community and get inspired for your next project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseItems.map((item) => (
            <Card key={item.id} className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Website Preview</span>
                </div>
                
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-cyan-400 text-white text-xs">
                      {item.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{item.author}</span>
                </div>
                
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {item.likes}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {item.views}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {item.comments}
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Website
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-card/50 border-border max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">Share Your Creation</h2>
              <p className="text-muted-foreground mb-6">
                Built something amazing? Share it with the community and inspire others!
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600">
                Submit Your Website
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;

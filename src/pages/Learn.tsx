
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Learn = () => {
  const resources = [
    {
      icon: BookOpen,
      title: 'Getting Started Guide',
      description: 'Learn the basics of AI website generation',
      type: 'Guide',
      duration: '10 min read'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video walkthroughs',
      type: 'Video',
      duration: '5-15 min each'
    },
    {
      icon: FileText,
      title: 'Best Practices',
      description: 'Tips for creating better prompts',
      type: 'Article',
      duration: '5 min read'
    },
    {
      icon: Users,
      title: 'Community Examples',
      description: 'See what others have built',
      type: 'Showcase',
      duration: 'Browse'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Learn & Master
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to become an AI website generation expert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <resource.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {resource.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {resource.duration}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-card/50 border-border max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-muted-foreground mb-6">
                Join our community of creators and get help from our team and other users
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-primary to-accent">
                  Join Discord Community
                </Button>
                <Button variant="outline">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Learn;

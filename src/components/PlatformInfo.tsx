
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Code, Palette, Rocket } from 'lucide-react';

const PlatformInfo = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Advanced AI understands your requirements and generates clean, modern code instantly.'
    },
    {
      icon: Code,
      title: 'Production Ready',
      description: 'Generated code follows best practices and is ready for deployment without modifications.'
    },
    {
      icon: Palette,
      title: 'Beautiful Design',
      description: 'Every generated site comes with modern, responsive design that looks great on all devices.'
    },
    {
      icon: Rocket,
      title: 'Lightning Fast',
      description: 'From idea to live website in seconds. No more waiting weeks for development.'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Why Choose olytiq?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of web development with our AI-powered platform that transforms your ideas into reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformInfo;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Code, Palette, Globe, Shield, Rocket } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate stunning websites in seconds with our advanced AI technology.'
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Get production-ready, semantic HTML and CSS that follows best practices.'
    },
    {
      icon: Palette,
      title: 'Beautiful Design',
      description: 'Modern, responsive designs that look great on all devices.'
    },
    {
      icon: Globe,
      title: 'SEO Optimized',
      description: 'Built-in SEO optimization to help your website rank higher.'
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Enterprise-grade security with data encryption and privacy protection.'
    },
    {
      icon: Rocket,
      title: 'Deploy Ready',
      description: 'One-click deployment to your favorite hosting platform.'
    }
  ];

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create professional websites with AI-powered generation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

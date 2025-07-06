
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Code, Palette, Rocket } from 'lucide-react';

const PlatformInfo = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Generation',
      description: 'Advanced AI understands your requirements and generates clean, production-ready code instantly.'
    },
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and Tailwind CSS. Code follows industry best practices.'
    },
    {
      icon: Palette,
      title: 'Beautiful Designs',
      description: 'Every generated site features modern, responsive design that looks stunning on all devices.'
    },
    {
      icon: Rocket,
      title: 'Deploy Instantly',
      description: 'From concept to live website in seconds. No complex setup or deployment hassles.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Why Choose </span>
            <span className="brand-gradient">olytiq?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of web development with our AI-powered platform that transforms your ideas into reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glow-card hover:border-primary/30 transition-all duration-300 group hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformInfo;

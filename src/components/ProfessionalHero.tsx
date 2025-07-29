import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const ProfessionalHero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-accent/50 border border-border rounded-full">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">AI-Powered Website Creation</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <span className="text-foreground">Create</span>
          <br />
          <span className="text-gradient-subtle">Professional Websites</span>
          <br />
          <span className="text-foreground">In Minutes</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
          Transform your ideas into beautiful, functional websites with our advanced AI platform.
          <br />
          <span className="text-primary font-medium">No coding required. Just pure creativity.</span>
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="status-dot status-online" />
            <span>Live & Ready</span>
            <span className="text-border">•</span>
            <span>50,000+ Websites Created</span>
            <span className="text-border">•</span>
            <span>99.9% Uptime</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs font-medium">Get Started</span>
            <ArrowRight className="w-4 h-4 rotate-90 animate-pulse-subtle" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHero;
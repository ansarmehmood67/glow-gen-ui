
import React from 'react';

const HeroSection = () => {
  return (
    <div className="text-center space-y-8 mb-16">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-float">
          AI Website
        </h1>
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-float">
          Generator
        </h1>
      </div>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Transform your ideas into stunning websites with the power of AI. 
        Just describe what you want, and watch the magic happen.
      </p>
      <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span>Instant Generation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>Mobile Ready</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

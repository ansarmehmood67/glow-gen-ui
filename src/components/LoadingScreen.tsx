import React from 'react';
import { Sparkles, Code, Globe } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 w-16 h-16 mx-auto bg-primary/20 rounded-2xl animate-ping" />
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Creating Your Website</h2>
          <p className="text-muted-foreground">Our AI is crafting something amazing for you...</p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-subtle" />
            <span className="text-foreground">Analyzing your requirements</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Code className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Generating clean code</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Building responsive design</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-accent rounded-full h-1 overflow-hidden">
          <div className="h-full bg-primary rounded-full loading-clean" />
        </div>

        <p className="text-xs text-muted-foreground">
          This usually takes 15-30 seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
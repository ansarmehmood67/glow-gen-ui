
import React from 'react';
import { Code, Palette, Smartphone, Zap, Sparkles } from 'lucide-react';

const LoadingAnimation = () => {
  const steps = [
    { icon: Sparkles, text: "Analyzing your vision", delay: "0s" },
    { icon: Code, text: "Generating structure", delay: "0.5s" },
    { icon: Palette, text: "Crafting design", delay: "1s" },
    { icon: Smartphone, text: "Optimizing experience", delay: "1.5s" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-8 premium-card rounded-3xl">
      <div className="text-center space-y-8">
        {/* Main animation */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center relative overflow-hidden">
            <Zap className="w-10 h-10 text-white animate-pulse z-10" />
            <div className="absolute inset-0 shimmer-loading rounded-full"></div>
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-ping opacity-20"></div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold premium-gradient">AI Magic in Progress</h3>
          <p className="text-muted-foreground">Creating your perfect website...</p>
        </div>
        
        {/* Progress steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="flex items-center space-x-4 p-4 bg-background/50 rounded-xl border border-border/50"
                style={{ animationDelay: step.delay }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center animate-pulse">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg text-foreground flex-1">{step.text}</span>
                <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary shimmer-loading rounded-full"
                    style={{ 
                      animationDelay: step.delay,
                      animationDuration: '2s'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-sm text-muted-foreground bg-primary/10 px-4 py-2 rounded-full inline-block">
          ✨ Usually takes 10-30 seconds
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;


import React from 'react';
import { Code, Palette, Smartphone, Zap } from 'lucide-react';

const LoadingAnimation = () => {
  const steps = [
    { icon: Code, text: "Analyzing your prompt", delay: "0s" },
    { icon: Palette, text: "Designing layout", delay: "0.5s" },
    { icon: Smartphone, text: "Optimizing for mobile", delay: "1s" },
    { icon: Zap, text: "Generating code", delay: "1.5s" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-card border border-border rounded-2xl glow">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 animate-pulse-glow flex items-center justify-center">
            <Zap className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 animate-ping opacity-20"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-glow">Creating Your Website</h3>
        
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="flex items-center space-x-4 p-4 bg-background/50 rounded-lg"
                style={{ animationDelay: step.delay }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center animate-pulse">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg text-muted-foreground">{step.text}</span>
                <div className="flex-1">
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 animate-pulse"
                      style={{ 
                        width: '100%',
                        animation: `loading-bar 2s ease-in-out infinite ${step.delay}`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-sm text-muted-foreground">
          This usually takes 10-30 seconds...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;

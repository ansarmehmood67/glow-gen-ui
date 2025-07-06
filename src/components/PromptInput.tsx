
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Zap, ArrowUp, Paperclip, Globe } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput = ({ onGenerate, isLoading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const changingWords = [
    'portfolio site',
    'ecommerce store',
    'landing page',
    'blog website',
    'dashboard app',
    'social platform',
    'mobile app',
    'web application'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % changingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
          Build something{' '}
          <span className="inline-flex items-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            <Zap className="w-12 h-12 md:w-16 md:h-16 text-primary mx-2" />
            amazing
          </span>
        </h1>

        {/* Animated subtitle */}
        <div className="text-xl md:text-2xl text-muted-foreground mb-12 font-light h-8">
          <span>Ask olytiq to create a </span>
          <span className="text-primary font-medium animate-text-change">
            {changingWords[currentWordIndex]}
          </span>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
          <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask olytiq to create a prototype..."
              className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground text-lg resize-none focus:ring-0 focus:outline-none min-h-[60px]"
              disabled={isLoading}
            />
            
            {/* Bottom toolbar */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs font-bold">+</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  <Paperclip className="w-5 h-5" />
                  <span className="text-sm">Attach</span>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">Public</span>
                </button>
              </div>
              
              <Button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl w-10 h-10"
              >
                {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                ) : (
                  <ArrowUp className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptInput;

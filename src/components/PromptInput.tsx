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
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const changingWords = [
    'revolutionary AI applications',
    'next-generation platforms',
    'intelligent user experiences',
    'cutting-edge solutions',
    'premium digital products'
  ];

  useEffect(() => {
    const currentWord = changingWords[currentWordIndex];

    if (isTyping) {
      let charIndex = 0;
      const typeInInterval = setInterval(() => {
        setDisplayText(currentWord.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex >= currentWord.length) {
          clearInterval(typeInInterval);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 80);
      return () => clearInterval(typeInInterval);
    } else {
      let charIndex = currentWord.length;
      const typeOutInterval = setInterval(() => {
        setDisplayText(currentWord.slice(0, charIndex - 1));
        charIndex--;

        if (charIndex <= 0) {
          clearInterval(typeOutInterval);
          setCurrentWordIndex((prev) => (prev + 1) % changingWords.length);
          setIsTyping(true);
        }
      }, 60);
      return () => clearInterval(typeOutInterval);
    }
  }, [currentWordIndex, isTyping]);

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
    <div className="min-h-screen flex items-center justify-center px-6 pt-32">
      <div className="w-full max-w-5xl mx-auto text-center space-y-12">
        {/* Elite Hero Section */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight">
              <span className="text-foreground block">Build the</span>
              <span className="premium-gradient block">Impossible</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform ideas into intelligent digital experiences with AI-powered precision
            </p>
          </div>
          
          {/* Dynamic Typewriter */}
          <div className="text-lg text-muted-foreground">
            <span>Create </span>
            <span className="text-primary font-semibold text-shimmer">
              {displayText}
            </span>
            <span className="animate-pulse">|</span>
          </div>
        </div>

        {/* Premium Prompt Interface */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
          <div className="glass-card rounded-3xl p-8 smart-animate">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your vision in detail..."
              className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground text-xl resize-none focus:ring-0 focus:outline-none min-h-[120px] leading-relaxed font-medium"
              disabled={isLoading}
            />

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">
                  AI-powered • Real-time preview • Production-ready
                </div>
              </div>

              <Button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                size="lg"
                className="btn-primary text-primary-foreground rounded-2xl px-8 py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Generate</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-8 text-muted-foreground text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Enterprise-grade security</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Production-ready code</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Instant deployment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;

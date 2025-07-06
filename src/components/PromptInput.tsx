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
    'a portfolio website',
    'an ecommerce store',
    'a startup landing page',
    'a personal blog',
    'a SaaS dashboard'
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
  }, [currentWordIndex, isTyping, changingWords]);

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
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl mx-auto text-center space-y-12">
        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold">
            <span className="text-foreground">Make it. Mean it. </span>
            <span className="premium-gradient flex items-center justify-center gap-4">
              <Zap className="w-16 h-16 md:w-20 md:h-20 text-primary animate-float" />
              Olytiq.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground">
            Describe your vision and watch it come to life...
          </p>
        </div>

        {/* Input form with animated heading inside prompt */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
          <div className="premium-card rounded-3xl p-8 backdrop-blur-sm">

            {/* Animated prompt helper text */}
            <div className="text-xl md:text-2xl text-muted-foreground font-light mb-6 text-left">
              Ask Olytiq to create{' '}
              <span className="text-primary font-medium">
                {displayText}
                <span className="typewriter"></span>
              </span>
            </div>

            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Start typing your idea here..."
              className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground text-xl resize-none focus:ring-0 focus:outline-none min-h-[80px] leading-relaxed"
              disabled={isLoading}
            />

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div className="flex items-center space-x-6">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105"
                  disabled={isLoading}
                >
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80">
                    <span className="text-sm font-bold">+</span>
                  </div>
                </button>

                <button
                  type="button"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-200"
                  disabled={isLoading}
                >
                  <Paperclip className="w-5 h-5" />
                  <span className="text-sm font-medium">Attach</span>
                </button>

                <button
                  type="button"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-200"
                  disabled={isLoading}
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">Public</span>
                </button>
              </div>

              <Button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                size="icon"
                className="btn-primary text-primary-foreground rounded-2xl w-12 h-12 border-0"
              >
                {isLoading ? (
                  <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                ) : (
                  <ArrowUp className="w-6 h-6" />
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

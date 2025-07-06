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
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        {/* Hero heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-foreground">Make it. Mean it. </span>
            <span className="premium-gradient flex items-center justify-center gap-4">
              <Zap className="w-10 h-10 md:w-12 md:h-12 text-primary animate-float" />
              Olytiq.
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Describe your vision and watch it come to life…
          </p>
        </div>

        {/* Prompt area */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          <div className="premium-card rounded-3xl p-6 backdrop-blur-sm">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask Olytiq to create ${displayText}`}
              className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground text-lg resize-none focus:ring-0 focus:outline-none min-h-[80px] leading-relaxed"
              disabled={isLoading}
            />

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-6">
                <button type="button" disabled className="flex items-center text-muted-foreground space-x-2">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">+</span>
                  </div>
                </button>
                <button type="button" disabled className="flex items-center space-x-2 text-muted-foreground">
                  <Paperclip className="w-5 h-5" />
                  <span className="text-sm font-medium">Attach</span>
                </button>
                <button type="button" disabled className="flex items-center space-x-2 text-muted-foreground">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">Public</span>
                </button>
              </div>

              <Button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                size="icon"
                className="btn-primary text-primary-foreground rounded-2xl w-10 h-10 border-0"
              >
                {isLoading ? (
                  <div className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
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

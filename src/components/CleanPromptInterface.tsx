import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles, Upload, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CleanPromptInterfaceProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  "A modern portfolio website for a creative professional",
  "E-commerce store with clean product showcase",
  "Corporate website with team and services sections",
  "Restaurant site with menu and reservation system"
];

const CleanPromptInterface: React.FC<CleanPromptInterfaceProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
      };
      
      recognition.start();
    }
  };

  return (
    <div className="relative -mt-32 pb-24">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Main Interface */}
        <div className="clean-card p-8 hover-lift">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI Website Generator</span>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Describe Your Vision</h2>
            <p className="text-muted-foreground">Tell us what kind of website you want to create</p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="e.g., Create a modern portfolio website for a photographer with a gallery, about page, and contact form..."
                className="min-h-[120px] text-base leading-relaxed resize-none pr-20 border-border focus:border-primary"
                disabled={isLoading}
              />
              
              {/* Voice Input */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                    isRecording 
                      ? "bg-destructive text-destructive-foreground animate-pulse-subtle" 
                      : "bg-accent text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-sm text-muted-foreground font-medium">Suggestions:</p>
                <div className="grid gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-left p-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload Reference
                </button>
                <div className="text-xs text-muted-foreground">
                  {prompt.length}/2000
                </div>
              </div>

              <Button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="btn-primary px-6 py-2.5 group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Generate Website</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="status-dot status-online" />
            <span>Secure Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-dot status-online" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-dot status-online" />
            <span>Enterprise Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanPromptInterface;
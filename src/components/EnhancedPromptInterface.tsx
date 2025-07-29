import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Sparkles, Wand2, Upload, ArrowRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedPromptInterfaceProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const SMART_SUGGESTIONS = [
  "Create a modern portfolio website for a UX designer",
  "Build a SaaS landing page with pricing tiers",
  "Design an e-commerce store for handmade jewelry",
  "Make a restaurant website with online reservations",
  "Create a blog platform for tech tutorials"
];

const EnhancedPromptInterface: React.FC<EnhancedPromptInterfaceProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Cycling suggestions
  useEffect(() => {
    if (!showSuggestions) return;
    
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % SMART_SUGGESTIONS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showSuggestions]);

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
    <div className="relative z-20 w-full max-w-4xl mx-auto px-4">
      {/* Main Prompt Interface */}
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-2xl blur-xl opacity-60" />
        
        {/* Main Container */}
        <div className="relative bg-background/80 backdrop-blur-2xl border border-primary/10 rounded-2xl p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">AI Website Generator</h2>
                <p className="text-sm text-muted-foreground">Describe your vision, we'll make it reality</p>
              </div>
            </div>
            
            {/* Live Activity Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Live</span>
            </div>
          </div>

          {/* Prompt Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Describe the website you want to create..."
                className="min-h-[120px] text-lg leading-relaxed bg-background/50 border-primary/20 focus:border-primary/40 resize-none pr-16"
                disabled={isLoading}
              />
              
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={cn(
                  "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  isRecording 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Smart Suggestions */}
            {showSuggestions && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lightbulb className="w-4 h-4" />
                  <span>Smart Suggestions</span>
                </div>
                <div className="grid gap-2">
                  {SMART_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={cn(
                        "text-left p-3 rounded-lg border transition-all",
                        index === currentSuggestion % 3
                          ? "border-primary/30 bg-primary/5 text-foreground"
                          : "border-primary/10 bg-background/30 text-muted-foreground hover:border-primary/20 hover:bg-primary/5"
                      )}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 bg-background/50 hover:bg-primary/5 transition-all text-sm text-muted-foreground"
                >
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 bg-background/50 hover:bg-primary/5 transition-all text-sm text-muted-foreground"
                >
                  <Sparkles className="w-4 h-4" />
                  Enhance Prompt
                </button>
              </div>

              <Button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Generate Website</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Character Count & Tips */}
          <div className="flex items-center justify-between pt-4 border-t border-primary/10 mt-6">
            <div className="text-xs text-muted-foreground">
              {prompt.length}/500 characters
            </div>
            <div className="text-xs text-muted-foreground">
              💡 Tip: Be specific about colors, layout, and functionality
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full" />
          <span>GDPR Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full" />
          <span>SOC 2 Certified</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPromptInterface;
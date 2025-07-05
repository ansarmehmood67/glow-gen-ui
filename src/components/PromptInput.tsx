
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput = ({ onGenerate, isLoading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  };

  const examplePrompts = [
    "Create a modern portfolio website with dark theme and animations",
    "Build a landing page for a tech startup with hero section and features",
    "Design a restaurant website with menu and contact information",
    "Make a blog website with clean typography and sidebar"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the website you want to create... (e.g., 'Create a modern portfolio website with animations and dark theme')"
            className="min-h-32 bg-card border-2 border-border hover:border-primary/50 focus:border-primary transition-all duration-300 text-lg p-6 resize-none glow"
            disabled={isLoading}
          />
          <div className="absolute top-4 right-4">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={!prompt.trim() || isLoading}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 glow-intense disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
              Generating Website...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-3" />
              Generate Website
            </>
          )}
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">Try these examples:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              disabled={isLoading}
              className="text-left p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;

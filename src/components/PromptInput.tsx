
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, ArrowUp, Paperclip, Globe } from 'lucide-react';

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Build something{' '}
          <span className="inline-flex items-center">
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-orange-400 mx-2" />
            Lovable
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 font-light">
          Create apps and websites by chatting with AI
        </p>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
          <div className="relative bg-gray-900 rounded-2xl p-6 shadow-2xl">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Lovable to create a prototype..."
              className="w-full bg-transparent border-none text-white placeholder:text-gray-400 text-lg resize-none focus:ring-0 focus:outline-none min-h-[60px]"
              disabled={isLoading}
            />
            
            {/* Bottom toolbar */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">+</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <Paperclip className="w-5 h-5" />
                  <span className="text-sm">Attach</span>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
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
                className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl w-10 h-10"
              >
                {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full"></div>
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

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap, ArrowRight, Code, Palette } from 'lucide-react';

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
    {
      icon: <Code className="w-5 h-5" />,
      title: "Portfolio Website",
      description: "Create a modern portfolio website with dark theme and animations"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Startup Landing",
      description: "Build a landing page for a tech startup with hero section and features"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Restaurant Site",
      description: "Design a restaurant website with menu and contact information"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Blog Platform",
      description: "Make a blog website with clean typography and sidebar"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Describe Your Vision
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tell our AI what you want to create. Be as detailed or as simple as you like – 
            our advanced algorithms will understand and bring your ideas to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main input area */}
          <form onSubmit={handleSubmit} className="mb-16">
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the website you want to create... 

Examples:
• 'A minimalist portfolio for a photographer with dark theme'
• 'E-commerce site for handmade jewelry with payment integration'
• 'Corporate website for a consulting firm with team profiles'"
                    className="min-h-40 bg-transparent border-0 text-lg placeholder:text-gray-500 focus:ring-0 resize-none text-white p-0"
                    disabled={isLoading}
                  />
                  <div className="absolute top-4 right-4">
                    <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span>AI Ready</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
                      <span>Processing Power: 100%</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={!prompt.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                        Generating Magic...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Generate Website
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Example prompts */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-center text-white mb-8">
              Need Inspiration? Try These Ideas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example.description)}
                  disabled={isLoading}
                  className="group text-left p-6 bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-lg flex items-center justify-center border border-purple-500/20 group-hover:border-purple-400/40 transition-colors">
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                        {example.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {example.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                        {example.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptInput;

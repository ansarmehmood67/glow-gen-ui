
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PromptInput from '@/components/PromptInput';
import LoadingAnimation from '@/components/LoadingAnimation';
import WebsitePreview from '@/components/WebsitePreview';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const { toast } = useToast();

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setCurrentPrompt(prompt);
    setGeneratedHtml('');

    try {
      console.log('Sending request to backend with prompt:', prompt);
      
      const response = await fetch('https://7086-223-123-11-240.ngrok-free.app/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.html) {
        setGeneratedHtml(data.html);
        toast({
          title: "Website Generated Successfully! 🎉",
          description: "Your AI-powered website is ready for preview.",
        });
      } else {
        throw new Error('No HTML content received from the server');
      }
    } catch (error) {
      console.error('Error generating website:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (currentPrompt) {
      handleGenerate(currentPrompt);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <Navbar />
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-24 pb-12">
          <HeroSection />
          
          <div className="space-y-12">
            {!isLoading && !generatedHtml && (
              <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
            )}
            
            {isLoading && <LoadingAnimation />}
            
            {generatedHtml && !isLoading && (
              <WebsitePreview 
                htmlContent={generatedHtml} 
                onRegenerate={handleRegenerate}
              />
            )}
          </div>
        </div>

        {/* Additional Sections - only show when not in generation mode */}
        {!isLoading && !generatedHtml && (
          <>
            <FeaturesSection />
            <StatsSection />
            <CTASection />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;

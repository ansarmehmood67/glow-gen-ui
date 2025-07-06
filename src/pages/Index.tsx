
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PromptInput from '@/components/PromptInput';
import LoadingAnimation from '@/components/LoadingAnimation';
import WebsitePreview from '@/components/WebsitePreview';
import RecentDesigns from '@/components/RecentDesigns';
import CommunitySection from '@/components/CommunitySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
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
      
      const response = await fetch('https://67cf-223-123-11-240.ngrok-free.app/generate', {
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
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Main content */}
      <div className="relative">
        {!isLoading && !generatedHtml && (
          <>
            <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
            <RecentDesigns />
            <CommunitySection />
            <CTASection />
          </>
        )}
        
        {isLoading && (
          <div className="min-h-screen flex items-center justify-center">
            <LoadingAnimation />
          </div>
        )}
        
        {generatedHtml && !isLoading && (
          <div className="py-20 px-4">
            <div className="container mx-auto">
              <WebsitePreview 
                htmlContent={generatedHtml} 
                onRegenerate={handleRegenerate}
              />
            </div>
          </div>
        )}
      </div>

      {!isLoading && !generatedHtml && <Footer />}
    </div>
  );
};

export default Index;

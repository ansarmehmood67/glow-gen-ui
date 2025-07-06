
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PromptInput from '@/components/PromptInput';
import LoadingAnimation from '@/components/LoadingAnimation';
import RecentDesigns from '@/components/RecentDesigns';
import CommunitySection from '@/components/CommunitySection';
import CTASection from '@/components/CTASection';
import PlatformInfo from '@/components/PlatformInfo';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);

    try {
      console.log('Sending request to backend with prompt:', prompt);
      
      const response = await fetch('https://ca4b-223-123-6-211.ngrok-free.app/generate', {
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

      if (data.id) {
        toast({
          title: "Website Generated Successfully! 🎉",
          description: "Redirecting to your project editor...",
        });

        // Redirect to the project page with the returned ID
        setTimeout(() => {
          navigate(`/project/${data.id}`);
        }, 1000);
      } else {
        throw new Error('No project ID received from the server');
      }
    } catch (error) {
      console.error('Error generating website:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your website. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Main content */}
      <div className="relative">
        {!isLoading && (
          <>
            <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
            <RecentDesigns />
            <CommunitySection />
            <CTASection />
            <PlatformInfo />
          </>
        )}
        
        {isLoading && (
          <div className="min-h-screen flex items-center justify-center">
            <LoadingAnimation />
          </div>
        )}
      </div>

      {!isLoading && <Footer />}
    </div>
  );
};

export default Index;

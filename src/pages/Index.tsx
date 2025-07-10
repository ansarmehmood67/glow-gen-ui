
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PromptInput from '@/components/PromptInput';
import LoadingAnimation from '@/components/LoadingAnimation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log('Starting generation with prompt:', prompt);

    try {
      const response = await fetch('https://25dd352f4d0c.ngrok-free.app/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          prompt: prompt.trim()
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
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
      
      let errorMessage = "There was an error generating your website. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative">
        {!isLoading && (
          <div className="animate-slide-up-fade">
            <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
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

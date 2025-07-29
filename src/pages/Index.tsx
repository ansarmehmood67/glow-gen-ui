
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfessionalHero from '@/components/ProfessionalHero';
import CleanPromptInterface from '@/components/CleanPromptInterface';
import LoadingScreen from '@/components/LoadingScreen';
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
      const response = await fetch('https://6d5b7851bdcb.ngrok-free.app/generate', {
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <ProfessionalHero />
      
      {/* Prompt Interface */}
      <CleanPromptInterface onGenerate={handleGenerate} isLoading={isLoading} />

      <Footer />
    </div>
  );
};

export default Index;

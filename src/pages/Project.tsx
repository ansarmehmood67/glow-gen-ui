import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, Home, Plus, CreditCard, HelpCircle } from 'lucide-react';
import ChatArea from '@/components/ChatArea';
import LivePreview from '@/components/LivePreview';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load project data based on projectId
    // For now, we'll check if there's stored HTML content
    const storedHtml = sessionStorage.getItem(`project-${projectId}`);
    if (storedHtml) {
      setHtmlContent(storedHtml);
    }
  }, [projectId]);

  const handleChatSubmit = async (prompt: string) => {
    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', content: prompt }]);

    try {
      console.log('Sending request to backend with prompt:', prompt);
      
      const response = await fetch('https://67cf-223-123-11-240.ngrok-free.app/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          existingHtml: htmlContent // Send existing HTML for modifications
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.html) {
        setHtmlContent(data.html);
        sessionStorage.setItem(`project-${projectId}`, data.html);
        setChatHistory(prev => [...prev, { role: 'assistant', content: 'Website updated successfully!' }]);
        toast({
          title: "Website Updated! 🎉",
          description: "Your changes have been applied to the preview.",
        });
      } else {
        throw new Error('No HTML content received from the server');
      }
    } catch (error) {
      console.error('Error updating website:', error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
      toast({
        title: "Update Failed",
        description: "There was an error updating your website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden relative">
      {/* Hamburger Menu */}
      <div className="absolute top-4 left-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="bg-background/90 backdrop-blur-sm border-border/50">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-background border-border">
            <DropdownMenuItem onClick={() => navigate('/')} className="cursor-pointer">
              <Home className="mr-3 h-4 w-4" />
              Go to Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/')} className="cursor-pointer">
              <Plus className="mr-3 h-4 w-4" />
              Create New Project
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => {
                toast({
                  title: "Credits",
                  description: "You have 25 credits remaining",
                });
              }}
              className="cursor-pointer"
            >
              <CreditCard className="mr-3 h-4 w-4" />
              Credits (25 left)
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                toast({
                  title: "Help",
                  description: "Visit our documentation for assistance",
                });
              }}
              className="cursor-pointer"
            >
              <HelpCircle className="mr-3 h-4 w-4" />
              Help
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Left Side - Chat Area */}
      <div className="w-1/2 border-r border-border">
        <ChatArea 
          onSubmit={handleChatSubmit}
          isLoading={isLoading}
          chatHistory={chatHistory}
          projectId={projectId}
        />
      </div>
      
      {/* Right Side - Live Preview */}
      <div className="w-1/2">
        <LivePreview htmlContent={htmlContent} />
      </div>
    </div>
  );
};

export default Project;

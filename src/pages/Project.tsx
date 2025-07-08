
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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!projectId) {
      navigate('/');
      return;
    }

    // Load project data from backend
    const loadProject = async () => {
      try {
        console.log('Loading project:', projectId);
        
        const response = await fetch(`https://6f055c632cc9.ngrok-free.app/project/${projectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });

        console.log('Load project response status:', response.status);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Project not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Project data loaded:', data);

        if (data.html) {
          setHtmlContent(data.html);
        } else {
          throw new Error('No HTML content received from the server');
        }
      } catch (error) {
        console.error('Error loading project:', error);
        toast({
          title: "Error Loading Project",
          description: error instanceof Error ? error.message : "Failed to load project",
          variant: "destructive",
        });
        // Redirect back to home if project can't be loaded
        navigate('/');
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadProject();
  }, [projectId, navigate, toast]);

  const handleChatSubmit = async (instruction: string) => {
    if (!projectId || !instruction.trim()) {
      return;
    }

    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', content: instruction }]);

    try {
      console.log('Sending update request:', { id: projectId, instruction });
      
      const response = await fetch('https://6f055c632cc9.ngrok-free.app/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          id: projectId,
          instruction: instruction.trim()
        })
      });

      console.log('Update response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update error:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Update response data:', data);

      if (data.html) {
        setHtmlContent(data.html);
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
      
      let errorMessage = 'Sorry, there was an error processing your request.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: errorMessage }]);
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

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

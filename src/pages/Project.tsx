
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
      {/* Premium Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 h-14 glass-card border-b border-border/50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left: Menu & Project Info */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="interactive-element">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 glass-card border-border/50">
                <DropdownMenuItem onClick={() => navigate('/')} className="cursor-pointer interactive-element">
                  <Home className="mr-3 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/')} className="cursor-pointer interactive-element">
                  <Plus className="mr-3 h-4 w-4" />
                  <span>New Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => {
                    toast({
                      title: "Credits Available",
                      description: "25 credits remaining in your account",
                    });
                  }}
                  className="cursor-pointer interactive-element"
                >
                  <CreditCard className="mr-3 h-4 w-4" />
                  <span>Credits (25)</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    toast({
                      title: "Support Center",
                      description: "Access documentation and live chat support",
                    });
                  }}
                  className="cursor-pointer interactive-element"
                >
                  <HelpCircle className="mr-3 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
              <span className="text-sm font-medium text-foreground">Project {projectId}</span>
            </div>
          </div>

          {/* Center: Project Status */}
          <div className="text-center">
            <h1 className="text-lg font-bold premium-gradient">Olytiq Studio</h1>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="interactive-element border-border/50 hover:border-primary/50"
            >
              Export
            </Button>
            <Button 
              size="sm" 
              className="btn-primary text-primary-foreground"
            >
              Deploy
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex w-full pt-14">
        {/* Left Panel - AI Chat Interface */}
        <div className="w-1/2 border-r border-border/50 glass-card">
          <ChatArea 
            onSubmit={handleChatSubmit}
            isLoading={isLoading}
            chatHistory={chatHistory}
            projectId={projectId}
          />
        </div>
        
        {/* Right Panel - Live Preview */}
        <div className="w-1/2 glass-card">
          <LivePreview htmlContent={htmlContent} />
        </div>
      </div>
    </div>
  );
};

export default Project;

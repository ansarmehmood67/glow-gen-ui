
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Globe, RefreshCw, ExternalLink } from 'lucide-react';
import { injectTailwindCSS } from '@/lib/utils';

interface WebsitePreviewProps {
  htmlContent: string;
  onRegenerate: () => void;
}

const WebsitePreview = ({ htmlContent, onRegenerate }: WebsitePreviewProps) => {
  const handleDownload = () => {
    const processedHtml = injectTailwindCSS(htmlContent);
    const blob = new Blob([processedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePublish = () => {
    // Placeholder for publish functionality
    alert('Publish functionality coming soon!');
  };

  return (
    <div className="w-full space-y-8 entrance-animation">
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold premium-gradient">Your Website is Ready! ✨</h3>
        <p className="text-muted-foreground text-lg">Preview your AI-generated masterpiece below</p>
      </div>
      
      <div className="relative">
        <div className="magic-border rounded-3xl overflow-hidden">
          <div className="bg-background/80 px-6 py-4 border-b border-border/50 flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>olytiq.ai/preview</span>
            </div>
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div className="relative bg-white">
            <iframe
              srcDoc={injectTailwindCSS(htmlContent)}
              className="w-full h-96 md:h-[700px] border-0"
              sandbox="allow-scripts allow-same-origin"
              title="Generated Website Preview"
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button
          onClick={handleDownload}
          className="flex-1 md:flex-none h-14 text-lg font-semibold bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 group"
        >
          <Download className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          Download Code
        </Button>
        
        <Button
          onClick={handlePublish}
          className="flex-1 md:flex-none h-14 text-lg font-semibold bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 transition-all duration-300 group"
        >
          <Globe className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
          Publish Live
        </Button>
        
        <Button
          onClick={onRegenerate}
          variant="outline"
          className="flex-1 md:flex-none h-14 text-lg font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
        >
          <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
          Regenerate
        </Button>
      </div>
    </div>
  );
};

export default WebsitePreview;

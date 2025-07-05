
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Globe, RefreshCw } from 'lucide-react';

interface WebsitePreviewProps {
  htmlContent: string;
  onRegenerate: () => void;
}

const WebsitePreview = ({ htmlContent, onRegenerate }: WebsitePreviewProps) => {
  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
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
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-glow">Your Website is Ready! ✨</h3>
        <p className="text-muted-foreground">Preview your generated website below</p>
      </div>
      
      <div className="relative">
        <div className="bg-card border-2 border-primary/50 rounded-2xl overflow-hidden glow-intense">
          <div className="bg-background/50 px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Generated Website Preview</span>
            </div>
          </div>
          
          <div className="relative">
            <iframe
              srcDoc={htmlContent}
              className="w-full h-96 md:h-[600px] border-0"
              sandbox="allow-scripts allow-same-origin"
              title="Generated Website Preview"
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button
          onClick={handleDownload}
          className="flex-1 md:flex-none h-12 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 glow"
        >
          <Download className="w-5 h-5 mr-3" />
          Download Code
        </Button>
        
        <Button
          onClick={handlePublish}
          className="flex-1 md:flex-none h-12 text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transition-all duration-300 glow"
        >
          <Globe className="w-5 h-5 mr-3" />
          Publish Online
        </Button>
        
        <Button
          onClick={onRegenerate}
          variant="outline"
          className="flex-1 md:flex-none h-12 text-lg font-semibold border-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5 mr-3" />
          Generate Again
        </Button>
      </div>
    </div>
  );
};

export default WebsitePreview;

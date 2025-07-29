
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, ExternalLink, Smartphone, Monitor, Tablet } from 'lucide-react';
import { injectTailwindCSS } from '@/lib/utils';

interface LivePreviewProps {
  htmlContent: string;
}

const LivePreview = ({ htmlContent }: LivePreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'w-80';
      case 'tablet': return 'w-96';
      default: return 'w-full';
    }
  };

  const handleOpenInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(injectTailwindCSS(htmlContent));
      newWindow.document.close();
    }
  };

  return (
    <div className="h-full flex flex-col bg-muted/30">
      {/* Preview Header */}
      <div className="p-4 border-b border-border bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-medium">Live Preview</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* View Mode Toggles */}
            <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className="h-8 w-8 p-0"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
                className="h-8 w-8 p-0"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInNewTab}
              disabled={!htmlContent}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-auto">
        {htmlContent ? (
          <div className="h-full flex justify-center">
            <div className={`${getPreviewWidth()} h-full`}>
              <div className="magic-border rounded-lg overflow-hidden h-full">
                <div className="bg-background/80 px-4 py-2 border-b border-border/50 flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground ml-2">olytiq.ai/preview</span>
                </div>
                
                <div className="h-full bg-white">
                  <iframe
                    srcDoc={injectTailwindCSS(htmlContent)}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                    title="Live Website Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary/50" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">No Preview Available</h3>
                <p className="text-sm text-muted-foreground">Start a conversation to generate your website</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;


import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="premium-gradient">Ready to Build Something Amazing?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who are already using AI to build stunning websites in minutes, not hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-primary text-primary-foreground text-lg px-8 py-6 group"
            >
              <MessageCircle className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              Join Discord Community
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 group"
            >
              <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Join Waitlist
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            🚀 <strong>1,000+</strong> creators joined this week
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const RecentDesigns = () => {
  const designs = [
    {
      title: 'Portfolio Studio',
      description: 'Modern portfolio for creative professionals',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      category: 'Portfolio'
    },
    {
      title: 'EcoShop',
      description: 'Sustainable ecommerce platform',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      category: 'E-commerce'
    },
    {
      title: 'StartupLaunch',
      description: 'High-converting SaaS landing page',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      category: 'Landing Page'
    },
    {
      title: 'TechBlog Pro',
      description: 'Clean tech blog with modern design',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c95827?w=400&h=300&fit=crop',
      category: 'Blog'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-background/50 to-card/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="premium-gradient">Recent Designs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See what others have built with Olytiq's AI-powered platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {designs.map((design, index) => (
            <Card key={index} className="premium-card hover:border-primary/30 transition-all duration-300 group hover:scale-105 hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                <img 
                  src={design.image} 
                  alt={design.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {design.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{design.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{design.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentDesigns;

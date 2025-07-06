
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Zap } from 'lucide-react';

const CommunitySection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Designer',
      content: 'Olytiq transformed my workflow. I can now deliver stunning websites to clients in hours, not weeks.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332427c?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Marcus Johnson',
      role: 'Startup Founder',
      content: 'Built our entire landing page with Olytiq. The AI understood exactly what we needed for our tech startup.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Elena Rodriguez',
      role: 'E-commerce Owner',
      content: 'From concept to live store in 30 minutes. Olytiq made launching my business incredibly simple.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Creators' },
    { icon: Zap, value: '50,000+', label: 'Sites Generated' },
    { icon: Star, value: '4.9/5', label: 'User Rating' }
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-background via-card/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="premium-gradient">Join Our Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Thousands of creators are already building the future with Olytiq
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold premium-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="premium-card">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;

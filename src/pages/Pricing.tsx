
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 websites per month',
        'Basic templates',
        'Community support',
        'Standard hosting'
      ],
      featured: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For serious creators',
      features: [
        'Unlimited websites',
        'Premium templates',
        'Priority support',
        'Custom domains',
        'Advanced analytics',
        'SEO optimization'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'White-label solutions',
        'API access',
        'Dedicated support',
        'Custom integrations'
      ],
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`bg-card/50 border-border relative ${
                plan.featured ? 'border-primary glow-intense scale-105' : ''
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.featured 
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700' 
                      : ''
                  }`}
                  variant={plan.featured ? 'default' : 'outline'}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

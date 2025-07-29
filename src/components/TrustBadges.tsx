import React from 'react';
import { Shield, Zap, Globe, Award, Star, Users } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    { icon: Shield, text: "Enterprise Grade Security", subtext: "SOC 2 Certified" },
    { icon: Zap, text: "99.9% Uptime", subtext: "Global Infrastructure" },
    { icon: Globe, text: "150+ Countries", subtext: "Trusted Worldwide" },
    { icon: Award, text: "AI Innovation Leader", subtext: "Industry Recognition" },
    { icon: Star, text: "4.9/5 Rating", subtext: "10,000+ Reviews" },
    { icon: Users, text: "1M+ Developers", subtext: "Active Community" }
  ];

  return (
    <div className="py-16 border-t border-primary/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Trusted by Industry Leaders
          </h3>
          <p className="text-muted-foreground">
            Join thousands of developers and companies building the future with our platform
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map(({ icon: Icon, text, subtext }, index) => (
            <div
              key={text}
              className="text-center p-4 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium text-foreground mb-1">{text}</div>
              <div className="text-xs text-muted-foreground">{subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
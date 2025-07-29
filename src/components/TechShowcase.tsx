import React from 'react';

const TechShowcase = () => {
  const technologies = [
    { name: "React", logo: "⚛️", description: "Modern UI Framework" },
    { name: "TypeScript", logo: "📘", description: "Type-Safe Development" },
    { name: "Tailwind CSS", logo: "🎨", description: "Utility-First Styling" },
    { name: "Vite", logo: "⚡", description: "Lightning-Fast Builds" },
    { name: "OpenAI GPT", logo: "🧠", description: "Advanced AI Models" },
    { name: "Supabase", logo: "🗄️", description: "Backend as a Service" }
  ];

  return (
    <div className="py-16 bg-card/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Powered by Cutting-Edge Technology
          </h3>
          <p className="text-muted-foreground">
            Built on the most advanced tech stack for optimal performance and scalability
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {technologies.map(({ name, logo, description }, index) => (
            <div
              key={name}
              className="p-4 rounded-xl border border-primary/10 bg-background/80 backdrop-blur-sm hover:border-primary/20 transition-all group premium-hover animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="text-3xl mb-3 group-hover:animate-micro-bounce">{logo}</div>
                <div className="text-sm font-medium text-foreground mb-1">{name}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechShowcase;
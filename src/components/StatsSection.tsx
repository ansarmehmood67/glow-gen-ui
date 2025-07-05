
import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '50K+', label: 'Websites Generated' },
    { value: '99.9%', label: 'Uptime' },
    { value: '10K+', label: 'Happy Users' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

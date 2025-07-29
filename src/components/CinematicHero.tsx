import React, { useEffect, useRef } from 'react';
import { Sparkles, Code, Zap, Globe } from 'lucide-react';

const CinematicHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '147, 51, 234' : '59, 130, 246'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.vx += dx * 0.00002;
          particle.vy += dy * 0.00002;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'transparent' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Brand Badge */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Next-Gen AI Website Builder</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Create
            </span>
            <br />
            <span className="text-foreground">Anything</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Transform your ideas into stunning websites with our AI-powered platform.
            <br />
            <span className="text-primary">No code. No limits. Just pure creativity.</span>
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
          {[
            { icon: Code, text: "AI-Generated Code" },
            { icon: Zap, text: "Lightning Fast" },
            { icon: Globe, text: "Production Ready" }
          ].map(({ icon: Icon, text }, index) => (
            <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/30 backdrop-blur-sm border border-primary/10">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
          {[
            { label: "Websites Created", value: "50,000+", increment: true },
            { label: "AI Requests", value: "2.4M+", increment: true },
            { label: "Uptime", value: "99.9%", increment: false }
          ].map(({ label, value, increment }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {value}
              </div>
              <div className="text-sm text-muted-foreground">{label}</div>
              {increment && (
                <div className="text-xs text-green-400 mt-1">↗ Live</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CinematicHero;
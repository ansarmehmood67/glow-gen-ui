
import React from 'react';
import { Sparkles, Zap, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-200">Powered by Advanced AI</span>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>

        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6">
          <span className="block bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-float">
            Create
          </span>
          <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-float delay-150">
            Websites
          </span>
          <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent animate-float delay-300">
            Instantly
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          Transform your wildest ideas into stunning, professional websites using the power of 
          <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold"> artificial intelligence</span>.
          <br />
          No coding required. Just describe, and watch the magic happen.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl px-6 py-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300 font-medium">Lightning Fast</span>
          </div>
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm border border-cyan-500/20 rounded-2xl px-6 py-3">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-300 font-medium">Mobile Ready</span>
          </div>
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm border border-emerald-500/20 rounded-2xl px-6 py-3">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-300 font-medium">AI Powered</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-transparent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

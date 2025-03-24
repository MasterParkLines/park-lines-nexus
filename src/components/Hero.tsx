
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-park-midnight min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-park-blue-gradient-from to-park-blue-gradient-to mix-blend-multiply" />
      
      <div className="container-custom relative z-10">
        <div 
          ref={heroRef}
          className="max-w-4xl mx-auto text-center space-y-8 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <h1 className="heading-xl text-white">
            Turn Your Vision Into Reality With Expert Agency Support
          </h1>
          <p className="subtitle text-gray-300">
            Park Lines Concepts helps entrepreneurs, course creators, and small businesses scale with premium agency services, coaching, and AI automation tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              className="btn-primary w-full sm:w-auto group"
              onClick={() => window.location.href = "#contact"}
            >
              Book Your Strategy Call
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="btn-outline w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
              onClick={() => window.location.href = "#services"}
            >
              Explore Services
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-park-purple/20 blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-park-purple/10 blur-3xl animate-pulse-subtle animation-delay-1000" />
    </section>
  );
};

export default Hero;

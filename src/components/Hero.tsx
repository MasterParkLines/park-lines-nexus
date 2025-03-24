
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
    <section className="bg-gradient-to-br from-park-midnight to-park-dark-blue min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
      {/* Abstract geometric shapes */}
      <div className="absolute w-96 h-96 bg-park-purple/10 rounded-full blur-3xl top-1/4 -left-48 animate-pulse-subtle"></div>
      <div className="absolute w-80 h-80 bg-park-light-purple/10 rounded-full blur-3xl bottom-1/4 -right-32 animate-pulse-subtle animation-delay-1000"></div>
      
      {/* Decorative grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container-custom relative z-10">
        <div 
          ref={heroRef}
          className="max-w-4xl mx-auto text-center space-y-8 opacity-0 translate-y-10 transition-all duration-1000"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-4">
            <span className="w-2 h-2 bg-park-light-purple rounded-full mr-2 animate-pulse"></span>
            Premium Agency Support
          </span>
          
          <h1 className="heading-xl text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80">Turn Your Vision Into</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-park-light-purple to-park-purple block mt-2">Business Reality</span>
          </h1>
          
          <p className="subtitle text-gray-300 leading-relaxed">
            Park Lines Concepts helps entrepreneurs, course creators, and small businesses scale with premium agency services, coaching, and AI automation tools.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            {/* Glass effect button */}
            <Button
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 w-full sm:w-auto group relative overflow-hidden"
              onClick={() => window.location.href = "#contact"}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-park-purple to-park-light-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                Book Your Strategy Call
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white/20 text-gray-800 bg-white hover:bg-white/90 w-full sm:w-auto"
              onClick={() => window.location.href = "#services"}
            >
              Explore Services
            </Button>
          </div>
          
          {/* Floating feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {['Agency Support', 'Business Coaching', 'AI Automation'].map((feature, index) => (
              <div 
                key={feature}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 transform hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-park-light-purple mb-2 font-medium">{feature}</div>
                <div className="text-white/70 text-sm">Premium solutions tailored for your business growth</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-park-midnight to-transparent"></div>
    </section>
  );
};

export default Hero;

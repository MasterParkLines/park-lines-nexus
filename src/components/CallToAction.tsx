
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      {
        threshold: 0.1
      }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-park-purple text-white relative overflow-hidden">
      {/* Background Gradient Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-park-light-purple/30 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-radial from-park-light-purple/20 to-transparent blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div 
          ref={ctaRef}
          className="max-w-4xl mx-auto text-center space-y-8 opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="heading-lg">Ready to Transform Your Business?</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Take the first step towards reaching your full potential. Schedule a strategy call today and discover how Park Lines Concepts can help you achieve your goals.
          </p>
          <div className="pt-4">
            <Button 
              size="lg"
              className="bg-white text-park-purple hover:bg-white/90 group"
              onClick={() => window.location.href = "#contact"}
            >
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-white/70 text-sm">
            No obligation, just a conversation about your business and how we might be able to help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

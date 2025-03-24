
import React, { useEffect, useRef } from 'react';
import { CalendarClock, MessageSquare, FileCheck, Rocket } from 'lucide-react';

const Process = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      stepsRef.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  const steps = [
    {
      icon: <CalendarClock className="h-12 w-12 text-park-purple" />,
      title: "Book a Strategy Call",
      description: "Schedule a free 30-minute call to discuss your business needs and goals."
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-park-purple" />,
      title: "Discovery Session",
      description: "We'll dive deep into your business, challenges, and opportunities to create a tailored plan."
    },
    {
      icon: <FileCheck className="h-12 w-12 text-park-purple" />,
      title: "Custom Proposal",
      description: "Receive a detailed proposal outlining our approach, timeline, and investment."
    },
    {
      icon: <Rocket className="h-12 w-12 text-park-purple" />,
      title: "Implementation",
      description: "We get to work, with regular updates and milestones to keep your project on track."
    }
  ];

  return (
    <section id="process" className="py-20 bg-white dark:bg-park-midnight">
      <div className="container-custom">
        <div 
          ref={titleRef}
          className="max-w-3xl mx-auto text-center mb-16 opacity-0 translate-y-10 transition-all duration-700"
        >
          <p className="caption text-park-purple">How We Work</p>
          <h2 className="heading-lg mb-4">A Simple, Effective Process</h2>
          <p className="subtitle">
            We've streamlined our approach to ensure a smooth, transparent experience from first contact to final delivery.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 dark:bg-gray-800 transform -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div
                key={step.title}
                ref={(el) => stepsRef.current[index] = el}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center opacity-0 translate-y-10 transition-all duration-700 delay-[${index * 200}ms]`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground">{step.description}</p>
                </div>
                
                <div className="relative flex items-center justify-center z-10">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                    {step.icon}
                  </div>
                  <div className="absolute w-24 h-24 rounded-full bg-primary/5 animate-pulse-subtle" />
                </div>
                
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

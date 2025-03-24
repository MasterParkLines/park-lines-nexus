
import React, { useEffect, useRef } from 'react';
import { Zap, Lightbulb, Code, PenTool, BarChart, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <Lightbulb className="h-10 w-10 text-park-purple" />,
    title: "Agency Support",
    description: "Full-service agency support for your business including strategy, execution, and growth.",
    features: ["Business strategy consulting", "Team management", "Marketing campaigns"]
  },
  {
    icon: <PenTool className="h-10 w-10 text-park-purple" />,
    title: "Coaching",
    description: "One-on-one coaching to help you level up your skills and grow your business.",
    features: ["Personal skill development", "Business growth planning", "Accountability systems"]
  },
  {
    icon: <BarChart className="h-10 w-10 text-park-purple" />,
    title: "Course Creation",
    description: "End-to-end course creation from ideation to launch and marketing.",
    features: ["Content strategy", "Course production", "Launch campaigns"]
  },
  {
    icon: <Code className="h-10 w-10 text-park-purple" />,
    title: "Web Development",
    description: "Custom websites and web applications designed for conversion and growth.",
    features: ["Custom website design", "E-commerce solutions", "Membership platforms"]
  },
  {
    icon: <Zap className="h-10 w-10 text-park-purple" />,
    title: "AI Automation",
    description: "Cutting-edge AI tools to automate your workflows and scale your business.",
    features: ["Custom AI solutions", "Workflow automation", "Data analysis"]
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="services" className="section-padding bg-white dark:bg-park-midnight relative">
      <div className="container-custom">
        <div 
          ref={sectionRef}
          className="max-w-3xl mx-auto text-center mb-12 opacity-0 translate-y-10 transition-all duration-700"
        >
          <p className="caption text-park-purple">Services</p>
          <h2 className="heading-lg mb-4">Comprehensive Solutions For Your Business</h2>
          <p className="subtitle">
            We provide a full suite of services to help you grow your business, from strategy to execution and everything in between.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              ref={(el) => cardsRef.current[index] = el}
              className={cn(
                "border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 opacity-0 translate-y-10 bg-white dark:bg-park-dark-blue",
                `transition-all duration-700 delay-[${index * 100}ms]`
              )}
            >
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-park-purple mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

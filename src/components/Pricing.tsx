
import React, { useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Pricing = () => {
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
        threshold: 0.1
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

  const plans = [
    {
      name: "Project-Based",
      description: "Perfect for specific, one-time projects with clear deliverables.",
      price: "Custom Pricing",
      features: [
        "Detailed project scoping",
        "Fixed or milestone-based payments",
        "Regular progress updates",
        "Dedicated project manager",
        "Post-project support"
      ],
      buttonText: "Schedule Consultation",
      isPopular: false
    },
    {
      name: "Retainer",
      description: "Ongoing support and services for continuous business growth.",
      price: "$2,500",
      period: "per month",
      features: [
        "Monthly service allowance",
        "Priority support",
        "Regular strategy sessions",
        "Performance reporting",
        "Dedicated account manager",
        "Flexible service allocation"
      ],
      buttonText: "Get Started",
      isPopular: true
    },
    {
      name: "Coaching",
      description: "One-on-one guidance to help you develop skills and grow your business.",
      price: "$500",
      period: "per session",
      features: [
        "90-minute coaching sessions",
        "Personalized action plans",
        "Email support between sessions",
        "Resource recommendations",
        "Progress tracking"
      ],
      buttonText: "Book Coaching",
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-park-dark-blue">
      <div className="container-custom">
        <div 
          ref={sectionRef}
          className="max-w-3xl mx-auto text-center mb-12 opacity-0 translate-y-10 transition-all duration-700"
        >
          <p className="caption text-park-purple">Pricing</p>
          <h2 className="heading-lg mb-4">Transparent, Value-Based Pricing</h2>
          <p className="subtitle">
            Choose the engagement model that works best for your business needs and budget.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              ref={(el) => cardsRef.current[index] = el}
              className={`border ${
                plan.isPopular ? "border-park-purple/50" : "border-border/40"
              } shadow-sm opacity-0 translate-y-10 transition-all duration-700 delay-[${index * 200}ms] relative overflow-hidden`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-park-purple text-white text-xs font-semibold px-4 py-1 transform rotate-45 translate-x-5 translate-y-3">
                    Popular
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-park-purple mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full group ${
                    plan.isPopular 
                      ? "bg-park-purple hover:bg-park-light-purple text-white" 
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => window.location.href = "#contact"}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

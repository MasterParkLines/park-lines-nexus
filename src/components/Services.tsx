
import React, { useEffect, useRef } from 'react';
import { 
  BarChart, 
  Target, 
  Share2, 
  ShoppingCart, 
  ListChecks 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <BarChart className="h-10 w-10 text-park-purple" />,
    title: "Data Analysis & Insights",
    description: "For eCommerce Sellers Managing Multiple Platforms",
    features: [
      "Centralized dashboards for key performance metrics",
      "AI-driven insights on sales, inventory, and customer trends",
      "Multi-platform sales tracking and reporting (Amazon, Shopify, Walmart, etc.)",
      "Custom alerts for inventory levels, sales fluctuations, and ad performance"
    ],
    price: "$777/month"
  },
  {
    icon: <Target className="h-10 w-10 text-park-purple" />,
    title: "PPC & Ad Automation",
    description: "For Amazon, Google, and Social Ads",
    features: [
      "AI-powered ad optimization to maximize ROI",
      "Automated bid adjustments based on real-time performance",
      "Ad copy and creative testing using AI insights",
      "Custom strategies for scaling ad spend efficiently"
    ],
    price: "$777/month"
  },
  {
    icon: <Share2 className="h-10 w-10 text-park-purple" />,
    title: "Social Content & Posting",
    description: "For Streamlined Social Media Management",
    features: [
      "AI-assisted content creation (text, images, video)",
      "Auto-scheduling and cross-posting to all major platforms",
      "Performance tracking and engagement analysis",
      "AI-driven recommendations for best posting times and content strategy"
    ],
    price: "$777/month"
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-park-purple" />,
    title: "E-Commerce Operations Automation",
    description: "For Multi-Channel Inventory & Process Optimization",
    features: [
      "Automated inventory tracking across multiple platforms",
      "AI-powered demand forecasting to prevent stockouts and overstock",
      "Streamlined order fulfillment and shipping automation",
      "AI-driven customer service chatbot integration"
    ],
    price: "$777/month"
  },
  {
    icon: <ListChecks className="h-10 w-10 text-park-purple" />,
    title: "Task & Workflow Automation",
    description: "For Small Business Owners Seeking Efficiency",
    features: [
      "AI-powered review of current business processes",
      "Automated task management and delegation systems",
      "Implementation of AI-driven CRM and customer support tools",
      "Recommendations for optimized workflows using AI tools"
    ],
    price: "$777/month"
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stackingPapersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');

            // If the stacking papers section becomes visible, start the animation
            if (entry.target === stackingPapersRef.current) {
              const papers = entry.target.querySelectorAll('.stacking-paper');
              papers.forEach((paper, index) => {
                setTimeout(() => {
                  paper.classList.add('stacked');
                }, index * 300);
              });
            }
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

    if (stackingPapersRef.current) {
      observer.observe(stackingPapersRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
      if (stackingPapersRef.current) {
        observer.unobserve(stackingPapersRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="section-padding bg-white/30 dark:bg-park-midnight/70 backdrop-blur-sm relative">
      <div className="container-custom">
        <div 
          ref={sectionRef}
          className="max-w-3xl mx-auto text-center mb-12 opacity-0 translate-y-10 transition-all duration-700"
        >
          <p className="caption text-park-purple">Services</p>
          <h2 className="heading-lg mb-4">Our 5 Core Services</h2>
          <p className="subtitle">
            We specialize in AI-driven automation solutions that simplify and optimize business operations. Whether you're an eCommerce seller, a small business owner, or a digital entrepreneur, our services help you scale efficiently with data-driven insights and automated systems.
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
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-park-purple mr-2 font-bold">•</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border/40">
                  <p className="text-xl font-bold text-park-purple">{service.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div 
          ref={(el) => stackingPapersRef.current = el}
          className="mt-16 p-8 bg-gray-50 dark:bg-park-dark-blue rounded-lg border border-border/40 max-w-3xl mx-auto opacity-0 translate-y-10 transition-all duration-700 relative overflow-hidden"
        >
          {/* Stacking Papers Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="stacking-paper bg-white dark:bg-park-dark-blue/80 border border-gray-200 dark:border-gray-700 rounded shadow-sm w-40 h-32 absolute bottom-0 left-0 right-0 mx-auto transform -rotate-12 transition-all duration-500 opacity-70"></div>
            <div className="stacking-paper bg-white dark:bg-park-dark-blue/80 border border-gray-200 dark:border-gray-700 rounded shadow-sm w-40 h-32 absolute bottom-1 left-0 right-0 mx-auto transform rotate-6 transition-all duration-500 opacity-70"></div>
            <div className="stacking-paper bg-white dark:bg-park-dark-blue/80 border border-gray-200 dark:border-gray-700 rounded shadow-sm w-40 h-32 absolute bottom-2 left-0 right-0 mx-auto transform -rotate-3 transition-all duration-500 opacity-70"></div>
            <div className="stacking-paper bg-white dark:bg-park-dark-blue/80 border border-gray-200 dark:border-gray-700 rounded shadow-sm w-40 h-32 absolute bottom-3 left-0 right-0 mx-auto transform rotate-1 transition-all duration-500 opacity-70"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl font-bold mb-4">Stack Your Savings!</h3>
            <p className="text-center mb-6">The more you automate, the more you save!</p>
            <ul className="space-y-3 mx-auto max-w-md">
              <li className="flex items-center justify-center">
                <span className="text-park-purple mr-2 font-bold">•</span>
                <span>2 services → 5% off ($1,475.15/month)</span>
              </li>
              <li className="flex items-center justify-center">
                <span className="text-park-purple mr-2 font-bold">•</span>
                <span>3 services → 10% off ($2,099.10/month)</span>
              </li>
              <li className="flex items-center justify-center">
                <span className="text-park-purple mr-2 font-bold">•</span>
                <span>4 services → 17% off ($2,577.45/month)</span>
              </li>
              <li className="flex items-center justify-center">
                <span className="text-park-purple mr-2 font-bold">•</span>
                <span>All 5 services → 25% off ($2,917.50/month)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add CSS for the stacking papers animation using a style element instead of JSX */}
      <style>
        {`
        .stacking-paper {
          transform-origin: center bottom;
          bottom: -100px;
          transition: bottom 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .stacking-paper.stacked:nth-child(1) {
          bottom: 40px;
        }
        .stacking-paper.stacked:nth-child(2) {
          bottom: 30px;
        }
        .stacking-paper.stacked:nth-child(3) {
          bottom: 20px;
        }
        .stacking-paper.stacked:nth-child(4) {
          bottom: 10px;
        }
        `}
      </style>
    </section>
  );
};

export default ServicesSection;

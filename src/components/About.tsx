
import React, { useEffect, useRef } from 'react';
import { Shield, Trophy, Users } from 'lucide-react';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    valueRefs.current.forEach((value) => {
      if (value) observer.observe(value);
    });

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      valueRefs.current.forEach((value) => {
        if (value) observer.unobserve(value);
      });
    };
  }, []);

  const values = [
    {
      icon: <Trophy className="h-8 w-8 text-park-purple" />,
      title: "Excellence",
      description: "We're committed to delivering the highest quality work in everything we do."
    },
    {
      icon: <Users className="h-8 w-8 text-park-purple" />,
      title: "Partnership",
      description: "We work alongside you as partners in your journey to success."
    },
    {
      icon: <Shield className="h-8 w-8 text-park-purple" />,
      title: "Integrity",
      description: "We operate with complete transparency and honesty in all our dealings."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50 dark:bg-park-dark-blue clip-path-diagonal">
      <div className="container-custom">
        <div 
          ref={aboutRef}
          className="flex flex-col lg:flex-row gap-12 items-center opacity-0 translate-y-10 transition-all duration-700"
        >
          <div className="lg:w-1/2 space-y-6">
            <p className="caption text-park-purple">Our Story</p>
            <h2 className="heading-lg">Building Businesses That Make An Impact</h2>
            <p className="text-lg text-muted-foreground">
              Park Lines Concepts was founded with a simple mission: to help entrepreneurs and businesses
              turn their vision into reality with expert guidance and support.
            </p>
            <p className="text-lg text-muted-foreground">
              With decades of combined experience in business strategy, marketing, and technology,
              our team helps clients overcome challenges and seize opportunities for growth.
            </p>
            <p className="text-lg text-muted-foreground">
              We don't just work for you — we work with you, becoming an extension of your team and
              bringing our expertise to help you achieve your goals.
            </p>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                ref={(el) => valueRefs.current[index] = el}
                className={`p-6 bg-white dark:bg-park-midnight rounded-xl shadow-sm border border-border/40 opacity-0 translate-y-10 transition-all duration-700 delay-[${index * 200}ms]`}
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-full inline-block">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Contact = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking request submitted!",
      description: "We'll be in touch shortly to confirm your appointment.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
    setDate(undefined);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-park-midnight">
      <div 
        ref={sectionRef}
        className="container-custom opacity-0 translate-y-10 transition-all duration-700"
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="caption text-park-purple">Get Started</p>
          <h2 className="heading-lg mb-4">Book Your Strategy Call</h2>
          <p className="subtitle">
            Take the first step towards transforming your business. Schedule a call with our team to discuss your needs and goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <h3 className="heading-sm">Contact Information</h3>
            <p className="text-muted-foreground">
              Have questions or prefer to reach out directly? Use our contact information below.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-park-purple mr-3" />
                <a href="mailto:parklinesconcepts@gmail.com" className="hover:text-primary transition-colors">
                  parklinesconcepts@gmail.com
                </a>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 dark:bg-park-dark-blue rounded-lg border border-border/40">
              <h4 className="font-semibold text-lg mb-2">Why Book a Call?</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-park-purple/20 flex items-center justify-center text-park-purple mr-3 mt-0.5">1</div>
                  <span>Discuss your specific business needs and goals</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-park-purple/20 flex items-center justify-center text-park-purple mr-3 mt-0.5">2</div>
                  <span>Explore solutions tailored to your challenges</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-park-purple/20 flex items-center justify-center text-park-purple mr-3 mt-0.5">3</div>
                  <span>Get a clear action plan for moving forward</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-park-dark-blue p-6 rounded-lg border border-border/40">
            <h3 className="heading-sm mb-6">Schedule Your Call</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business and what you're looking to achieve" 
                  rows={4} 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-park-purple hover:bg-park-light-purple text-white group"
              >
                Book Your Call
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

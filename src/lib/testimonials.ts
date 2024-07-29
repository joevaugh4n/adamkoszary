interface TestimonialData {
    author: string;
    role: string;
    quote: string;
    org: string;
    link: string;
  }
  
  export function parseTestimonials(content: string): TestimonialData[] {
    const testimonialRegex = /\[testimonial\]([\s\S]*?)\[\/testimonial\]/g;
    const testimonials: TestimonialData[] = [];
  
    let match;
    while ((match = testimonialRegex.exec(content)) !== null) {
      const testimonialContent = match[1];
      const testimonial: Partial<TestimonialData> = {};
  
      const lines = testimonialContent.split('\n');
      lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        if (key && value) {
          testimonial[key.trim() as keyof TestimonialData] = value;
        }
      });
  
      if (isValidTestimonial(testimonial)) {
        testimonials.push(testimonial as TestimonialData);
      }
    }
  
    return testimonials;
  }
  
  function isValidTestimonial(testimonial: Partial<TestimonialData>): testimonial is TestimonialData {
    return (
      typeof testimonial.author === 'string' &&
      typeof testimonial.role === 'string' &&
      typeof testimonial.quote === 'string' &&
      typeof testimonial.org === 'string' &&
      typeof testimonial.link === 'string'
    );
  }
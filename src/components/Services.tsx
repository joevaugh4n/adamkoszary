import Drawer from './atoms/Drawer';
import Keith from '../images/keith.webp';

// Array for services. The component logic maps through these and  applies a change when it gets to Keith!
const services = [
  {
    name: 'Social media and content strategy',
    description: 'I can help turn your hopes, dreams and challenges into content pillars, action plans and processes to give your organisation clarity, purpose and enthusiasm.'
  },
  {
    name: 'Content audit',
    description: 'I can look under the hood of your content and website to pinpoint what needs improving and how.'
  },
  {
    name: 'Training and workshops',
    description: 'I provide practical sessions on content creation - from ideation to reporting - as well as inspirational talks that will fire up your staff for the possibilities of social media and content.'
  },
  {
    name: 'Critical friend',
    description: 'For when you need someone to sense-check a campaign or strategy, be a sounding board for new projects or to have a quiet word with senior management.'
  },
  {
    name: 'Content production',
    description: 'I can help you figure out what content to post, when and who for - as well as write the posts, create the imagery and shoot the video.'
  },
  {
    name: 'Keith',
    description: 'On request, I will send you pictures of my fox terrier until you tell me to stop.'
  }
];

export default function Services() {

  return (
    <section className='max-w-7xl mx-auto'>
      <h2 id='services' className='md:text-4xl text-2xl md:mb-4 mb-2 font-bold dark:text-white text-black'>
        What I do
      </h2>
      <div className='grid md:grid-cols-2 w-full mt-8 gap-x-8 gap-y-8'>
        {services.map((service, index) => (
          <Drawer key={index} title={service.name}>
            <p>{service.description}</p>
            {service.name.toLowerCase().includes("keith") && (
              <img src={Keith.src} alt='Keith, a fox terrier' title='Keith, a fox terrier' className='rounded-sm' />
            )}
          </Drawer>
        ))}
      </div>
    </section>
  );
}
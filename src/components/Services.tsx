import React, { useState, useEffect } from 'react';
import { fetchPageBySlug } from '../lib/wordpress';
import Drawer from './Drawer'; // Make sure this is also a React component
import Keith from '../images/keith.webp';

interface Service {
    title: string;
    description: string;
}

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        async function fetchServices() {
            const page = await fetchPageBySlug('services'); // Replace 'services' with the actual slug
            if (page && page.content.rendered) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(page.content.rendered, 'text/html');
                const listItems = doc.querySelectorAll('ul > li');
                const servicesList = Array.from(listItems).map(li => {
                    const text = li.textContent || '';
                    const [title, description] = text.split(':').map(s => s.trim());
                    return { title, description: description || title };
                });
                setServices(servicesList);
            }
        }

        fetchServices();
    }, []);

    return (
        <div className='grid md:grid-cols-2 w-full mt-8 gap-x-8 gap-y-8'>
            {services.map((service, index) => (
                service.title.includes("Keith") ?
                    <Drawer key={index} title={service.title}>
                        <p>{service.description}</p>
                        <img src={Keith.src} alt='Keith, a fox terrier' title='Keith, a fox terrier' className='rounded-sm' />
                        <div className='text-center text-sm'>Meet Keith</div>
                    </Drawer>
                    :
                    <Drawer key={index} title={service.title}>
                        <p>{service.description}</p>
                    </Drawer>
            ))}
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import Keith from '../images/keith.webp';
import { wpquery } from "../lib/wordpress";

interface ServiceData {
    title: string;
    description: string;
}

interface PageNode {
    date: string;
    title: string;
    content: string;
    slug: string;
}

interface DataProps {
    pages: {
        nodes: PageNode[];
    };
}

function parseContent(content: string): ServiceData[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const listItems = doc.querySelectorAll('li');

    return Array.from(listItems).map(li => {
        const fullText = li.textContent || '';
        const [title, ...descriptionParts] = fullText.split(':');
        const description = descriptionParts.join(':').trim();
        return { title: title.trim(), description };
    });
}

export default function Services({ slug = 'services' }) {
    const [services, setServices] = useState<ServiceData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await wpquery({
                query: `
                  query GetPageContent {
                    pages {
                      nodes {
                        date
                        title
                        content(format: RENDERED)
                        slug
                      }
                    }
                  }
                `,
            }) as DataProps;

            const pageData = data.pages.nodes.find((page) => page.slug === slug);
            const pageContent = pageData?.content ?? "";
            const parsedServices = parseContent(pageContent);
            setServices(parsedServices);
        }

        fetchData();
    }, [slug]);

    return (
        <section className='max-w-6xl mx-auto'>
            <h2 id='services' className='md:text-4xl text-2xl md:mb-4 mb-2 uppercase font-medium dark:text-white text-black'>
                WHAT I DO</h2>
            <div className='grid md:grid-cols-2 w-full mt-8 gap-x-8 gap-y-8'>
                {services.map((service, index) => (
                    <Drawer key={index} title={service.title}>
                        <p>{service.description}</p>

                        {service.title.toLowerCase().includes("keith") && (
                            <>
                                <img src={Keith.src} alt='Keith, a fox terrier' title='Keith, a fox terrier' className='rounded-sm' />
                            </>
                        )}
                    </Drawer>
                ))}
            </div>
        </section>
    );
}
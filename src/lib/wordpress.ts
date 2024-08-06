interface WPGraphQLParams {
  query: string;
  variables?: Record<string, any>;
}

interface WPGraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{ message: string }>;
}

export async function wpquery({ query, variables = {} }: WPGraphQLParams): Promise<Record<string, any>> {
  try {
    const res = await fetch('https://admin.adamkoszary.co.uk/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const result: WPGraphQLResponse = await res.json();

    if (result.errors) {
      result.errors.forEach((error) => console.error('GraphQL error:', error.message));
      throw new Error('Error in GraphQL response');
    }

    return result.data ?? {};
  } catch (error) {
    console.error('Fetch error:', error);
    return {};
  }
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

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  org: string;
  link: string;
}

interface PageContent {
  title: string;
  content: string;
}

export const fetchPageContent = async (slug: string): Promise<{ title: string; content: string }> => {
  let data: DataProps = { pages: { nodes: [] } };
  let pageContent = "Content not found";
  let pageTitle = "Title not found";

  try {
    const response = await wpquery({
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
    });

    console.log('GraphQL response:', JSON.stringify(response, null, 2));

    if (response.pages?.nodes) {
      data = response as DataProps;
      const pageData = data.pages.nodes.find((page) => page.slug === slug);
      console.log('Page data for slug:', slug, pageData);
      if (pageData) {
        pageContent = pageData.content;
        pageTitle = pageData.title;
      }
    } else {
      console.error("No nodes found in the response", response);
    }
  } catch (error) {
    console.error("Error fetching page content:", error);
  }

  return { title: pageTitle, content: pageContent };
};
function parseTestimonials(content: string): Testimonial[] {
  // Remove unnecessary tags and trim the content
  content = content.replace(/<\/?p>/g, '').replace(/<br\s*\/?>/g, '').trim();

  // Match each testimonial block
  const testimonialItems = content.match(/<span class="testimonial">\s*([\s\S]*?)\s*<\/span>/g) || [];
  console.log('Matched testimonial items:', testimonialItems);

  return testimonialItems.map(item => {
    console.log('Processing item:', item);
    const quoteMatch = item.match(/<span class="quote">\s*([\s\S]*?)\s*<\/span>/);
    const authorMatch = item.match(/<span class="author">\s*([\s\S]*?)\s*<\/span>/);
    const roleMatch = item.match(/<span class="role">\s*([\s\S]*?)\s*<\/span>/);
    const orgMatch = item.match(/<span class="org">\s*([\s\S]*?)\s*<\/span>/);
    const linkMatch = item.match(/<span class="link">\s*([\s\S]*?)\s*<\/span>/);

    const quote = quoteMatch ? quoteMatch[1] : "";
    const author = authorMatch ? authorMatch[1] : "";
    const role = roleMatch ? roleMatch[1] : "";
    const org = orgMatch ? orgMatch[1] : "";
    const link = linkMatch ? linkMatch[1] : "";

    console.log('Extracted values:', { quote, author, role, org, link });

    return {
      quote: decodeHTMLEntities(quote.trim()),
      author: decodeHTMLEntities(author.trim()),
      role: decodeHTMLEntities(role.trim()),
      org: decodeHTMLEntities(org.trim()),
      link: decodeHTMLEntities(link.trim())
    };
  });
}

function decodeHTMLEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '=',
    '&nbsp;': ' ',
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8217;': "'",
    '&#8216;': "'"
  };
  return text.replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, entity => 
    entities[entity] || entity.charAt(1) === '#' ? String.fromCharCode(parseInt(entity.substr(2), 10)) : entity
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { content } = await fetchPageContent('testimonials');
    console.log('Fetched content:', content);
    if (!content) {
      console.error("No content found for testimonials page");
      return [];
    }
    const parsedTestimonials = parseTestimonials(content);
    console.log('Parsed testimonials:', JSON.stringify(parsedTestimonials, null, 2));
    return parsedTestimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// Example usage:
// (async () => {
//   const testimonials = await getTestimonials();
//   console.log(testimonials);
// })();
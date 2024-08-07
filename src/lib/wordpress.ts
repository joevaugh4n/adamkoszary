interface WPGraphQLParams {
  query: string;
  variables?: Record<string, any>;
}

interface WPGraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{ message: string }>;
}

// Initial API request to WPGraphQL
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

// Fetch content from the API response
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

    if (response.pages?.nodes) {
      data = response as DataProps;
      const pageData = data.pages.nodes.find((page) => page.slug === slug);
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
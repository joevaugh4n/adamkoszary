export const siteUrl: string = `adamkoszary.co.uk`;
export const wordpressSite: string = `https://${siteUrl}/wp-json/wp/v2`;

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
    const res = await fetch('https://adamkoszary.co.uk/graphql', {
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
